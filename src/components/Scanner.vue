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
                @initialized="loader = false"
            />
        </transition>
        <!-- <b-modal
            v-model="isSuccessModalShown"
            class="text-center"
            header-border-variant="success"
            title="Готово!"
            ok-only
            centered
            @hidden="processResult"
        >
            <h4 class="font-weight-normal">{{ title }}</h4>
            <h5>{{ result }}</h5>
        </b-modal> -->
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
        // isSuccessModalShown: false,
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
        onInput() {
            this.$emit('input', this.result);
        },
        onDecode(result) {
            this.result = result;
            this.$emit('decode', this.result);
            // this.isSuccessModalShown = true;
        },
        // processResult() {
        //     this.$store.commit('hideScanScreen');
        //     this.$emit('decode', this.result);
        // },
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
