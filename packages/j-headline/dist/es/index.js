function e(e,t,n,s,o,i,r,d,a,l){"boolean"!=typeof r&&(a=d,d=r,r=!1);const c="function"==typeof n?n.options:n;let u;if(e&&e.render&&(c.render=e.render,c.staticRenderFns=e.staticRenderFns,c._compiled=!0,o&&(c.functional=!0)),s&&(c._scopeId=s),i?(u=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),t&&t.call(this,a(e)),e&&e._registeredComponents&&e._registeredComponents.add(i)},c._ssrRegister=u):t&&(u=r?function(e){t.call(this,l(e,this.$root.$options.shadowRoot))}:function(e){t.call(this,d(e))}),u)if(c.functional){const e=c.render;c.render=function(t,n){return u.call(n),e(t,n)}}else{const e=c.beforeCreate;c.beforeCreate=e?[].concat(e,u):[u]}return n}const t=e({},void 0,{name:"j-headline",props:{level:{type:Number,default:1,required:!1},icon:{type:String,default:"",required:!1}},render(e){let t,n;if(this.icon&&(t=e("i",{class:"icon "+this.icon})),this.$slots.sub){const t=e("div",{class:"sub header"},[this.$slots.sub]);n=e("div",{class:"content"},[this.$slots.default,t])}else n=e("div",{class:"content"},[this.$slots.default]);return e("h"+this.level,{class:"ui header"},[t,n])}},"data-v-126fe7ae",void 0,void 0,!1,void 0,void 0,void 0);t.install=e=>{e.component(t.name,t)};export{t as default};
