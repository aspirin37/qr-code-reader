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
                :disabled="!isCarListChecked"
                @click="checkCarList"
            >
                Подтвердить проверку
            </button>
        </footer>
        <b-modal
            v-model="modal.isShown"
            class="text-center"
            header-border-variant="success"
            title="Готово!"
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
        carList: null,
        VIN: '',
        modal: {
            heading: 'VIN-номер',
            message: '',
            isShown: false,
        },
    }),
    computed: {
        ...mapState(['scannedDocument', 'isScanScreenShown']),
        isCarListChecked() {
            return !(
                this.carList &&
                this.carList.length &&
                this.carList.some(it => it.status !== 'scanned')
            );
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

            try {
                this.carList = await this.$http.get(url);
            } finally {
                this.loader = false;
            }
        },
        async checkCarList() {
            const promises = this.carList.map(
                it =>
                    new Promise(async resolve => {
                        await this.$http.put(`/cars/${it.VIN}`, it);
                        resolve();
                    }),
            );
            await Promise.all(promises);

            this.modal.message = `Проверка VIN-номеров по документу ${
                this.scannedDocument.description
            } успешно завершена`;

            this.modal.heading = '';
            this.modal.isShown = true;
        },
        onInput(result) {
            this.VIN = result;
        },
        onDecode(result) {
            this.VIN = result;
            this.modal.message = result;
            this.modal.isShown = true;
        },
        processResult() {
            this.$store.commit('hideScanScreen');

            if (this.isCarListChecked) {
                this.$router.push('/scan-TTN');
                return;
            }

            this.carList.forEach(it => {
                if (it.VIN === this.VIN) {
                    it.status = 'scanned';
                }
            });
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
    transition: all 0.5s ease-out 0.15s;
}

.scanned {
    $scanned: #e1ffe8;
    background-color: $scanned;
    border-color: darken($scanned, 20%);
}
</style>
