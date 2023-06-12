"use strict";var e={name:"JSlider",props:{list:{type:Array,required:!0},curIdx:{type:Number,default:0,required:!1},auto:{type:Number,default:0,required:!1}},data(){return{currentIdx:this.curIdx,timer:null}},created(){this.move()},watch:{currentIdx(){this.$emit("slider",this.currentIdx)}},methods:{hClick(){this.$emit("click",this.currentIdx)},hDirectorEnter(e){this.currentIdx=e},move(){this.auto&&(this.timer=setInterval(()=>{this.hNext()},this.auto))},mouseEnter(){clearInterval(this.timer)},mouseleave(){this.move()},hPrev(){this.currentIdx=this.currentIdx-1,-1===this.currentIdx&&(this.currentIdx=this.list.length-1)},hNext(){this.currentIdx=this.currentIdx+1,this.currentIdx===this.list.length&&(this.currentIdx=0)}}};function t(e,t,r,i,n,s,o,d,l,a){"boolean"!=typeof o&&(l=d,d=o,o=!1);const c="function"==typeof r?r.options:r;let u;if(e&&e.render&&(c.render=e.render,c.staticRenderFns=e.staticRenderFns,c._compiled=!0,n&&(c.functional=!0)),i&&(c._scopeId=i),s?(u=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),t&&t.call(this,l(e)),e&&e._registeredComponents&&e._registeredComponents.add(s)},c._ssrRegister=u):t&&(u=o?function(e){t.call(this,a(e,this.$root.$options.shadowRoot))}:function(e){t.call(this,d(e))}),u)if(c.functional){const e=c.render;c.render=function(t,r){return u.call(r),e(t,r)}}else{const e=c.beforeCreate;c.beforeCreate=e?[].concat(e,u):[u]}return r}const r="undefined"!=typeof navigator&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());function i(e){return(e,t)=>function(e,t){const i=r?t.media||"default":e,o=s[i]||(s[i]={ids:new Set,styles:[]});if(!o.ids.has(e)){o.ids.add(e);let r=t.source;if(t.map&&(r+="\n/*# sourceURL="+t.map.sources[0]+" */",r+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(t.map))))+" */"),o.element||(o.element=document.createElement("style"),o.element.type="text/css",t.media&&o.element.setAttribute("media",t.media),void 0===n&&(n=document.head||document.getElementsByTagName("head")[0]),n.appendChild(o.element)),"styleSheet"in o.element)o.styles.push(r),o.element.styleSheet.cssText=o.styles.filter(Boolean).join("\n");else{const e=o.ids.size-1,t=document.createTextNode(r),i=o.element.childNodes;i[e]&&o.element.removeChild(i[e]),i.length?o.element.insertBefore(t,i[e]):o.element.appendChild(t)}}}(e,t)}let n;const s={};const o=t({render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"slider"},[r("div",{staticClass:"slider-content",on:{click:e.hClick,mouseenter:e.mouseEnter,mouseleave:e.mouseleave}},[r("transition-group",{attrs:{name:"fade"}},e._l(e.list,(function(t,i){return r("div",{directives:[{name:"show",rawName:"v-show",value:i===e.currentIdx,expression:"i === currentIdx"}],key:t,staticClass:"slider-item"},[r("img",{attrs:{src:t.url,alt:t.alt}})])})),0)],1),e._v(" "),r("span",{staticClass:"btn btn_left",on:{click:e.hPrev}}),e._v(" "),r("span",{staticClass:"btn btn_right",on:{click:e.hNext}}),e._v(" "),r("div",{staticClass:"txt"},[e._v(e._s(e.list[e.currentIdx].alt))]),e._v(" "),r("ol",{staticClass:"indirector"},e._l(e.list.length,(function(t){return r("li",{key:t,class:{current:t-1===e.currentIdx},on:{mouseenter:function(r){return e.hDirectorEnter(t-1)}}})})),0)])},staticRenderFns:[]},(function(e){e&&e("data-v-0c28695e_0",{source:'.fade-enter-active,.fade-leave-active{transition:all .3s}.fade-enter,.fade-leave-to{opacity:0}.slider .slider-content,.slider img{width:100%;height:100%}.slider{margin:0 auto;border:1px solid #ccc;position:relative}.slider .slider-content{overflow:hidden;position:relative}.slider .slider-content .slider-item{position:absolute;top:0;left:0}.slider img{width:100%}.slider .btn,.slider .indirector,.slider .txt{position:absolute}.slider .btn{cursor:pointer;width:50px;height:50px;border-radius:50%;background-color:rgba(255,255,255,0);top:50%;transform:translateY(-50%);transition:background-color .2s}.slider .btn:hover{background-color:#fff}.slider .btn:after,.slider .btn:before{content:"";height:3px;width:25px;background-color:#fff;position:absolute;left:15px;top:23px;transform:rotateZ(60deg);transform-origin:0 center;transition:all .2s}.slider .btn:after{transform:rotateZ(-60deg)}.slider .btn:hover:before{transform:rotateZ(45deg);background-color:red}.slider .btn:hover:after{transform:rotateZ(-45deg);background-color:red}.slider .btn.btn_right:after,.slider .btn.btn_right:before{transform-origin:right center}.slider .btn.btn_left{left:20px}.slider .btn.btn_right{right:20px}.slider .txt{text-indent:1em;line-height:40px;background-color:rgba(0,0,0,.5);text-align:left;bottom:0;left:0;width:100%;color:#fff}.slider .indirector{bottom:10px;right:1em}.slider .indirector li{display:inline-block;margin:0 5px;height:10px;width:10px;border-radius:50%;background-color:#fff}.slider .indirector li{transition:transform .2s}.slider .indirector .current{background-color:#369;transform:scale(1.2)}',map:void 0,media:void 0})}),e,void 0,!1,void 0,!1,i,void 0,void 0);o.install=e=>{e.component(o.name,o)},module.exports=o;
