<template>
    <div class="page">
        <scanner
            :title="scannerTitle"
            button-title="Сканировать ТТН"
            :value="documentNumber"
            @input="onInput"
            @decode="onDecode"
        />
        <button
            class="w-100 btn btn-success mb-3"
            :disabled="!isDocumentListChecked"
            @click="checkDocumentList"
        >
            Подтвердить отгрузку
        </button>
        <ul class="list-group">
            <li
                v-for="(it, i) in documentList"
                :key="i"
                class="list-group-item"
                :class="{'scanned': it.status === 'compound out'}"
            >
                {{ it.description }}
                <b
                    v-if="it.status === 'compound out'"
                    class="ml-auto mr-3 text-success"
                >
                    &#10003;
                </b>
            </li>
        </ul>
        <b-modal
            v-model="modal.isShown"
            class="text-center"
            header-border-variant="success"
            title="Готово!"
            :ok-title="modal.okTitle"
            ok-variant="success"
            ok-only
            centered
            @hidden="processResult"
        >
            <h4
                v-if="modal.heading"
                class="font-weight-normal"
            >
                {{ modal.heading }}
            </h4>
            <h5>{{ modal.message }}</h5>
            <p v-if="!documentsCheckSubmitted">
                Отсканировано {{ documentsChecked }} из {{ documentList.length }}
            </p>
        </b-modal>
    </div>
</template>

<script>
import Scanner from '@/components/Scanner';
import { mapState } from 'vuex';

export default {
    name: 'ShipmentConfirmation',
    components: {
        Scanner,
    },
    data: () => ({
        scannerTitle: 'Номер ТТН',
        documentNumber: '',
        document: null,
        isDocumentLoading: false,
        documentList: [],
        areaPassNumber: null,
        documentsCheckSubmitted: false,
        loader: true,
        isManual: false,
        modal: {
            heading: 'Документ',
            message: '',
            okTitle: 'Далее',
            isShown: false,
        },
    }),
    computed: {
        ...mapState(['user', 'isScanScreenShown']),
        isDocumentListChecked() {
            return (
                this.documentList.length &&
                this.documentList.every(it => it.status === 'compound out')
            );
        },
        documentsChecked() {
            // prettier-ignore
            return this.documentList.filter(it => it.status === 'compound out').length;
        },
    },
    methods: {
        async getDocumentList() {
            return new Promise(async resolve => {
                this.isDocumentLoading = true;
                this.document = await this.$http.get(
                    `documents/number/${this.documentNumber}`,
                );
                this.isDocumentLoading = false;

                this.document.lotId = 123;

                if (this.document.lotId) {
                    const getDocumentList = new Promise(async innerResolve => {
                        this.documentList = await this.$http.get(
                            `lots/${this.document.lotId}/documents`,
                        );
                        innerResolve();
                    });

                    const getAreaPassNumber = new Promise(
                        async innerResolve => {
                            if (this.user.area.passRequired) {
                                const lot = await this.$http.get(
                                    `lots/${this.document.lotId}`,
                                );
                                this.areaPassNumber = lot.areaPassNumber;
                                innerResolve();
                            }
                            innerResolve();
                        },
                    );

                    await Promise.all([getDocumentList, getAreaPassNumber]);
                    resolve();
                } else {
                    this.documentList.push(this.document);
                    resolve();
                }
            });
        },
        checkDocumentList() {},
        async onInput(result) {
            this.documentNumber = result;
            if (!this.document && !this.isDocumentLoading) {
                await this.getDocumentList();
            }
        },
        async onDecode(result) {
            this.documentNumber = result;
            if (!this.document && !this.isDocumentLoading) {
                await this.getDocumentList();
            }

            const scannedDocument = this.documentList.find(
                it => it.number === result,
            );

            if (scannedDocument) {
                if (scannedDocument.status !== 'compound out') {
                    scannedDocument.status = 'compound out';
                    this.modal.heading = 'Документ';
                    this.modal.message = result;
                } else {
                    this.modal.heading = '';
                    this.modal.message = `Документ ${result} уже отсканирован!`;
                }
            } else {
                this.modal.heading = '';
                this.modal.message = `Нет совпадений по номеру ${result}`;
            }

            this.modal.isShown = true;
        },
        processResult() {
            if (this.isDocumentListChecked) {
                this.$store.commit('hideScanScreen');
                this.modal.okTitle = 'Ок';
            }

            if (this.documentsCheckSubmitted) {
                this.$router.push('/scan-TTN');
            }

            this.documentNumber = '';
        },
        hideScanScreen() {
            this.$store.commit('hideScanScreen');
        },
    },
    beforeRouteLeave(to, from, next) {
        if (this.isScanScreenShown) {
            this.$store.commit('hideScanScreen');
            next(false);
        } else {
            next();
        }
    },
};
</script>
