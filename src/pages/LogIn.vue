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
                localStorage.user = JSON.stringify(user);
                this.$store.commit('logIn', user);
                this.initApp();
            } else {
                this.$store.commit('logIn', JSON.parse(localStorage.user));
                this.initApp();
            }
        },
        initApp() {
            if (this.user.roles.length > 1) {
                this.$store.commit('initMenu', this.user);
                return;
            }

            const userRole = this.user.roles[0];
            switch (userRole) {
                case 'pre-scan':
                    this.$router.push('/scan-TTN');
                    break;
                case 'dispatch':
                    this.$router.push('/shipment-confirmation');
                    break;
                default:
                    throw new Error('User role not found');
            }
        },
    },
};
</script>
