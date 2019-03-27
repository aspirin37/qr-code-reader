<template>
    <div class="page">
        <scanner
            button-title="Сканировать ТТН"
            :title="scannerTitle"
            @input="onInput"
            @decode="onDecode"
        />
        <b-modal
            v-model="isSuccessModalShown"
            class="text-center"
            header-border-variant="success"
            title="Готово!"
            ok-title="Продолжить"
            ok-variant="success"
            ok-only
            centered
            @hidden="goToCarList"
        >
            <h4 class="font-weight-normal">
                {{ scannerTitle }}
            </h4>
            <h5>{{ documentNumber }}</h5>
        </b-modal>
    </div>
</template>

<script>
import Scanner from '@/components/Scanner';
import { mapState } from 'vuex';

export default {
    name: 'ScanTTN',
    components: {
        Scanner,
    },
    data: () => ({
        scannerTitle: 'Номер ТТН',
        documentNumber: '',
        document: null,
        isManual: false,
        isSuccessModalShown: false,
    }),
    computed: {
        ...mapState(['isScanScreenShown']),
    },
    methods: {
        async goToCarList() {
            this.$store.commit('hideScanScreen');
            this.$router.push('/car-list');
        },
        async getDocument(result, manualInput) {
            this.documentNumber = result;
            this.document = await this.$http.get(
                `documents/number/${this.documentNumber}`,
            );

            this.$store.commit('changeScannedDocument', this.document);

            if (manualInput) {
                this.$router.push('/car-list');
            } else {
                this.isSuccessModalShown = true;
            }
        },
        onInput(result) {
            this.getDocument(result, true);
        },
        onDecode(result) {
            this.getDocument(result, false);
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
