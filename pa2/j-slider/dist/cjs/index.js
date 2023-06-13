'use strict';

//

var script = {
  name: 'JSlider',
  props: {
    list: {
      type: Array,
      required: true
    },
    curIdx: {
      type: Number,
      default: 0,
      required: false
    },
    auto: {
      type: Number,
      default: 0,
      required: false
    }
  },
  data () {
    return {
      currentIdx: this.curIdx,
      timer: null
    }
  },
  created () {
    this.move();
  },
  watch: {
    currentIdx () {
      this.$emit('slider', this.currentIdx);
    }
  },
  methods: {
    // 用户点击事件
    hClick () {
      this.$emit('click', this.currentIdx);
    },
    // 指示条鼠标进入事件
    hDirectorEnter (i) {
      this.currentIdx = i;
    },
    // 定时器自动播放
    move () {
      if (this.auto) {
        this.timer = setInterval(() => {
          this.hNext();
        }, this.auto);
      }
    },
    // 鼠标进入
    mouseEnter () {
      clearInterval(this.timer);
    },
    // 鼠标离开
    mouseleave () {
      this.move();
    },
    // 上一张
    hPrev () {
      this.currentIdx = this.currentIdx - 1;
      if (this.currentIdx === -1) {
        this.currentIdx = this.list.length - 1;
      }
    },
    // 下一张
    hNext () {
      this.currentIdx = this.currentIdx + 1;
      if (this.currentIdx === this.list.length) {
        this.currentIdx = 0;
      }
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "slider" }, [
    _c(
      "div",
      {
        staticClass: "slider-content",
        on: {
          click: _vm.hClick,
          mouseenter: _vm.mouseEnter,
          mouseleave: _vm.mouseleave,
        },
      },
      [
        _c(
          "transition-group",
          { attrs: { name: "fade" } },
          _vm._l(_vm.list, function (item, i) {
            return _c(
              "div",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: i === _vm.currentIdx,
                    expression: "i === currentIdx",
                  },
                ],
                key: item,
                staticClass: "slider-item",
              },
              [_c("img", { attrs: { src: item.url, alt: item.alt } })]
            )
          }),
          0
        ),
      ],
      1
    ),
    _vm._v(" "),
    _c("span", { staticClass: "btn btn_left", on: { click: _vm.hPrev } }),
    _vm._v(" "),
    _c("span", { staticClass: "btn btn_right", on: { click: _vm.hNext } }),
    _vm._v(" "),
    _c("div", { staticClass: "txt" }, [
      _vm._v(_vm._s(_vm.list[_vm.currentIdx].alt)),
    ]),
    _vm._v(" "),
    _c(
      "ol",
      { staticClass: "indirector" },
      _vm._l(_vm.list.length, function (item) {
        return _c("li", {
          key: item,
          class: { current: item - 1 === _vm.currentIdx },
          on: {
            mouseenter: function ($event) {
              return _vm.hDirectorEnter(item - 1)
            },
          },
        })
      }),
      0
    ),
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-9fb08138_0", { source: "\n.fade-enter-active,.fade-leave-active {\n  transition: all .3s ;\n}\n.fade-enter, .fade-leave-to{\n  opacity: 0;\n}\n.slider .slider-content,\n.slider img {\n  width: 100%;\n  height: 100%;\n}\n.slider {\n  margin: 0 auto;\n  border: 1px solid #ccc;\n  position: relative;\n}\n.slider .slider-content {\n  overflow: hidden;\n  position: relative;\n}\n.slider .slider-content .slider-item {\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n.slider img {\n  width: 100%;\n}\n.slider .btn,\n.slider .txt,\n.slider .indirector {\n  position: absolute;\n}\n.slider .btn {\n  cursor: pointer;\n  width: 50px;\n  height: 50px;\n  border-radius: 50%;\n  background-color: rgba(255, 255, 255, 0);\n  top: 50%;\n  transform: translateY(-50%);\n  transition: background-color 0.2s;\n}\n.slider .btn:hover {\n  background-color: rgba(255, 255, 255, 1);\n}\n.slider .btn:before,\n.slider .btn:after {\n  content: \"\";\n  height: 3px;\n  width: 25px;\n  background-color: #fff;\n  position: absolute;\n  left: 15px;\n  top: 23px;\n  transform: rotateZ(60deg);\n  transform-origin: 0px center;\n  transition: all 0.2s;\n}\n.slider .btn:after {\n  transform: rotateZ(-60deg);\n}\n.slider .btn:hover:before {\n  transform: rotateZ(45deg);\n  background-color: red;\n}\n.slider .btn:hover:after {\n  transform: rotateZ(-45deg);\n  background-color: red;\n}\n.slider .btn.btn_right:before,\n.slider .btn.btn_right:after {\n  transform-origin: right center;\n}\n.slider .btn.btn_left {\n  left: 20px;\n}\n.slider .btn.btn_right {\n  right: 20px;\n}\n.slider .txt {\n  text-indent: 1em;\n  line-height: 40px;\n  background-color: rgba(0, 0, 0, 0.5);\n  text-align: left;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  color: #fff;\n}\n.slider .indirector {\n  bottom: 10px;\n  right: 1em;\n}\n.slider .indirector li {\n  display: inline-block;\n  margin: 0 5px;\n  height: 10px;\n  width: 10px;\n  border-radius: 50%;\n  background-color: #fff;\n}\n.slider .indirector li {\n  transition: transform 0.2s;\n}\n.slider .indirector .current {\n  background-color: #369;\n  transform: scale(1.2);\n}\n", map: {"version":3,"sources":["/Users/jarvis/Desktop/test/lerna-repo-main/packages/j-slider/src/slider.vue"],"names":[],"mappings":";AAsGA;EACA,oBAAA;AACA;AACA;EACA,UAAA;AACA;AACA;;EAEA,WAAA;EACA,YAAA;AACA;AACA;EACA,cAAA;EACA,sBAAA;EACA,kBAAA;AACA;AACA;EACA,gBAAA;EACA,kBAAA;AACA;AACA;EACA,kBAAA;EACA,MAAA;EACA,OAAA;AACA;AACA;EACA,WAAA;AACA;AACA;;;EAGA,kBAAA;AACA;AACA;EACA,eAAA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,wCAAA;EACA,QAAA;EACA,2BAAA;EACA,iCAAA;AACA;AACA;EACA,wCAAA;AACA;AACA;;EAEA,WAAA;EACA,WAAA;EACA,WAAA;EACA,sBAAA;EACA,kBAAA;EACA,UAAA;EACA,SAAA;EACA,yBAAA;EACA,4BAAA;EACA,oBAAA;AACA;AACA;EACA,0BAAA;AACA;AACA;EACA,yBAAA;EACA,qBAAA;AACA;AACA;EACA,0BAAA;EACA,qBAAA;AACA;AAEA;;EAEA,8BAAA;AACA;AAEA;EACA,UAAA;AACA;AACA;EACA,WAAA;AACA;AAEA;EACA,gBAAA;EACA,iBAAA;EACA,oCAAA;EACA,gBAAA;EACA,SAAA;EACA,OAAA;EACA,WAAA;EACA,WAAA;AACA;AACA;EACA,YAAA;EACA,UAAA;AACA;AACA;EACA,qBAAA;EACA,aAAA;EACA,YAAA;EACA,WAAA;EACA,kBAAA;EACA,sBAAA;AACA;AACA;EACA,0BAAA;AACA;AACA;EACA,sBAAA;EACA,qBAAA;AACA","file":"slider.vue","sourcesContent":["<template>\n  <div class=\"slider\">\n    <div @click=\"hClick\" class=\"slider-content\" @mouseenter=\"mouseEnter\" @mouseleave=\"mouseleave\">\n      <transition-group name=\"fade\">\n        <div class=\"slider-item\" v-show=\"i === currentIdx\" v-for=\"(item, i) in list\" :key=\"item\">\n          <img :src=\"item.url\" :alt=\"item.alt\" />\n        </div>\n      </transition-group>\n    </div>\n\n    <!-- 左右按钮 -->\n    <span class=\"btn btn_left\" @click=\"hPrev\"></span>\n    <span class=\"btn btn_right\" @click=\"hNext\"></span>\n\n    <!-- 标题区域 -->\n    <div class=\"txt\">{{list[currentIdx].alt}}</div>\n    <!-- 指示条 -->\n    <ol class=\"indirector\">\n      <li @mouseenter=\"hDirectorEnter(item - 1)\" :class=\"{current: item - 1 === currentIdx}\" v-for=\"item in list.length\" :key=\"item\"></li>\n    </ol>\n  </div>\n</template>\n\n<script>\nimport 'semantic-ui-css/semantic.min.css'\n\nexport default {\n  name: 'JSlider',\n  props: {\n    list: {\n      type: Array,\n      required: true\n    },\n    curIdx: {\n      type: Number,\n      default: 0,\n      required: false\n    },\n    auto: {\n      type: Number,\n      default: 0,\n      required: false\n    }\n  },\n  data () {\n    return {\n      currentIdx: this.curIdx,\n      timer: null\n    }\n  },\n  created () {\n    this.move()\n  },\n  watch: {\n    currentIdx () {\n      this.$emit('slider', this.currentIdx)\n    }\n  },\n  methods: {\n    // 用户点击事件\n    hClick () {\n      this.$emit('click', this.currentIdx)\n    },\n    // 指示条鼠标进入事件\n    hDirectorEnter (i) {\n      this.currentIdx = i\n    },\n    // 定时器自动播放\n    move () {\n      if (this.auto) {\n        this.timer = setInterval(() => {\n          this.hNext()\n        }, this.auto)\n      }\n    },\n    // 鼠标进入\n    mouseEnter () {\n      clearInterval(this.timer)\n    },\n    // 鼠标离开\n    mouseleave () {\n      this.move()\n    },\n    // 上一张\n    hPrev () {\n      this.currentIdx = this.currentIdx - 1\n      if (this.currentIdx === -1) {\n        this.currentIdx = this.list.length - 1\n      }\n    },\n    // 下一张\n    hNext () {\n      this.currentIdx = this.currentIdx + 1\n      if (this.currentIdx === this.list.length) {\n        this.currentIdx = 0\n      }\n    }\n  }\n}\n</script>\n\n<style>\n.fade-enter-active,.fade-leave-active {\n  transition: all .3s ;\n}\n.fade-enter, .fade-leave-to{\n  opacity: 0;\n}\n.slider .slider-content,\n.slider img {\n  width: 100%;\n  height: 100%;\n}\n.slider {\n  margin: 0 auto;\n  border: 1px solid #ccc;\n  position: relative;\n}\n.slider .slider-content {\n  overflow: hidden;\n  position: relative;\n}\n.slider .slider-content .slider-item {\n  position: absolute;\n  top: 0;\n  left: 0;\n}\n.slider img {\n  width: 100%;\n}\n.slider .btn,\n.slider .txt,\n.slider .indirector {\n  position: absolute;\n}\n.slider .btn {\n  cursor: pointer;\n  width: 50px;\n  height: 50px;\n  border-radius: 50%;\n  background-color: rgba(255, 255, 255, 0);\n  top: 50%;\n  transform: translateY(-50%);\n  transition: background-color 0.2s;\n}\n.slider .btn:hover {\n  background-color: rgba(255, 255, 255, 1);\n}\n.slider .btn:before,\n.slider .btn:after {\n  content: \"\";\n  height: 3px;\n  width: 25px;\n  background-color: #fff;\n  position: absolute;\n  left: 15px;\n  top: 23px;\n  transform: rotateZ(60deg);\n  transform-origin: 0px center;\n  transition: all 0.2s;\n}\n.slider .btn:after {\n  transform: rotateZ(-60deg);\n}\n.slider .btn:hover:before {\n  transform: rotateZ(45deg);\n  background-color: red;\n}\n.slider .btn:hover:after {\n  transform: rotateZ(-45deg);\n  background-color: red;\n}\n\n.slider .btn.btn_right:before,\n.slider .btn.btn_right:after {\n  transform-origin: right center;\n}\n\n.slider .btn.btn_left {\n  left: 20px;\n}\n.slider .btn.btn_right {\n  right: 20px;\n}\n\n.slider .txt {\n  text-indent: 1em;\n  line-height: 40px;\n  background-color: rgba(0, 0, 0, 0.5);\n  text-align: left;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  color: #fff;\n}\n.slider .indirector {\n  bottom: 10px;\n  right: 1em;\n}\n.slider .indirector li {\n  display: inline-block;\n  margin: 0 5px;\n  height: 10px;\n  width: 10px;\n  border-radius: 50%;\n  background-color: #fff;\n}\n.slider .indirector li {\n  transition: transform 0.2s;\n}\n.slider .indirector .current {\n  background-color: #369;\n  transform: scale(1.2);\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

__vue_component__.install = Vue => {
  Vue.component(__vue_component__.name, __vue_component__);
};

module.exports = __vue_component__;
