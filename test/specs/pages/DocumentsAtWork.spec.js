import { mount } from '@vue/test-utils';
import DocumentsAtWork from '@/pages/DocumentsAtWork';

describe('Documents at work', () => {
    // prettier-ignore
    const $http = {
        get: jest.fn(() => Promise.resolve([
            {
                id: '8bcfc9e5-ca11-42d5-a3a9-f3e1d150c226',
                number: 'ES-123456',
                description: 'ES-123456',
                lotId: '6d9dafd4-9ce3-47ce-85b8-dc35dac338de',
                userName: 'SSIDOROV',
            },
            {
                id: '2235dfbb-dcac-4b57-a63d-2ce121603244',
                number: 'DK659874',
                description: 'DK-659874',
                lotId: '6d9dafd4-9ce3-47ce-85b8-dc35dac338de',
                userName: 'IIVANOV',
            },
        ])),
    };

    const wrapper = mount(DocumentsAtWork, {
        mocks: {
            $http,
        },
    });

    it('Renders documents correctly', () => {
        expect(wrapper.vm.documentList.length).toBe(2);

        const lastDocumentDescription = wrapper.find('li:last-of-type span').element.textContent;
        expect(lastDocumentDescription).toBe('DK-659874');

        const lastDocumentUserName = wrapper.find('li:last-of-type span:last-of-type').element.textContent;
        expect(lastDocumentUserName).toBe('IIVANOV');
    });
});
