<template>
    <div
        v-if="!loader"
        class="page"
    >
        <scanner
            :title="scannerTitle"
            button-title="Сканировать VIN"
            :value="VIN"
            @input="onInput"
            @decode="onDecode"
        />
        <button
            class="w-100 btn btn-success mb-3"
            :disabled="!isCarListChecked"
            @click="checkCarList"
        >
            Подтвердить проверку
        </button>
        <ul class="list-group">
            <li
                v-for="car in carList"
                :key="car.VIN"
                class="list-group-item"
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
                <b
                    v-if="car.status === 'scanned'"
                    class="ml-auto mr-3 text-success"
                >
                    &#10003;
                </b>
            </li>
        </ul>
        <b-modal
            v-model="modal.isShown"
            class="text-center"
            header-border-variant="success"
            title="Готово!"
            :ok-title="modal.okTitle"
            ok-variant="success"
            ok-only
            centered
            @hidden="processResult"
        >
            <h4
                v-if="modal.heading"
                class="font-weight-normal"
            >
                {{ modal.heading }}
            </h4>
            <h5>{{ modal.message }}</h5>
            <p v-if="!isCarCheckSubmitted">
                Отсканировано {{ carsChecked }} из {{ carList.length }}
            </p>
        </b-modal>
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
        scannerTitle: 'VIN-номер',
        loader: true,
        isVinListShown: true,
        carList: [],
        VIN: '',
        isCarCheckSubmitted: false,
        modal: {
            heading: 'VIN-номер',
            message: '',
            okTitle: 'Далее',
            isShown: false,
        },
    }),
    computed: {
        ...mapState(['scannedDocument', 'isScanScreenShown']),
        isCarListChecked() {
            return (
                this.carList.length &&
                this.carList.every(it => it.status === 'scanned')
            );
        },
        carsChecked() {
            return this.carList.filter(it => it.status === 'scanned').length;
        },
    },
    created() {
        if (!this.scannedDocument) {
            this.$router.push('/scan-TTN');
        } else {
            this.getCarList();
        }
    },
    methods: {
        async getCarList() {
            const url = this.scannedDocument.lotId
                ? `lots/${this.scannedDocument.lotId}/cars`
                : `documents/${this.scannedDocument.id}/cars`;

            this.carList = await this.$http.get(url).finally(() => {
                this.loader = false;
            });
        },
        async checkCarList() {
            // prettier-ignore
            const promises = this.carList.map(it => new Promise(async resolve => {
                await this.$http.put(`/cars/${it.VIN}`, it);
                resolve();
            }));
            await Promise.all(promises);

            this.modal.message = `Проверка VIN-номеров по документу ${
                this.scannedDocument.description
            } успешно завершена`;

            this.modal.heading = '';
            this.isCarCheckSubmitted = true;
            this.modal.isShown = true;
        },
        onInput(result) {
            this.VIN = result;
        },
        onDecode(result) {
            this.VIN = result;

            const scannedCar = this.carList.find(it => it.VIN === result);
            if (scannedCar) {
                scannedCar.status = 'scanned';
            }

            this.modal.message = result;
            this.modal.isShown = true;
        },
        processResult() {
            if (this.isCarListChecked) {
                this.$store.commit('hideScanScreen');
                this.modal.okTitle = 'Ок';
            }

            if (this.isCarCheckSubmitted) {
                this.$router.push('/scan-TTN');
            }

            this.VIN = '';
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
.list-group-item {
    display: flex;
    font-size: 18px;
    transition: all 0.5s ease-out 0.15s;
}

.scanned {
    $scanned: #f0fff4;
    background-color: $scanned;
    border-color: darken($scanned, 20%);
}
</style>
