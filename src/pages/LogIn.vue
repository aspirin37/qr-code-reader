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
