<template>
    <div class="page">
        <scanner
            title="VIN-номер"
            button-title="Сканировать VIN"
            :value="VIN"
            @input="onInput"
            @decode="onDecode"
        />
        <b-modal
            v-if="car"
            v-model="isScanModalShown"
            class="text-center"
            header-border-variant="success"
            title="Готово!"
            ok-variant="success"
            ok-title="Подтвердить"
            cancel-title="Отмена"
            cancel-variant="danger"
            centered
            @ok="acceptShipment"
            @hidden="hideScanScreen"
        >
            <h4 class="font-weight-normal">
                VIN-номер
            </h4>
            <h5>{{ VIN }}</h5>
            <h6>{{ car.model }}<br>{{ car.color }}</h6>
        </b-modal>
        <b-modal
            v-if="car"
            v-model="isSuccessModalShown"
            class="text-center"
            header-border-variant="success"
            title="Готово!"
            ok-variant="success"
            ok-title="Ок"
            ok-only
            centered
            @hidden="hideScanScreen"
        >
            Приемка автомобиля {{ car.VIN }} успешно подтверждена!
        </b-modal>
    </div>
</template>

<script>
import Scanner from '@/components/Scanner';
import { mapState } from 'vuex';

export default {
    name: 'ShipmentAcceptance',
    components: {
        Scanner,
    },
    data: () => ({
        isScanModalShown: false,
        isSuccessModalShown: false,
        VIN: '',
        car: null,
    }),
    computed: {
        ...mapState(['isScanScreenShown']),
    },
    methods: {
        async acceptShipment() {
            const params = {
                ...this.car,
                status: 'compound in',
            };
            await this.$http.put(`cars/${this.VIN}`, params);
            this.isSuccessModalShown = true;
        },
        onInput(result) {
            this.VIN = result;
        },
        async onDecode(result) {
            this.VIN = result;
            this.car = await this.$http.get(`cars/${this.VIN}`);
            this.isScanModalShown = true;
        },
        hideScanScreen() {
            this.VIN = '';
            this.$store.commit('hideScanScreen');
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
