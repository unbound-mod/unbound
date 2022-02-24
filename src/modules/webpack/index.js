/**
*  @module Webpack
*  @description Unbound's webpack module, heavily inspired by HolyMod/PC-Compat.
*  @credit https://github.com/Strencher
*  @link https://github.com/strencher-kernel/pc-compat/blob/dev/src/renderer/modules/webpack.ts
*/

const logger = require('@modules/logger');
const modules = require('@data/modules');
const { uuid } = require('@utilities');

const Logger = new logger('Webpack');
const common = {};

class Webpack {
   static instance = null;
   static listeners = new Set();

   static get common() {
      return common;
   }

   static async init() {
      Webpack.onPush = Webpack.onPush.bind(this);
      return await Webpack.#available.then(() => new Promise(async ready => {
         Webpack.push = window[Webpack.#global].push;
         Object.defineProperty(window[Webpack.#global], 'push', {
            configurable: true,
            get: () => Webpack.onPush,
            set: (push) => {
               Webpack.push = push;

               Object.defineProperty(window[Webpack.#global], 'push', {
                  value: Webpack.onPush,
                  configurable: true,
                  writable: true
               });
            }
         });

         const [Dispatcher, { ActionTypes } = {}, { getCurrentUser } = {}] = await Webpack.getByProps(
            ['dirtyDispatch'], ['API_HOST', 'ActionTypes'], ['getCurrentUser', 'getUser'],
            { cache: false, bulk: true, wait: true, forever: true }
         );

         const listener = function () {
            Dispatcher.unsubscribe(ActionTypes.START_SESSION, listener.bind(Webpack));

            const filters = [];
            Object.entries(modules).map(([name, m]) => {
               if (m.props) {
                  if (m.props.every(props => Array.isArray(props))) {
                     const found = [];

                     filters.push({
                        id: name,
                        filter: (mdl) => {
                           const res = m.props.some(props => props.every(p => mdl[p]));
                           if (res && m.ensure && m.ensure(mdl) === false) {
                              return false;
                           } else if (res) {
                              found.push(mdl);
                           }

                           return res;
                        },
                        map: () => Object.assign({}, ...found)
                     });
                  } else {
                     filters.push({
                        id: name,
                        filter: (mdl) => {
                           const res = Webpack.filters.byProps(...m.props)(mdl);
                           if (res && m.ensure && m.ensure(mdl) === false) {
                              return false;
                           }

                           return res;
                        }
                     });
                  }
               } else if (m.displayName) {
                  filters.push({
                     id: name,
                     filter: Webpack.filters.byDisplayName(m.displayName)
                  });
               }
            });

            const results = Webpack.bulk(...filters.map(({ filter }) => filter));
            filters.map(({ id, map }, index) => {
               const mapper = map ?? (_ => _);
               const res = mapper(results[index]);
               Webpack.common[id] = res;
            });

            ready(true);
         };

         if (getCurrentUser?.() != void 0) return listener();
         Dispatcher.subscribe(ActionTypes.START_SESSION, listener.bind(Webpack));
      }));
   }

   static addListener(listener) {
      Webpack.listeners.add(listener);
      return Webpack.removeListener.bind(this, listener);
   }

   static removeListener(listener) {
      return Webpack.listeners.delete(listener);
   }

   static onPush(chunk) {
      const [, modules] = chunk;

      for (const id in modules) {
         const orig = modules[id];

         modules[id] = (...args) => {
            const [, exports] = args;
            Reflect.apply(orig, null, args);

            const listeners = [...Webpack.listeners];
            for (let i = 0; i < listeners.length; i++) {
               try {
                  listeners[i](exports);
               } catch (e) {
                  Logger.error('Failed to fire listener.', e);
               }
            }
         };

         Object.assign(modules[id], orig, {
            toString: orig.toString.bind(orig),
            __original: orig
         });
      }

      return Reflect.apply(Webpack.push, window[Webpack.#global], [chunk]);
   }

   static getLazy(filter) {
      const cache = Webpack.getModule(filter);
      if (cache) return Promise.resolve(cache);

      return new Promise(resolve => {
         const listener = (m) => {
            const direct = filter(m);
            if (direct) {
               resolve(m);
               return void remove();
            }

            if (!m.default) return;
            const defaultMatch = filter(m.default);
            if (!defaultMatch) return;

            resolve(m.default);
            remove();
         };

         const remove = Webpack.addListener(listener);
      });
   }

   static #request(cache = true) {
      if (cache && Webpack.instance) {
         return Webpack.instance;
      }

      const res = window[Webpack.#global].push([[uuid()], [], p => p]);
      window[Webpack.#global].pop();

      if (res) {
         Webpack.instance = res;
      }

      return res;
   }

   static getModule(filter, { all = false, cache = true, force = false, defaultExport = true } = {}) {
      if (typeof (filter) !== 'function') return void 0;

      const finder = Webpack.#request(cache);
      const found = [];

      if (!finder) return;

      const search = function (module, index) {
         try {
            return filter(module, index);
         } catch {
            return false;
         }
      };

      for (const id in finder.c) {
         const mdl = finder.c[id].exports;
         if (!mdl || mdl === window) continue;

         if (typeof mdl == 'object') {
            if (search(mdl, id)) {
               if (!all) return mdl;
               found.push(mdl);
            }

            if (mdl.__esModule && mdl.default != null && search(mdl.default, id)) {
               if (!all) return defaultExport ? mdl.default : mdl;
               found.push(defaultExport ? mdl.default : mdl);
            }

            if (force && mdl.__esModule) for (const key in mdl) {
               if (!mdl[key]) continue;

               if (search(mdl[key], id)) {
                  if (!all) return mdl[key];
                  found.push(mdl[key]);
               }
            }
         } else if (typeof mdl == 'function') {
            if (search(mdl, id)) {
               if (!all) return mdl;
               found.push(mdl);
            }
         }
      }

      return all ? found : found[0];
   }

   static getModules(filter) {
      return Webpack.getModule(filter, { all: true });
   }

   static #parseOptions(args, filter = o => typeof (o) === 'object' && !Array.isArray(o)) {
      return [args, filter(args[args.length - 1]) ? args.pop() : {}];
   }

   static getByDisplayName(...options) {
      const [names, { bulk = false, default: defaultExport = true, wait = false, ...rest }] = Webpack.#parseOptions(options);

      if (!bulk && !wait) {
         return Webpack.getModule(Webpack.filters.byDisplayName(names[0]), { defaultExport, ...rest });
      }

      if (wait && !bulk) {
         return Webpack.#waitFor(Webpack.filters.byDisplayName(names[0]), { defaultExport, ...rest });
      }

      if (bulk) {
         const filters = names.map(filters.map(Webpack.filters.byDisplayName)).concat({ wait, cache });

         return Webpack.bulk(...filters);
      }

      return null;
   }

   static getByProps(...options) {
      const [props, { bulk = false, wait = false, ...rest }] = Webpack.#parseOptions(options);

      if (!bulk && !wait) {
         return Webpack.getModule(Webpack.filters.byProps(...props), rest);
      }

      if (wait && !bulk) {
         return Webpack.waitFor(Webpack.filters.byProps(...props), rest);
      }

      if (bulk) {
         const filters = props.map((propsArray) => Webpack.filters.byProps(...propsArray)).concat({ wait, ...rest });

         return Webpack.bulk(...filters);
      }

      return null;
   }

   static getByString(...options) {
      const [props, { bulk = false, wait = false, ...rest }] = Webpack.#parseOptions(options);

      if (!bulk && !wait) {
         return Webpack.getModule(Webpack.filters.byString(...props), rest);
      }

      if (wait && !bulk) {
         return Webpack.#waitFor(Webpack.filters.byString(...props), rest);
      }

      if (bulk) {
         const filters = props.map((propsArray) => Webpack.filters.byString(...propsArray)).concat({ wait, ...rest });

         return Webpack.bulk(...filters);
      }

      return null;
   }

   static getByDefaultString(...options) {
      const [props, { bulk = false, wait = false, ...rest }] = Webpack.#parseOptions(options);

      if (!bulk && !wait) {
         return Webpack.getModule(Webpack.filters.byDefaultString(...props), rest);
      }

      if (wait && !bulk) {
         return Webpack.#waitFor(Webpack.filters.byDefaultString(...props), rest);
      }

      if (bulk) {
         const filters = props.map((propsArray) => Webpack.filters.byDefaultString(...propsArray)).concat({ wait, ...rest });

         return Webpack.bulk(...filters);
      }

      return null;
   }

   static async #waitFor(filter, { retries = 100, all = false, forever = false, delay = 50 } = {}) {
      for (let i = 0; (i < retries || forever); i++) {
         const module = Webpack.getModule(filter, { all, cache: false });
         if (module) return module;
         await new Promise(res => setTimeout(res, delay));
      }
   }

   static bulk(...options) {
      const [filters, { wait = false, ...rest }] = Webpack.#parseOptions(options);

      const found = new Array(filters.length);
      const search = wait ? Webpack.#waitFor : Webpack.getModule;
      const wrapped = filters.map(filter => (m) => {
         try {
            return filter(m);
         } catch (error) {
            return false;
         }
      });

      const res = search.call(Webpack, (module) => {
         for (let i = 0; i < wrapped.length; i++) {
            const filter = wrapped[i];
            if (typeof filter !== 'function' || !filter(module) || found[i] != null) continue;

            found[i] = module;
         }

         return found.filter(String).length === filters.length;
      }, rest);

      if (wait) return res.then(() => found);

      return found;
   }

   static get filters() {
      return {
         byProps: (...mdls) => (mdl) => mdls.every(k => mdl[k] !== void 0),
         byDisplayName: (name, def) => (mdl) => {
            if (!mdl || (def && !mdl.default)) return false;
            return typeof mdl === 'function' && mdl.displayName === name;
         },
         byDefaultString: (...strings) => (mdl) => {
            if (!mdl?.default) return false;
            return strings.every(s => mdl.default.toString?.()?.includes?.(s));
         },
         byString: (...strings) => (mdl) => {
            return strings.every(s => mdl.toString?.()?.includes?.(s));
         }
      };
   }

   static get #available() {
      return new Promise(async cb => {
         while (typeof window[Webpack.#global] == 'undefined' || window[Webpack.#global].length < 1) {
            await new Promise(setImmediate);
         }

         cb();
      });
   }

   static get #global() {
      return 'webpackChunkdiscord_app';
   }
};

module.exports = {
   bulk: Webpack.bulk,
   init: Webpack.init,
   common: Webpack.common,
   get: Webpack.getModule,
   find: Webpack.getModule,
   getLazy: Webpack.getLazy,
   filters: Webpack.filters,
   findLazy: Webpack.getLazy,
   getModule: Webpack.getModule,
   findModule: Webpack.getModule,
   getModules: Webpack.getModules,
   getByProps: Webpack.getByProps,
   findByProps: Webpack.getByProps,
   findModules: Webpack.getModules,
   getByString: Webpack.getByString,
   findByString: Webpack.getByString,
   getByDisplayName: Webpack.getByDisplayName,
   findByDisplayName: Webpack.getByDisplayName,
   getByDefaultString: Webpack.getByDefaultString,
   findByDefaultString: Webpack.getByDefaultString
};