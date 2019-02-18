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
};
</script>

<style scoped>
.form-control:disabled {
    background-color: white !important;
}
</style>
