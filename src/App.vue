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
            <div class="text-center">
                {{ errorMessage }}
            </div>
        </b-modal>
        <page-loader v-if="isPageLoaderShown" />
    </div>
</template>

<script>
import AppHeader from '@/components/AppHeader';
import PageLoader from '@/components/PageLoader';
import { mapState } from 'vuex';

export default {
    name: 'App',
    components: {
        AppHeader,
        PageLoader,
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
            'isPageLoaderShown',
        ]),
        app100vh: vm => ({
            'app--100vh': vm.isMenuShown || vm.isScanScreenShown,
        }),
    },
    watch: {
        isErrorShown(val) {
            this.isModalShown = val;
        },
    },
    created() {
        this.$router.push('/warning');
    },
    methods: {
        hideScanScreen() {
            this.$store.commit('hideScanScreen');
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
