<template>
    <div class="page">
        <qrcode-reader
            @scanned="processResult"
            @initialized="loader = false"
        />
        <template v-if="!loader">
            <div class="form-group">
                <div class="d-flex align-items-baseline">
                    <label class="mr-auto">
                        Номер ТТН/Акта:
                    </label>
                    <small
                        class="text-primary"
                        @click="enableManualInput"
                    >
                        Ручной ввод
                    </small>
                </div>
                <input
                    ref="input"
                    v-model="result"
                    :disabled="!isManual"
                    class="form-control"
                >
            </div>
            <button
                class="w-100 btn btn-lg btn-success mt-auto"
                :disabled="!result"
                @click="goToCarList"
            >
                Далее
            </button>
        </template>
    </div>
</template>

<script>
import QRCodeReader from '@/components/QRCodeReader';

export default {
    name: 'ScanTTN',
    components: {
        'qrcode-reader': QRCodeReader,
    },
    data: () => ({
        result: '',
        loader: true,
        isManual: false,
    }),
    methods: {
        processResult(result) {
            this.result = result;
            this.isManual = false;
        },
        enableManualInput() {
            this.isManual = true;
            this.$nextTick(() => {
                this.$refs.input.focus();
            });
        },
        goToCarList() {
            this.$router.push({
                name: 'Car list',
                params: { documentNumber: this.result },
            });
        },
    },
};
</script>

<style scoped>
.form-control:disabled {
    background-color: white !important;
}
</style>
