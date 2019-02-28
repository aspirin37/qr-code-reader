<template>
    <div class="page" />
</template>

<script>
export default {
    name: 'LogIn',
    data: () => ({
        user: null,
    }),
    mounted() {
        this.logIn();
    },
    methods: {
        async logIn() {
            if (!localStorage.user) {
                this.user = await this.$http.get('users/current');
                this.$store.commit('logIn', this.user);
                this.initApp();
            } else {
                this.initApp();
            }
        },
        initApp() {
            if (this.user.roles.length > 1) {
                this.$store.commit('initMenu', this.user);
                return;
            }

            this.$router.push('/scan-TTN');
        },
    },
};
</script>
