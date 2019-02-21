<template>
    <div class="page">
        <scanner
            :title="title"
            buttonTitle="Сканировать ТТН"
            :value="documentNumber"
            @input="onInput"
            @decode="onDecode"
        />
        <footer class="page__footer">
            <button
                class="w-100 btn btn-success mt-auto"
                :disabled="!documentNumber"
                @click="goToCarList"
            >
                Далее
            </button>
        </footer>
        <b-modal
            v-model="isSuccessModalShown"
            class="text-center"
            header-border-variant="success"
            title="Готово!"
            ok-only
            centered
            @hidden="hideScanScreen"
        >
            <h4 class="font-weight-normal">{{ title }}</h4>
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
        title: 'Номер ТТН',
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
            try {
                this.document = await this.$http.get(
                    `documents/number/${this.documentNumber}`,
                );

                this.$router.push('/car-list');
                this.$store.commit('changeScannedDocument', this.document);
            } finally {
                setTimeout(() => {
                    this.documentNumber = '';
                }, 300);
            }
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
