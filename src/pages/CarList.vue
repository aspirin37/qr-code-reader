<template>
    <div
        v-if="!loader"
        class="page"
    >
        <scanner
            title="VIN-номер"
            button-title="Сканировать VIN"
            :paused="isScannerPaused"
            @input="onInput"
            @decode="onDecode"
        />
        <button
            class="w-100 btn btn-success mb-3"
            :disabled="!isCarListChecked"
            @click="checkCarList"
        >
            Подтвердить сканирование
        </button>
        <ul class="list-group">
            <li
                v-for="car in carList"
                :key="car.VIN"
                class="list-group-item"
                :class="{'scanned': car.status === 'pre-scan'}"
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
                    v-if="car.status === 'pre-scan'"
                    class="ml-auto mr-3 text-success"
                >
                    &#10003;
                </b>
            </li>
        </ul>
        <div
            v-if="!carList.length"
            class="text-center text-danger"
        >
            Список машин по документу <b class="text-nowrap">{{ scannedDocument.number }}</b> не получен.
        </div>
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
            <p v-if="!isCarCheckSubmitted && carList.length > 1">
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
        loader: true,
        isVinListShown: true,
        carList: [],
        VIN: '',
        isCarCheckSubmitted: false,
        isScannerPaused: false,
        modal: {
            heading: '',
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
                this.carList.every(it => it.status === 'pre-scan')
            );
        },
        carsChecked() {
            return this.carList.filter(it => it.status === 'pre-scan').length;
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
            const scans = this.carList.map(it => {
                if (it.status === 'pre-scan') {
                    return {
                        value: it.VIN,
                        manualInput: it.manualInput,
                    };
                }
                return null;
            });

            let url;
            let params;

            if (this.scannedDocument.lotId) {
                url = `lots/${this.scannedDocument.lotId}`;

                params = {
                    id: this.scannedDocument.lotId,
                    status: 'pre-scan',
                    scans,
                };
            } else {
                url = `documents/${this.scannedDocument.id}`;

                params = {
                    id: this.scannedDocument.id,
                    number: this.scannedDocument.number,
                    status: 'pre-scan',
                    scans,
                };
            }

            await this.$http.put(url, params);

            this.modal.message = `Проверка VIN-номеров по документу ${
                this.scannedDocument.description
            } успешно завершена`;

            this.modal.heading = '';
            this.isCarCheckSubmitted = true;
            this.modal.isShown = true;

            this.$store.commit('changeScannedDocument', null);
        },
        updateCarStatus(result, manualInput = '') {
            this.VIN = result;

            const scannedCar = this.carList.find(it => it.VIN === result);

            if (scannedCar) {
                if (scannedCar.status !== 'pre-scan') {
                    scannedCar.status = 'pre-scan';
                    scannedCar.manualInput = manualInput;

                    if (!manualInput) {
                        this.modal.heading = 'VIN-номер';
                        this.modal.message = result;

                        this.modal.isShown = true;
                        this.isScannerPaused = true;
                    }
                } else {
                    this.$store.commit(
                        'showErrorMessage',
                        `VIN-номер ${result} уже отсканирован!`,
                    );
                }
            } else {
                this.$store.commit(
                    'showErrorMessage',
                    `Нет совпадений по номеру ${result}`,
                );
            }
        },
        onInput(result) {
            this.updateCarStatus(result, true);
        },
        onDecode(result) {
            this.updateCarStatus(result);
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
            this.isScannerPaused = false;
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
