<template>
    <form
        class="page"
        @submit.prevent="goToCarList"
    >
        <scanner
            title="Номер ТТН"
            buttonTitle="Сканировать ТТН"
            :value="documentNumber"
            @input="processResult"
        />
        <footer class="page__footer">
            <button
                class="w-100 btn btn-success mt-auto"
                :disabled="!documentNumber"
                type="submit"
            >
                Далее
            </button>
        </footer>
    </form>
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
        documentNumber: '',
        document: null,
        loader: true,
        isManual: false,
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
            } catch (err) {
            } finally {
                setTimeout(() => {
                    this.documentNumber = '';
                }, 300);
            }
        },
        processResult(result, isManual) {
            this.documentNumber = result;
            this.isManual = isManual;
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

<style scoped>
.form-control:disabled {
    background-color: white !important;
}
</style>
