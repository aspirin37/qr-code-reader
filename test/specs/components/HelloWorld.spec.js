import { mount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import BootstrapVue from 'bootstrap-vue'
import HelloWorld from '@/components/HelloWorld.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuex)
localVue.use(BootstrapVue)

describe('HelloWorld.vue', () => {
  const router = new VueRouter()

  const state = {}
  const store = new Vuex.Store({ state })

  const wrapper = mount(HelloWorld, {
    localVue,
    router,
    store
  })

  it('contains header "Welcome to Your Vue.js App"', () => {
    expect(wrapper.find('h1').text()).toEqual('Welcome to Your Vue.js App')
  })
})
