<template>
    <div class="page">
        <scanner
            button-title="Сканировать ТТН"
            :title="scannerTitle"
            :value="documentNumber"
            @input="onInput"
            @decode="onDecode"
        />
        <!-- <button
            ref="button-next"
            class="w-100 btn btn-success"
            :disabled="!documentNumber"
            @click="goToCarList"
        >
            Далее
        </button> -->
        <b-modal
            v-model="isSuccessModalShown"
            class="text-center"
            header-border-variant="success"
            title="Готово!"
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
        loader: true,
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
            this.$store.commit('changeScannedDocument', this.document);
        },
        onInput(result) {
            this.documentNumber = result;
        },
        async onDecode(result) {
            this.documentNumber = result;
            this.document = await this.$http.get(
                `documents/number/${this.documentNumber}`,
            );
            this.isSuccessModalShown = true;
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
