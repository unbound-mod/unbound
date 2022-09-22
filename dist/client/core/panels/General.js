"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"default",{enumerable:!0,get:()=>n});const a=require("../../components/settings"),b=require("../../components/index"),c=require("../../components/discord"),d=require("../../api/settings"),e=require("../../modules/webpack/common"),f=require("../../../common/utilities/index"),g=require("@webpack"),h=function _interopRequireWildcard(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=_getRequireWildcardCache(b);if(c&&c.has(a))return c.get(a);var d={},e=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var f in a)if("default"!==f&&Object.prototype.hasOwnProperty.call(a,f)){var g=e?Object.getOwnPropertyDescriptor(a,f):null;g&&(g.get||g.set)?Object.defineProperty(d,f,g):d[f]=a[f]}return d.default=a,c&&c.set(a,d),d}(require("../../api/toasts")),i=_interopRequireDefault(require("react")),j=_interopRequireDefault(require("../../styles/panels/general.css")),k=require("../components/Icons");function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _getRequireWildcardCache(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(_getRequireWildcardCache=function(a){return a?c:b})(a)}j.default.append();const l=(0,f.memoize)(()=>(0,g.findLazy)(g.filters.byDisplayName("NotificationSettings"))),m=b.AsyncComponent.from(l);class General extends i.default.Component{constructor(a){super(a),this.state={toasts:!1,developer:!1,splash:!1,bd:!1,splashAdd:""}}render(){return i.default.createElement(b.ErrorBoundary,null,i.default.createElement(c.FormTitle,{tag:"h1",className:"unbound-settings-title"},e.Locale.Messages.UNBOUND_GENERAL),this.renderToasts(),this.renderTweaks(),this.renderSplash(),this.renderDeveloper(),this.renderBDSettings())}renderToasts(){let{settings:c}=this.props,d=(0,f.parseColor)("--background-tertiary");return i.default.createElement(b.Category,{title:e.Locale.Messages.UNBOUND_TOAST_SETTINGS_TITLE,description:e.Locale.Messages.UNBOUND_TOAST_SETTINGS_DESCRIPTION,icon:"ChatBubble",className:"unbound-settings-toast-category",opened:this.state.toasts,onChange:()=>this.setState(a=>({...a,toasts:!a.toasts}))},i.default.createElement(m,{className:"unbound-settings-toast-position",position:this.parsePosition(c.get("toasts.position","bottom-right")),onChange:(a,b)=>{let d=this.parsePosition(b);c.set("toasts.position",d),this.onToastsChange(),"disabled"===d&&h.clear()}}),i.default.createElement(b.Divider,{style:{marginTop:10}}),i.default.createElement(a.Switch,{title:e.Locale.Messages.UNBOUND_TOAST_SETTINGS_RESET_TIMEOUT_TITLE,description:e.Locale.Messages.UNBOUND_TOAST_SETTINGS_RESET_TIMEOUT_DESCRIPTION,checked:c.get("toasts.resetTimeoutOnHover",!1),onChange:()=>c.toggle("toasts.resetTimeoutOnHover",!1)}),i.default.createElement(a.Switch,{title:e.Locale.Messages.UNBOUND_TOAST_SETTINGS_CUSTOM_TITLE,description:e.Locale.Messages.UNBOUND_TOAST_SETTINGS_CUSTOM_DESCRIPTION,checked:c.get("toasts.useCustomColours",!1),endDivider:c.get("toasts.useCustomColours",!1),onChange:()=>c.toggle("toasts.useCustomColours",!1),bottomMargin:c.get("toasts.useCustomColours",!1)?15:7.5}),c.get("toasts.useCustomColours",!1)&&i.default.createElement(i.default.Fragment,null,i.default.createElement(a.ColorPicker,{value:c.get("toasts.bgColor"),className:"unbound-settings-toast-color",onChange:a=>c.set("toasts.bgColor",a),default:e.Colors.rgb2int(`rgb(${d[0]}, ${d[1]}, ${d[2]})`)}),i.default.createElement(a.SliderInput,{title:e.Locale.Messages.UNBOUND_TOAST_SETTINGS_OPACITY_TITLE,minValue:1,maxValue:10,markers:[1,2,3,4,5,6,7,8,9,10],defaultValue:10,initialValue:10*c.get("toasts.bgOpacity",.5),onValueChange:a=>c.set("toasts.bgOpacity",a/10),onMarkerRender:a=>`${a/10}`,onValueRender:a=>(a/10).toFixed(2)}),i.default.createElement(a.SliderInput,{title:e.Locale.Messages.UNBOUND_TOAST_SETTINGS_BLUR_TITLE,minValue:0,maxValue:15,markers:[0,2.5,5,7.5,10,12.5,15],defaultValue:7.5,initialValue:c.get("toasts.blurAmount",7.5),onValueChange:a=>c.set("toasts.blurAmount",a),endDivider:!1,bottomMargin:7.5,onValueRender:a=>a.toFixed(1)})))}renderTweaks(){let{settings:c}=this.props;return i.default.createElement(b.Category,{title:e.Locale.Messages.UNBOUND_TWEAKS_SETTINGS_TITLE,description:e.Locale.Messages.UNBOUND_TWEAKS_SETTINGS_DESCRIPTION,icon:"Science",className:"unbound-settings-tweaks-category",opened:this.state.tweaks,onChange:()=>this.setState(a=>({...a,tweaks:!a.tweaks}))},i.default.createElement(a.Switch,{title:e.Locale.Messages.UNBOUND_ANTI_TRACK_TITLE,description:e.Locale.Messages.UNBOUND_ANTI_TRACK_DESCRIPTION,checked:c.get("tweaks.antiTrack",!0),onChange:()=>c.toggle("tweaks.antiTrack",!0),bottomMargin:7.5,endDivider:!1}),i.default.createElement("div",{style:{marginBottom:2.5}}))}renderDeveloper(){let{settings:c}=this.props;return i.default.createElement(b.Category,{title:e.Locale.Messages.UNBOUND_DEV_SETTINGS_TITLE,description:e.Locale.Messages.UNBOUND_DEV_SETTINGS_DESCRIPTION,icon:"InlineCode",className:"unbound-settings-developer-category",opened:this.state.developer,onChange:()=>this.setState(a=>({...a,developer:!a.developer}))},i.default.createElement(a.Switch,{title:e.Locale.Messages.UNBOUND_DEV_SETTINGS_WARNING_TITLE,description:e.Locale.Messages.UNBOUND_DEV_SETTINGS_WARNING_DESCRIPTION,checked:c.get("dev.devtoolsWarning",!1),onChange:()=>c.toggle("dev.devtoolsWarning",!1)}),i.default.createElement(a.Switch,{title:e.Locale.Messages.UNBOUND_DEV_SETTINGS_EXPERIMENTS_TITLE,description:e.Locale.Messages.UNBOUND_DEV_SETTINGS_EXPERIMENTS_DESCRIPTION,checked:c.get("dev.experiments",!1),onChange:()=>c.toggle("dev.experiments",!1),bottomMargin:7.5,endDivider:!1}),i.default.createElement("div",{style:{marginBottom:2.5}}))}renderSplash(){let{settings:d}=this.props,f=d.get("splashQuotes",["Unleash the chains"]),onSubmit=a=>{13===a.keyCode&&0!==[...this.state.splashAdd].filter(Boolean).length&&(f.push(this.state.splashAdd),d.set("splashQuotes",f),this.setState({splashAdd:""}))};return i.default.createElement(b.Category,{title:e.Locale.Messages.UNBOUND_SPLASH_SETTINGS_TITLE,description:e.Locale.Messages.UNBOUND_SPLASH_SETTINGS_DESCRIPTION,icon:"Fullscreen",className:"unbound-settings-splash-category",opened:this.state.splash,onChange:()=>this.setState(a=>({...a,splash:!a.splash}))},i.default.createElement(a.SettingsItem,{title:e.Locale.Messages.UNBOUND_SPLASH_SETTINGS_QUOTES_TITLE,endDivider:!1},i.default.createElement("div",{className:"unbound-settings-splash-quotes","data-count":f.length??0},Array.isArray(f)&&f.map(a=>i.default.createElement("div",{onMouseEnter:a=>a.target.classList.add("is-hovered"),onMouseLeave:a=>a.target.classList.remove("is-hovered"),className:"unbound-settings-splash-quote",onClick(){let b=f.indexOf(a);b> -1&&(f.splice(b,1),d.set("splashQuotes",f))}},i.default.createElement("span",null,a),i.default.createElement("span",{className:"unbound-settings-splash-quote-remove"},e.Locale.Messages.UNBOUND_SPLASH_SETTINGS_QUOTES_REMOVE))),i.default.createElement("div",{className:"unbound-settings-splash-quote-wrapper"},i.default.createElement("input",{type:"text",placeholder:e.Locale.Messages.UNBOUND_SPLASH_SETTINGS_QUOTES_ADD,className:"unbound-settings-splash-quote-add",onChange:a=>this.setState({splashAdd:a.target.value}),value:this.state.splashAdd,onSelect:()=>document.addEventListener("keydown",onSubmit),onBlur:()=>document.removeEventListener("keydown",onSubmit)}),i.default.createElement(c.Tooltip,{className:"unbound-settings-splash-quote-tooltip",text:e.Locale.Messages.UNBOUND_SPLASH_SETTINGS_QUOTES_TOOLTIP},i.default.createElement("div",{onClick:()=>onSubmit({keyCode:13})},i.default.createElement(b.Icon,{className:"unbound-settings-splash-quote-add-icon",width:24,height:18,name:"PlusCircle"})))))),i.default.createElement("div",{style:{marginBottom:2.5}}))}renderBDSettings(){if(!window.BdApi)return null;let a=window.BDInternal?.SettingsManager;return i.default.createElement(b.Category,{title:e.Locale.Messages.UNBOUND_BD_SETTINGS_TITLE,description:e.Locale.Messages.UNBOUND_BD_SETTINGS_DESCRIPTION,icon:()=>i.default.createElement(k.Bd,{className:"unbound-category-icon"}),opened:this.state.bd,onChange:()=>this.setState({bd:!this.state.bd})},Object.entries(a.defaultSettings).map(([a,{settings:b}])=>b.map(b=>this.renderBDSetting(a,b))))}renderBDSetting(c,d){let e=window.BDInternal?.SettingsManager;switch(d.type){case"switch":return d.requires&&d.requires.some(a=>!e.isEnabled(a))?null:i.default.createElement(a.Switch,{endDivider:!1,className:"unbound-bd-switch",title:d.name,checked:e.isEnabled(d.id)??d.value,onChange:a=>{e.setSetting(d.id,a),this.forceUpdate()}});case"category":return d.requires&&d.requires.some(a=>!e.isEnabled(a))?null:i.default.createElement(b.Category,{className:"unbound-bd-category",title:d.name,endDivider:!0,opened:this.state[`${c}-${d.name}`]?? !1,onChange:()=>this.setState({[`${c}-${d.name}`]:!this.state[`${c}-${d.name}`]})},d.items.map(a=>this.renderBDSetting(c,a)))}}componentWillUnmount(){if(this.toasts)for(let a of this.toasts)h.close(a)}onToastsChange(){for(let a of(this.toasts??=[],this.toasts))h.close(a,!0);this.toasts.push(h.open({title:e.Locale.Messages.UNBOUND_TOAST_EXAMPLE_TITLE,color:"var(--info-positive-foreground)",icon:"CheckmarkCircle",content:e.Locale.Messages.UNBOUND_TOAST_EXAMPLE_CONTENT}))}parsePosition(a){return a.includes("-")?a.split("-").map((a,b)=>0===b?a:`${a[0].toUpperCase()}${a.slice(1)}`).join(""):a.split(/(top|bottom)/).filter(Boolean).join("-").toLowerCase()}}const n=(0,d.connectComponent)(General,"unbound")