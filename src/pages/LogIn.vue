<template>
    <div class="page" />
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'LogIn',
    computed: {
        ...mapState(['user']),
    },
    mounted() {
        this.logIn();
    },
    methods: {
        async logIn() {
            if (!localStorage.user) {
                const user = await this.$http.get('users/current');
                this.$store.commit('logIn', user);
                this.initApp();
            } else {
                this.$store.commit('logIn', JSON.parse(localStorage.user));
                this.initApp();
            }
        },
        initApp() {
            if (this.user && this.user.roles.length > 1) {
                this.$store.commit('initMenu', this.user);
                return;
            }

            this.$router.push('/scan-TTN');
        },
    },
};
</script>
