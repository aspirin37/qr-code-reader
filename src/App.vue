<template>
    <div
        id="app"
        :class="{'shown-menu': isMenuShown}"
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
        ...mapState(['isMenuShown', 'errorMessage', 'isErrorShown']),
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
.shown-menu {
    height: calc(100vh - 56px);
    overflow: hidden;
}
</style>
