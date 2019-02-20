<template>
    <div
        id="app"
        class="app"
        :class="app100vh"
    >
        <app-header />
        <router-view />
        <b-modal
            v-model="isModalShown"
            header-border-variant="danger"
            title="Ошибка"
            ok-only
            centered
            @hidden="hideScanScreen"
        >
            {{ errorMessage }}
        </b-modal>
    </div>
</template>

<script>
import AppHeader from '@/components/AppHeader';
import { mapState } from 'vuex';

export default {
    name: 'App',
    components: {
        AppHeader,
    },
    data: () => ({
        isModalShown: false,
    }),
    computed: {
        ...mapState([
            'isMenuShown',
            'isScanScreenShown',
            'errorMessage',
            'isErrorShown',
        ]),
        app100vh: () => ({
            'app--100vh': isMenuShown || isScanScreenShown,
        }),
    },
    methods: {
        hideScanScreen() {
            this.$store.commit('hideScanScreen');
        },
    },
    watch: {
        isErrorShown(val) {
            this.isModalShown = val;
        },
    },
};
</script>
<style lang="scss" scoped>
.app {
    max-height: 100%;
    transition-delay: 0.3s;

    &--100vh {
        max-height: calc(100vh - 56px);
        overflow: hidden;
    }
}
</style>
