<template>
    <div class="page">
        <template v-if="!loader">
            <button
                class="w-100 btn btn-lg btn-scan"
                @click="$router.push('/car-list')"
            >
                Сканировать VIN
            </button>
            <ul class="list-group">
                <li
                    v-for="car in carList"
                    :key="car.VIN"
                    class="list-group-item d-flex"
                    :class="{'scanned': car.status === 'scanned'}"
                    @click="isVinListShown = !isVinListShown"
                >
                    <transition
                        name="fade"
                        mode="out-in"
                    >
                        <div
                            v-if="isVinListShown"
                            key="vinList"
                        >
                            {{ car.VIN }}
                        </div>
                        <div
                            v-else
                            key="modelList"
                        >
                            {{ car.model }} <small>{{ car.color }}</small>
                        </div>
                    </transition>
                </li>
            </ul>
            <button
                class="w-100 btn btn-lg btn-success mt-auto"
                :disabled="isNextStepDisabled"
                @click="$router.push('/car-list')"
            >
                Далее
            </button>
        </template>
    </div>
</template>

<script>
export default {
    name: 'CarList',
    data: () => ({
        loader: true,
        isVinListShown: true,
        document: null,
        carList: null,
    }),
    computed: {
        isNextStepDisabled() {
            return (
                this.carList &&
                this.carList.length &&
                this.carList.some(it => it.status !== 'scanned')
            );
        },
    },
    created() {
        this.getCarList();
    },
    methods: {
        async getCarList() {
            this.document = await this.$http.get(
                `documents/number/${this.documentNumber}`,
            );

            const url = this.document.lotId
                ? `lots/${this.lotId}/cars`
                : `documents/${this.documentId}/cars`;

            this.carList = await this.$http.get(url);
            this.loader = false;
        },
    },
};
</script>

<style lang="scss" scoped>
.btn-scan {
    margin-bottom: 15px;
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

.fade-enter-active {
    transition: all 0.15s ease-out;
}

.fade-leave-active {
    transition: all 0.15s ease-in;
}

.fade-enter,
.fade-leave-active {
    opacity: 0;
}

.scanned {
    $scanned: #e1ffe8;
    background-color: $scanned;
    border-color: darken($scanned, 20%);
}
</style>
