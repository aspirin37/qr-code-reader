<template>
    <div>
        <template>
            <form
                class="input-group mb-3"
                @submit.prevent="showPassModal"
            >
                <input
                    ref="input"
                    v-model="result"
                    class="form-control"
                    :placeholder="title"
                >
                <div class="input-group-append">
                    <button
                        class="btn btn-outline-secondary"
                        type="submit"
                        :disabled="!result"
                    >
                        Ввод
                    </button>
                </div>
            </form>
            <button
                class="w-100 btn btn-scan"
                type="button"
                @click="startScanning"
            >
                <span class="mr-2">
                    {{ buttonTitle }}
                </span>
                <img
                    class="btn-scan_icon"
                    :src="require('../assets/icon-qr.svg')"
                >
            </button>
        </template>
        <transition name="fade">
            <qrcode-reader
                v-if="isScanScreenShown"
                :paused="paused"
                @decode="onDecode"
            />
        </transition>
        <b-modal
            v-model="isPassModalShown"
            class="text-center"
            title="Введите код доступа"
            cancel-title="Отмена"
            centered
            @ok="onManualInput"
        >
            <input
                v-model="manualInputPass"
                class="form-control"
                placeholder="Код доступа"
            >
        </b-modal>
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
        paused: {
            type: Boolean,
            default: false,
        },
    },
    data: () => ({
        result: '',
        manualInputPass: null,
        isPassModalShown: false,
    }),
    computed: {
        ...mapState(['isScanScreenShown', 'user']),
    },
    methods: {
        startScanning() {
            this.loader = true;
            this.$store.commit('showScanScreen');
        },
        showPassModal() {
            this.isPassModalShown = true;
        },
        onManualInput() {
            if (this.user.area.manualInputPass === this.manualInputPass) {
                this.$emit('input', this.result.trim());
                this.result = '';
            } else {
                this.$store.commit('showErrorMessage', 'Неверный код доступа!');
            }

            this.manualInputPass = null;
        },
        onDecode(result) {
            this.$emit('decode', result.trim());
        },
    },
};
</script>

<style lang="scss" scoped>
.btn-scan {
    margin-bottom: 1rem;
    background-color: transparent;
    font-size: 19px;
    background-color: lighten($ford-slate-screen, 30%);
    box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.1) inset;

    &_icon {
        width: 22px;
        height: 22px;
        position: relative;
        top: -1px;
    }
}

.input-group-append button {
    font-size: 1rem;

    &:active,
    &:focus,
    &:hover {
        color: #6c757d !important;
        background-color: transparent !important;
    }
}
</style>
