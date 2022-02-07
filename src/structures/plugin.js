const Addon = require('@structures/addon');
const Logger = require('@modules/logger');

module.exports = class Plugin extends Addon {
   constructor(instance, data) {
      super(instance, data);

      this.logger = new Logger('Plugin', data.name);
      this.settings = window.unbound?.apis.settings.makeStore(data.id);

      this.settingsTab = null;
      this.styles = [];
   }

   registerSettings(component) {
      if (typeof component !== 'function') {
         throw new TypeError('first argument "component" should be of type function');
      }

      this.settingsTab = component;
   }

   unregisterSettings() {
      this.settingsTab = null;
   }
};