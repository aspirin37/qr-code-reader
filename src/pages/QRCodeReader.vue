<template>
    <div>
        <p class="error">ERROR: {{ error }}</p>
        <p class="decode-result">Last result: <b>{{ result }}</b></p>
        <qrcode-stream
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
        result: '',
        error: '',
    }),
    methods: {
        onDecode(result) {
            this.result = result;
        },
        async onInit(promise) {
            try {
                await promise;
            } catch (error) {
                // prettier-ignore
                switch (error.name) {
                    case 'NotAllowedError':
                        this.error = 'you need to grant camera access permisson';
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
                }
            }
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
