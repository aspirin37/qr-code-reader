<template>
    <div>
        <p
            v-if="error"
            class="error"
        >
            ERROR: {{ error }}
        </p>
        <qrcode-stream
            class="mb-3"
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
    data: () => ({
        error: '',
    }),
    methods: {
        onDecode(result) {
            this.$emit('scanned', result);
        },
        async onInit(promise) {
            promise
                .then(() => {
                    this.$emit('initialized');
                })
                .catch(error => {
                    /* eslint-disable */
                    // prettier-ignore
                    switch (error.name) {
                    case 'NotAllowedError':
                        this.error = 'Please reload the app and grant camera access permisson';
                        break;
                    case 'NotFoundError':
                        this.error = 'no camera on this device';
                        break;
                    case 'NotSupportedError':
                        this.error = 'secure context required (HTTPS, localhost)';
                        break;
                    case 'NotReadableError':
                        this.error = 'is the camera already in use?';
                        break;
                    case 'OverconstrainedError':
                        this.error = 'installed cameras are not suitable';
                        break;
                    case 'StreamApiNotSupportedError':
                        this.error = 'Stream API is not supported in this browser';
                        break;
                    default:
                        this.error = 'Unknown';
                }
                });
        },
    },
};
</script>

<style scoped>
.error {
    font-weight: bold;
    color: red;
}
</style>
