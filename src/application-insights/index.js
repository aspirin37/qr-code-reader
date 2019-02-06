/*eslint-disable */

import { AppInsights } from "applicationinsights-js"

const classifyRE = /(?:^|[-_])(\w)/g
const classify = str => {
  return str.replace(classifyRE, c => c.toUpperCase()).replace(/[-_]/g, '');
}

const formatComponentName = (vm, includeFile) => {
  if (vm.$root === vm) {
    return '<Root>'
  }
  const options = typeof vm === 'function' && vm.cid != null
    ? vm.options
    : vm._isVue
      ? vm.$options || vm.constructor.options
      : vm || {}
  let name = options.name || options._componentTag
  const file = options.__file
  if (!name && file) {
    const match = file.match(/([^/\\]+)\.vue$/)
    name = match && match[1]
  }

  return (
    (name ? `<${classify(name)}>` : `<Anonymous>`) +
    (file && includeFile !== false ? ` at ${file}` : '')
  )
}

const getVueErrorHandler = function (Vue) {

  var _oldOnError = Vue.config.errorHandler;
  return VueErrorHandler;

  function VueErrorHandler(error, vm, info) {
    var metaData = {};

    // vm and lifecycleHook are not always available
    if (Object.prototype.toString.call(vm) === '[object Object]') {
      metaData.componentName = formatComponentName(vm);
      metaData.propsData = JSON.stringify(vm.$options.propsData);
    }

    if (typeof info !== 'undefined') {
      metaData.lifecycleHook = info;
    }

    vm.$appInsights.trackException(error, "Vue handler", metaData );

    console.error(error);
    if (typeof _oldOnError === 'function') {
      _oldOnError.call(this, error, vm, info);
    }
  }

}

/**
 * Install function passed to Vue.use() show documentation on vue.js website.
 *
 * @param Vue
 * @param options
 */
const install = function (Vue, options) {

  Vue.appInsights = AppInsights
  Vue.appInsights.downloadAndSetup(options.config)

  const router = options.router

  // Watch route event if router option is defined.
  if (router) {

    const basePath = options.basePath || '(Application Root)'
    const pathFormatter = path => basePath + '/' + path.substr(1);

    router.beforeEach( (route, from, next) => {

      Vue.appInsights.startTrackPage(route.name || pathFormatter(route.path));
      next()

    });

    router.afterEach( route => {

      Vue.nextTick(function () {
        Vue.appInsights.stopTrackPage(route.name || pathFormatter(route.path), route.fullPath);
      })

    })
  }

  Vue.config.errorHandler = getVueErrorHandler(Vue);

  Object.defineProperty(Vue.prototype, '$appInsights', {
    get: () => Vue.appInsights
  })

}


// auto install for navigator
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}

export default install;
