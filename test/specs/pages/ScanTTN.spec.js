import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import ScanTTN from '@/pages/ScanTTN';
import Scanner from '@/components/Scanner';
import BootstrapVue from 'bootstrap-vue';

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);
localVue.use(BootstrapVue);

describe('Scan TTN page', () => {
    const state = {};
    const store = new Vuex.Store({ state });

    const wrapper = mount(ScanTTN, {
        localVue,
        store,
    });

    beforeEach(() => {
        wrapper.setData({ documentNumber: '' });
    });

    describe('Scanner component events', () => {
        it('input event updates the document number properly', () => {
            wrapper.find(Scanner).vm.$emit('input', '123456');
            expect(wrapper.vm.documentNumber).toBe('123456');
        });

        it('decode event updates the document number properly', () => {
            wrapper.find(Scanner).vm.$emit('decode', '123456');
            expect(wrapper.vm.documentNumber).toBe('123456');
        });
    });

    describe('Next step button', () => {
        it('is disabled if there is no document number entered', () => {
            expect(wrapper.find({ ref: 'button-next' }).attributes('disabled')).toBeTruthy();
        });

        it('is enabled if there is a document number entered', () => {
            wrapper.setData({ documentNumber: '123456' });
            expect(wrapper.find({ ref: 'button-next' }).attributes('disabled')).toBeFalsy();
        });
    });
});
