<template>
    <div class="page">
        <scanner
            title="VIN-номер"
            button-title="Сканировать VIN"
            :value="VIN"
            @input="onInput"
            @decode="onDecode"
        />
        <button
            ref="button-next"
            class="w-100 btn btn-success"
            :disabled="!VIN"
            @click="acceptShipment"
        >
            Подтвердить
        </button>
        <b-modal
            v-model="isModalShown"
            class="text-center"
            header-border-variant="success"
            title="Готово!"
            ok-variant="success"
            ok-only
            centered
            @hidden="hideScanScreen"
        >
            <h4 class="font-weight-normal">VIN-номер</h4>
            <h5>{{ VIN }}</h5>
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
        isModalShown: false,
        VIN: '',
    }),
    computed: {
        ...mapState(['isScanScreenShown']),
    },
    methods: {
        async acceptShipment() {},
        onInput(result) {
            this.VIN = result;
        },
        onDecode(result) {
            this.VIN = result;
            this.isModalShown = true;
        },
        hideScanScreen() {
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
