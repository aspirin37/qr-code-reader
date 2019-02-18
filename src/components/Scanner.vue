<template>
    <div>
        <template v-if="!isScanning">
            <div class="form-group">
                <div class="d-flex align-items-baseline">
                    <label class="mr-auto">
                        {{ title }}:
                    </label>
                </div>
                <input
                    ref="input"
                    v-model="result"
                    class="form-control"
                    @input="onInput"
                >
            </div>
            <button
                class="w-100 btn btn-scan"
                @click="isScanning = true"
            >
                {{ buttonTitle }}
            </button>
        </template>
        <qrcode-reader
            v-else
            @scanned="processResult"
            @initialized="loader = false"
        />
    </div>
</template>

<script>
import QRCodeReader from '@/components/QRCodeReader';

export default {
    name: 'Scanner',
    components: {
        'qrcode-reader': QRCodeReader,
    },
    props: {
        title: {
            type: String,
            required: true,
        },
        buttonTitle: {
            type: String,
            required: true,
        },
    },
    data: () => ({
        isManual: false,
        isScanning: false,
        result: '',
    }),
    watch: {
        result(val) {
            this.$emit('input', this.result, this.isManual);
        },
    },
    methods: {
        onInput() {
            this.isManual = true;
        },
        processResult(result) {
            this.result = result;
            this.isManual = false;
        },
    },
};
</script>

<style lang="scss" scoped>
.btn-scan {
    margin-bottom: 1rem;
    background-color: transparent;
    font-size: 19px;
    text-align: left;
    background-color: lighten($ford-slate-screen, 30%);
    background-image: url('../assets/qr-code.svg');
    background-repeat: no-repeat;
    background-position: right 25px center;
    background-size: 30px 30px;
    box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.1) inset;
}
</style>

<style scoped>
</style>
