<template>
    <div class="page">
        <scanner
            :title="scannerTitle"
            button-title="Сканировать ТТН"
            @input="onInput"
            @decode="onDecode"
        />
        <div class="d-flex justify-content-between">
            <button
                class=" btn btn-success btn-submit mb-3"
                :disabled="!isDocumentListChecked"
                @click="checkDocumentList"
            >
                Подтвердить отгрузку
            </button>
            <button
                class="btn btn-warning btn-update mb-3"
                :disabled="!documentList.length"
                @click="resetData"
            />
        </div>
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
        <div
            v-if="isDocumentListLoading"
            class="loading-doсuments"
        >
            Loading list...
        </div>
        <b-modal
            v-model="modal.isShown"
            class="text-center"
            header-border-variant="success"
            title="Готово!"
            :ok-title="modal.okTitle"
            ok-variant="success"
            :ok-disabled="!documentList.length"
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
                <span v-if="!isDocumentListLoading && documentList.length > 1">
                    Отсканировано {{ documentsChecked }} из {{ documentList.length }}
                </span>
                <span
                    v-if="isDocumentListLoading"
                    class="loading-doсuments"
                >
                    loading...
                </span>
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
        isDocumentListLoading: false,
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
        async getDocument(documentNumber, manualInput = false) {
            this.isDocumentLoading = true;
            this.document = await this.$http
                .get(`documents/number/${documentNumber}`)
                .finally(() => {
                    this.isDocumentLoading = false;
                });

            this.document.status = 'compound out';

            if (!manualInput) {
                this.modal.message = documentNumber;
                this.modal.isShown = true;
            }
        },
        async getDocumentList(documentNumber) {
            if (this.document.lotId) {
                this.isDocumentListLoading = true;
                const whenDocumentListIsLoaded = this.$http.get(
                    `lots/${this.document.lotId}/documents`,
                );

                const whenAreaPassNumberIsLoaded = (async () => {
                    let areaPassNumber = null;
                    if (this.user.area.passRequired) {
                        ({ areaPassNumber } = await this.$http.get(
                            `lots/${this.document.lotId}`,
                        ));
                    }
                    return areaPassNumber;
                })();

                const [documentList, areaPassNumber] = await Promise.all([
                    whenDocumentListIsLoaded,
                    whenAreaPassNumberIsLoaded,
                ]).finally(() => {
                    this.isDocumentListLoading = false;
                });

                documentList.forEach(it => {
                    it.status = '';
                });

                this.documentList = documentList;
                this.areaPassNumber = areaPassNumber;

                const scannedDocument = this.documentList.find(
                    it => it.number === documentNumber,
                );
                scannedDocument.status = 'compound out';
            } else {
                this.documentList.push(this.document);
            }
        },
        async checkDocumentList() {
            const scans = this.documentList.map(it => {
                if (it.status === 'compound out') {
                    return {
                        value: it.number,
                        manualInput: false,
                    };
                }
                return null;
            });

            let url;
            let params;

            if (this.document.lotId) {
                url = `lots/${this.document.lotId}`;

                params = {
                    id: this.document.lotId,
                    status: 'compound out',
                    scans,
                };
            } else {
                url = `documents/${this.document.id}`;

                params = {
                    id: this.document.id,
                    number: this.document.number,
                    status: 'compound out',
                    scans,
                };
            }

            await this.$http.put(url, params);

            this.modal.message = 'Проверка документов успешно завершена';

            this.modal.heading = '';
            this.documentsCheckSubmitted = true;
            this.modal.isShown = true;
        },
        async onInput(result) {
            this.documentNumber = result;
            if (!this.documentList.length && !this.isDocumentLoading) {
                await this.getDocument(result, true);
                await this.getDocumentList(result);
            } else {
                this.checkDocument(result, true);
            }
        },
        async onDecode(result) {
            this.documentNumber = result;
            if (!this.documentList.length && !this.isDocumentLoading) {
                await this.getDocument(result);
                await this.getDocumentList(result);
            } else {
                this.checkDocument(result);
            }
        },
        checkDocument(documentNumber, manualInput = false) {
            const scannedDocument = this.documentList.find(
                it => it.number === documentNumber,
            );

            if (scannedDocument) {
                if (scannedDocument.status !== 'compound out') {
                    scannedDocument.status = 'compound out';
                    this.modal.heading = 'Документ';
                    this.modal.message = documentNumber;
                } else {
                    this.modal.heading = '';
                    this.modal.message = `Документ ${documentNumber} уже отсканирован!`;
                }
            } else {
                this.modal.heading = '';
                this.modal.message = `Нет совпадений по номеру ${documentNumber}`;
            }

            if (!manualInput) this.modal.isShown = true;
        },
        processResult() {
            if (this.isDocumentListLoading) {
                this.$store.commit('hideScanScreen');
            }

            if (this.isDocumentListChecked) {
                this.$store.commit('hideScanScreen');
                this.modal.okTitle = 'Ок';
            }

            if (this.documentsCheckSubmitted) {
                this.resetData();
            }

            this.documentNumber = '';
        },
        hideScanScreen() {
            this.$store.commit('hideScanScreen');
        },
        resetData() {
            Object.assign(this.$data, this.$options.data());
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
<style lang="scss" scoped>
.btn-submit {
    flex-grow: 1;
    margin-right: 0.5rem;
}

.btn-update {
    width: 60px;
    background-image: url('../assets/update.svg');
    background-position: 50% 50%;
    background-repeat: no-repeat;
}
</style>
