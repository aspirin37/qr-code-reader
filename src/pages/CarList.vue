<template>
    <div>
        <form
            class="page"
            v-if="!loader"
            @submit.prevent
        >
            <scanner
                title="VIN-номер"
                buttonTitle="Сканировать VIN"
            />
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
            <footer class="page__footer">
                <button
                    class="w-100 btn btn-success mt-auto"
                    :disabled="isNextStepDisabled"
                >
                    Завершить сканирование
                </button>
            </footer>
        </form>
    </div>
</template>

<script>
import Scanner from '@/components/Scanner';
import { mapState } from 'vuex';

export default {
    name: 'CarList',
    components: {
        Scanner,
    },
    data: () => ({
        loader: true,
        isVinListShown: true,
        document: null,
        carList: null,
    }),
    computed: {
        ...mapState(['scannedDocumentNumber', 'isScanScreenShown']),
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
                `documents/number/${this.scannedDocumentNumber}`,
            );

            this.$nextTick(() => {
                const url = this.document.lotId
                    ? `lots/${this.document.lotId}/cars`
                    : `documents/${this.document.id}/cars`;

                this.$http
                    .get(url)
                    .then(res => {
                        this.carList = res;
                    })
                    .finally(() => {
                        this.loader = false;
                    });
            });
        },
    },
    beforeRouteLeave(to, from, next) {
        if (this.isScanScreenShown) {
            this.$store.commit('hideScanScreen');
            next(false);
        } else {
            next();
        }
    },
};
</script>

<style lang="scss" scoped>
.scanned {
    $scanned: #e1ffe8;
    background-color: $scanned;
    border-color: darken($scanned, 20%);
}
</style>
