<template>
    <div class="qr-reader">
        <qrcode-stream
            class="mb-3"
            :paused="paused"
            @decode="onDecode"
            @init="onInit"
        />
    </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader';

export default {
    name: 'QRCodeReader',
    components: {
        QrcodeStream,
    },
    props: {
        paused: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        onDecode(result) {
            if (result) {
                setTimeout(() => {
                    this.$emit('decode', result.trim());
                }, 500);
            }
        },
        async onInit(promise) {
            /* eslint-disable */
            // prettier-ignore
            promise.catch(error => {
                    let errorMessage;

                    switch (error.name) {
                    case 'NotAllowedError':
                        errorMessage = 'Для работы с приложением предоставьте ему права доступа к камере в настройках вашего браузера';
                        break;
                    case 'NotFoundError':
                        errorMessage = 'Камера не найдена';
                        break;
                    case 'NotSupportedError':
                        errorMessage = 'Небезопасное соединение! (Требуется https, localhost)';
                        break;
                    case 'NotReadableError':
                        errorMessage = 'Возможно, камера уже используется другим приложением';
                        break;
                    case 'OverconstrainedError':
                        errorMessage = 'Установленная камера не поддерживается приложением';
                        break;
                    case 'StreamApiNotSupportedError':
                        errorMessage = 'Ваш браузер не поддерживается приложением';
                        break;
                    default:
                        errorMessage = 'Неизвестаня ошибка';
                    }

                    this.$store.commit('showErrorMessage', errorMessage)
                    window.appInsights.trackException(error, 'camera error handler', { errorMessage });
                });
        },
    },
};
</script>

<style scoped>
.qr-reader {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: calc(100vh - 56px);
    background: black;
    z-index: 200;
}

.error {
    font-weight: bold;
    color: red;
}
</style>
