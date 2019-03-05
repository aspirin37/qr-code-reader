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
            class="w-100 btn btn-success"
            :disabled="!documentNumber"
            @click="goToCarList"
        >
            Далее
        </button>
        <b-modal
            v-model="isSuccessModalShown"
            class="text-center"
            header-border-variant="success"
            title="Готово!"
            ok-variant="success"
            ok-only
            centered
            @hidden="hideScanScreen"
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
        loader: true,
        isManual: false,
        isSuccessModalShown: false,
    }),
    computed: {
        ...mapState(['isScanScreenShown']),
    },
    methods: {
        async goToCarList() {
            this.document = await this.$http.get(
                `documents/number/${this.documentNumber}`,
            );
            this.$router.push('/car-list');
            this.$store.commit('changeScannedDocument', this.document);
        },
        onInput(result) {
            this.documentNumber = result;
            this.isManual = true;
        },
        onDecode(result) {
            this.documentNumber = result;
            this.isManual = false;
            this.isSuccessModalShown = true;
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
