<template>
    <div>
        <template>
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
                type="button"
                @click="startScanning"
            >
                {{ buttonTitle }}
            </button>
        </template>
        <transition name="fade">
            <qrcode-reader
                v-if="isScanScreenShown"
                @decode="onDecode"
                @initialized="onInitialized"
            />
        </transition>
    </div>
</template>

<script>
import QRCodeReader from '@/components/QRCodeReader';
import { mapState } from 'vuex';

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
        value: {
            type: String,
            default: '',
        },
    },
    data: () => ({
        loader: false,
        result: '',
    }),
    computed: {
        ...mapState(['isScanScreenShown']),
    },
    watch: {
        value(val) {
            this.result = val;
        },
    },
    methods: {
        startScanning() {
            this.loader = true;
            this.$store.commit('showScanScreen');
        },
        onInitialized() {
            this.loader = false;
        },
        onInput() {
            this.$emit('input', this.result);
        },
        onDecode(result) {
            this.result = result;
            this.$emit('decode', this.result);
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
