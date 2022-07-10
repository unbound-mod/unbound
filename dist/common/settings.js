"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),!function(a,b){for(var c in b)Object.defineProperty(a,c,{enumerable:!0,get:b[c]})}(exports,{settings:()=>h,set:()=>n,toggle:()=>o,get:()=>p,save:()=>q,prependOnceListener:()=>r,prependListener:()=>s,listeners:()=>t,once:()=>u,off:()=>v,on:()=>w});const a=require("./constants"),b=require("events"),c=require("./utilities/index"),d=f(require("path")),e=f(require("fs"));function f(a){return a&&a.__esModule?a:{default:a}}const g=new b.EventEmitter,h={};e.default.existsSync(a.Paths.storage)||e.default.mkdirSync(a.Paths.storage),e.default.existsSync(a.Paths.settings)||e.default.mkdirSync(a.Paths.settings);const i=d.default.join(a.Paths.settings,a.BuildInfo.releaseChannel);e.default.existsSync(i)||e.default.mkdirSync(i);const j=e.default.readdirSync(i).filter(a=>a.endsWith(".json"));for(const k of j){let l=k.replace(".json","");try{let m=require(d.default.resolve(i,k));h[l]=m}catch{h[l]={}}}function n(a,b,c){h[a]??={};let d={path:b.split("."),res:h[a]};for(let e=0;e<d.path.length-1;e++){let f=d.path[e];d.res[f]??={},d.res=d.res[f]}let i=d.path[d.path.length-1];void 0!==c?d.res[i]=c:delete d.res[i],g.emit("set",{id:a,key:b,value:c}),g.emit("change",{type:"set",id:a,key:b,value:c})}function o(a,b,c){let d=!(p(a,b)??c);h[a]??={};let e={path:b.split("."),res:h[a]};for(let f=0;f<e.path.length-1;f++){let i=e.path[f];e.res[i]??={},e.res=e.res[i]}let j=e.path[e.path.length-1];e.res[j]=d,g.emit("toggle",{id:a,key:b,value:d,defaultValue:c}),g.emit("change",{type:"toggle",id:a,key:b,value:d,defaultValue:c})}function p(a,b,c){if(!h[a])return c;let d={path:b.split("."),res:h[a]};for(let e=0;e<d.path.length;e++){let f=d.path[e];if(d.res=d.res[f],!d.res)break}return d.res??c}function q({id:a}){e.default.existsSync(i)||e.default.mkdirSync(i);try{let b=JSON.stringify(h[a],null,2);e.default.writeFileSync(d.default.join(i,`${a}.json`),b)}catch(c){console.error(`Failed to save settings file for ${a}`,c)}}g.on("change",(0,c.debounce)(q,250));const r=g.prependOnceListener.bind(g),s=g.prependListener.bind(g),t=g.listeners.bind(g),u=g.once.bind(g),v=g.off.bind(g),w=g.on.bind(g)
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tb24vc2V0dGluZ3MudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnVpbGRJbmZvLCBQYXRocyB9IGZyb20gJ0Bjb25zdGFudHMnO1xyXG5pbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tICdldmVudHMnO1xyXG5pbXBvcnQgeyBkZWJvdW5jZSB9IGZyb20gJ0B1dGlsaXRpZXMnO1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcclxuaW1wb3J0IGZzIGZyb20gJ2ZzJztcclxuXHJcbmNvbnN0IEV2ZW50cyA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuZXhwb3J0IGNvbnN0IHNldHRpbmdzID0ge307XHJcblxyXG5pZiAoIWZzLmV4aXN0c1N5bmMoUGF0aHMuc3RvcmFnZSkpIHtcclxuICBmcy5ta2RpclN5bmMoUGF0aHMuc3RvcmFnZSk7XHJcbn1cclxuXHJcbmlmICghZnMuZXhpc3RzU3luYyhQYXRocy5zZXR0aW5ncykpIHtcclxuICBmcy5ta2RpclN5bmMoUGF0aHMuc2V0dGluZ3MpO1xyXG59XHJcblxyXG5jb25zdCBmb2xkZXIgPSBwYXRoLmpvaW4oUGF0aHMuc2V0dGluZ3MsIEJ1aWxkSW5mby5yZWxlYXNlQ2hhbm5lbCk7XHJcbmlmICghZnMuZXhpc3RzU3luYyhmb2xkZXIpKSBmcy5ta2RpclN5bmMoZm9sZGVyKTtcclxuXHJcbmNvbnN0IGZpbGVzID0gZnMucmVhZGRpclN5bmMoZm9sZGVyKS5maWx0ZXIoZiA9PiBmLmVuZHNXaXRoKCcuanNvbicpKTtcclxuXHJcbmZvciAoY29uc3QgZmlsZSBvZiBmaWxlcykge1xyXG4gIGNvbnN0IG5hbWUgPSBmaWxlLnJlcGxhY2UoJy5qc29uJywgJycpO1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBkYXRhID0gcmVxdWlyZShwYXRoLnJlc29sdmUoZm9sZGVyLCBmaWxlKSk7XHJcbiAgICBzZXR0aW5nc1tuYW1lXSA9IGRhdGE7XHJcbiAgfSBjYXRjaCB7XHJcbiAgICBzZXR0aW5nc1tuYW1lXSA9IHt9O1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldChpZDogc3RyaW5nLCBrZXk6IHN0cmluZywgdmFsdWU6IGFueSk6IHZvaWQge1xyXG4gIHNldHRpbmdzW2lkXSA/Pz0ge307XHJcbiAgXHJcbiAgY29uc3QgZGF0YSA9IHtcclxuICAgIHBhdGg6IGtleS5zcGxpdCgnLicpLFxyXG4gICAgcmVzOiBzZXR0aW5nc1tpZF1cclxuICB9O1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEucGF0aC5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgIGNvbnN0IHNlZ21lbnQgPSBkYXRhLnBhdGhbaV07XHJcblxyXG4gICAgZGF0YS5yZXNbc2VnbWVudF0gPz89IHt9O1xyXG4gICAgZGF0YS5yZXMgPSBkYXRhLnJlc1tzZWdtZW50XTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHByb3AgPSBkYXRhLnBhdGhbZGF0YS5wYXRoLmxlbmd0aCAtIDFdO1xyXG5cclxuICBpZiAodmFsdWUgIT09IHZvaWQgMCkge1xyXG4gICAgZGF0YS5yZXNbcHJvcF0gPSB2YWx1ZTtcclxuICB9IGVsc2Uge1xyXG4gICAgZGVsZXRlIGRhdGEucmVzW3Byb3BdO1xyXG4gIH1cclxuXHJcbiAgRXZlbnRzLmVtaXQoJ3NldCcsIHsgaWQsIGtleSwgdmFsdWUgfSk7XHJcbiAgRXZlbnRzLmVtaXQoJ2NoYW5nZScsIHsgdHlwZTogJ3NldCcsIGlkLCBrZXksIHZhbHVlIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdG9nZ2xlKGlkOiBzdHJpbmcsIGtleTogc3RyaW5nLCBkZWZhdWx0VmFsdWU6IGJvb2xlYW4pOiB2b2lkIHtcclxuICBjb25zdCB2YWx1ZSA9ICEoZ2V0KGlkLCBrZXkpID8/IGRlZmF1bHRWYWx1ZSk7XHJcbiAgc2V0dGluZ3NbaWRdID8/PSB7fTtcclxuXHJcbiAgY29uc3QgZGF0YSA9IHtcclxuICAgIHBhdGg6IGtleS5zcGxpdCgnLicpLFxyXG4gICAgcmVzOiBzZXR0aW5nc1tpZF1cclxuICB9O1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEucGF0aC5sZW5ndGggLSAxOyBpKyspIHtcclxuICAgIGNvbnN0IHNlZ21lbnQgPSBkYXRhLnBhdGhbaV07XHJcblxyXG4gICAgZGF0YS5yZXNbc2VnbWVudF0gPz89IHt9O1xyXG4gICAgZGF0YS5yZXMgPSBkYXRhLnJlc1tzZWdtZW50XTtcclxuICB9XHJcblxyXG4gIGNvbnN0IHByb3AgPSBkYXRhLnBhdGhbZGF0YS5wYXRoLmxlbmd0aCAtIDFdO1xyXG4gIGRhdGEucmVzW3Byb3BdID0gdmFsdWU7XHJcblxyXG4gIEV2ZW50cy5lbWl0KCd0b2dnbGUnLCB7IGlkLCBrZXksIHZhbHVlLCBkZWZhdWx0VmFsdWUgfSk7XHJcbiAgRXZlbnRzLmVtaXQoJ2NoYW5nZScsIHsgdHlwZTogJ3RvZ2dsZScsIGlkLCBrZXksIHZhbHVlLCBkZWZhdWx0VmFsdWUgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXQoaWQ6IHN0cmluZywga2V5OiBzdHJpbmcsIGRlZmF1bHRWYWx1ZT86IGFueSk6IGFueSB7XHJcbiAgaWYgKCFzZXR0aW5nc1tpZF0pIHtcclxuICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XHJcbiAgfVxyXG5cclxuICBjb25zdCBkYXRhID0ge1xyXG4gICAgcGF0aDoga2V5LnNwbGl0KCcuJyksXHJcbiAgICByZXM6IHNldHRpbmdzW2lkXVxyXG4gIH07XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5wYXRoLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjb25zdCBzZWdtZW50ID0gZGF0YS5wYXRoW2ldO1xyXG4gICAgZGF0YS5yZXMgPSBkYXRhLnJlc1tzZWdtZW50XTtcclxuICAgIGlmICghZGF0YS5yZXMpIGJyZWFrO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGRhdGEucmVzID8/IGRlZmF1bHRWYWx1ZTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNhdmUoeyBpZCB9KSB7XHJcbiAgaWYgKCFmcy5leGlzdHNTeW5jKGZvbGRlcikpIGZzLm1rZGlyU3luYyhmb2xkZXIpO1xyXG5cclxuICB0cnkge1xyXG4gICAgY29uc3QgY29udGVudHMgPSBKU09OLnN0cmluZ2lmeShzZXR0aW5nc1tpZF0sIG51bGwsIDIpO1xyXG4gICAgZnMud3JpdGVGaWxlU3luYyhwYXRoLmpvaW4oZm9sZGVyLCBgJHtpZH0uanNvbmApLCBjb250ZW50cyk7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgY29uc29sZS5lcnJvcihgRmFpbGVkIHRvIHNhdmUgc2V0dGluZ3MgZmlsZSBmb3IgJHtpZH1gLCBlKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIFNhdmUgc2V0dGluZ3MgdG8gZmlsZSBvbiBjaGFuZ2VcclxuRXZlbnRzLm9uKCdjaGFuZ2UnLCBkZWJvdW5jZShzYXZlLCAyNTApKTtcclxuXHJcbmV4cG9ydCBjb25zdCBwcmVwZW5kT25jZUxpc3RlbmVyOiB0eXBlb2YgRXZlbnRzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBFdmVudHMucHJlcGVuZE9uY2VMaXN0ZW5lci5iaW5kKEV2ZW50cyk7XHJcbmV4cG9ydCBjb25zdCBwcmVwZW5kTGlzdGVuZXI6IHR5cGVvZiBFdmVudHMucHJlcGVuZExpc3RlbmVyID0gRXZlbnRzLnByZXBlbmRMaXN0ZW5lci5iaW5kKEV2ZW50cyk7XHJcbmV4cG9ydCBjb25zdCBsaXN0ZW5lcnM6IHR5cGVvZiBFdmVudHMubGlzdGVuZXJzID0gRXZlbnRzLmxpc3RlbmVycy5iaW5kKEV2ZW50cyk7XHJcbmV4cG9ydCBjb25zdCBvbmNlOiB0eXBlb2YgRXZlbnRzLm9uY2UgPSBFdmVudHMub25jZS5iaW5kKEV2ZW50cyk7XHJcbmV4cG9ydCBjb25zdCBvZmY6IHR5cGVvZiBFdmVudHMub2ZmID0gRXZlbnRzLm9mZi5iaW5kKEV2ZW50cyk7XHJcbmV4cG9ydCBjb25zdCBvbjogdHlwZW9mIEV2ZW50cy5vbiA9IEV2ZW50cy5vbi5iaW5kKEV2ZW50cyk7Il0sIm5hbWVzIjpbInNldHRpbmdzIiwic2V0IiwidG9nZ2xlIiwiZ2V0Iiwic2F2ZSIsInByZXBlbmRPbmNlTGlzdGVuZXIiLCJwcmVwZW5kTGlzdGVuZXIiLCJsaXN0ZW5lcnMiLCJvbmNlIiwib2ZmIiwib24iLCJFdmVudHMiLCJFdmVudEVtaXR0ZXIiLCJmcyIsImV4aXN0c1N5bmMiLCJQYXRocyIsInN0b3JhZ2UiLCJta2RpclN5bmMiLCJmb2xkZXIiLCJwYXRoIiwiam9pbiIsIkJ1aWxkSW5mbyIsInJlbGVhc2VDaGFubmVsIiwiZmlsZXMiLCJyZWFkZGlyU3luYyIsImZpbHRlciIsImYiLCJlbmRzV2l0aCIsImZpbGUiLCJuYW1lIiwicmVwbGFjZSIsImRhdGEiLCJyZXF1aXJlIiwicmVzb2x2ZSIsImlkIiwia2V5IiwidmFsdWUiLCJzcGxpdCIsInJlcyIsImkiLCJsZW5ndGgiLCJzZWdtZW50IiwicHJvcCIsImVtaXQiLCJ0eXBlIiwiZGVmYXVsdFZhbHVlIiwiY29udGVudHMiLCJKU09OIiwic3RyaW5naWZ5Iiwid3JpdGVGaWxlU3luYyIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJkZWJvdW5jZSIsImJpbmQiXSwibWFwcGluZ3MiOiJBQUFBLGdLQU9hQSxRQUFRLEtBQVJBLENBQVEsQ0F5QkxDLEdBQUcsS0FBSEEsQ0FBRyxDQTJCSEMsTUFBTSxLQUFOQSxDQUFNLENBdUJOQyxHQUFHLEtBQUhBLENBQUcsQ0FtQkhDLElBQUksS0FBSkEsQ0FBSSxDQWNQQyxtQkFBbUIsS0FBbkJBLENBQW1CLENBQ25CQyxlQUFlLEtBQWZBLENBQWUsQ0FDZkMsU0FBUyxLQUFUQSxDQUFTLENBQ1RDLElBQUksS0FBSkEsQ0FBSSxDQUNKQyxHQUFHLEtBQUhBLENBQUcsQ0FDSEMsRUFBRSxLQUFGQSxDQUFFLG1CQXhIa0IsYUFBWSxZQUNoQixRQUFRLFlBQ1osbUJBQVksY0FDcEIsTUFBTSxlQUNSLElBQUksc0RBRW5CLE1BQU1DLENBQU0sQ0FBRyxJQUFJQyxDQUFZLGFBQUEsQUFBRSxDQUNw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