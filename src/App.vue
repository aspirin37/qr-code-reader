<template>
    <div id="app">
        <app-header />
        <transition
            name="menu"
            mode="out-in"
        >
            <router-view v-if="!isMenuShown" />
        </transition>
        <b-modal v-model="isModalShown" />
    </div>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader';

export default {
    name: 'App',
    components: {
        AppHeader,
    },
    data: () => ({
        isModalShown: true,
    }),
    computed: {
        isMenuShown() {
            return this.$store.state.isMenuShown;
        },
    },
};
</script>

<style lang="scss">
.menu-enter-active {
    transition: all 0.15s ease-out;
}

.menu-leave-active {
    transition: all 0.15s ease-in;
}

.menu-enter,
.menu-leave-active {
    opacity: 0;
}
</style>
