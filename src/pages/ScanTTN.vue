<template>
    <form
        class="page"
        @submit.prevent="goToCarList"
    >
        <scanner
            title="Номер TTN"
            buttonTitle="Сканировать TTN"
            @input="processResult"
        />
        <footer class="page__footer">
            <button
                class="w-100 btn btn-success mt-auto"
                :disabled="!result"
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
        result: '',
        loader: true,
        isManual: false,
    }),
    computed: {
        ...mapState(['isScanScreenShown']),
    },
    methods: {
        goToCarList() {
            this.$router.push('/car-list');
            this.$store.commit('changeScannedDocumentNumber', this.result);
        },
        processResult(result, isManual) {
            this.result = result;
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
