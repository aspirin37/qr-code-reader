<template>
    <div id="app">
        <app-header />
        <router-view />
        <b-modal
            v-model="isErrorShown"
            header-border-variant="danger"
            title="Ошибка соединения"
            ok-only
            centered
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
        isErrorShown: false,
    }),
    computed: {
        ...mapState(['isMenuShown', 'errorMessage']),
    },
    watch: {
        errorMessage(error) {
            this.isErrorShown = !!error;
        },
    },
};
</script>
