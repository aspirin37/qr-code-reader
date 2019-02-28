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
        if (!localStorage.user) {
            this.logIn();
        } else {
            this.$router.push('/scan-TTN');
        }
    },
    methods: {
        async logIn() {
            this.user = await this.$http.get('users/current');
            this.$store.commit('logIn', this.user);

            if (this.user.roles.length > 1) {
                this.$store.commit('initMenu', this.user);
                return;
            }

            this.$router.push('/scan-TTN');
        },
    },
};
</script>
