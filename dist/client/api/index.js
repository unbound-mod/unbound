"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),!function(a,b){for(var c in b)Object.defineProperty(a,c,{enumerable:!0,get:b[c]})}(exports,{Settings:()=>a,Commands:()=>b,Toasts:()=>c,Clyde:()=>d,i18n:()=>e});const a=g(require("./settings")),b=g(require("./commands/index")),c=g(require("./toasts/index")),d=g(require("./clyde")),e=g(require("./i18n"));function f(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(f=function(a){return a?c:b})(a)}function g(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=f(b);if(c&&c.has(a))return c.get(a);var d={},e=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=e?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(d,g,h):d[g]=a[g]}return d.default=a,c&&c.set(a,d),d}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGllbnQvYXBpL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCAqIGFzIFNldHRpbmdzIGZyb20gJy4vc2V0dGluZ3MnO1xyXG5leHBvcnQgKiBhcyBDb21tYW5kcyBmcm9tICcuL2NvbW1hbmRzJztcclxuZXhwb3J0ICogYXMgVG9hc3RzIGZyb20gJy4vdG9hc3RzJztcclxuZXhwb3J0ICogYXMgQ2x5ZGUgZnJvbSAnLi9jbHlkZSc7XHJcbmV4cG9ydCAqIGFzIGkxOG4gZnJvbSAnLi9pMThuJzsiXSwibmFtZXMiOlsiU2V0dGluZ3MiLCJDb21tYW5kcyIsIlRvYXN0cyIsIkNseWRlIiwiaTE4biJdLCJtYXBwaW5ncyI6IkFBQUEsZ0tBQVlBLFFBQVEsT0FDUkMsUUFBUSxPQUNSQyxNQUFNLE9BQ05DLEtBQUssT0FDTEMsSUFBSSwyQkFKVSxZQUFZLGVBQ1osa0JBQVksZUFDZCxnQkFBVSxlQUNYLFNBQVMsZUFDVixRQUFRLGdrQkFBQyJ9