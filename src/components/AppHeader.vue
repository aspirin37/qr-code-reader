<template>
    <header>
        <div class="navbar">
            <span
                class="navbar__toggler"
                @click="toggleMenu"
            >
                <span :class="['hamburger-menu', {'animate': isMenuShown}]" />
            </span>
            <span>FordSollers <small>{{ userArea }}</small></span>
        </div>
        <transition name="menu">
            <nav
                v-if="isMenuShown"
                class="side-bar"
                @click="hideMnu"
            >
                <router-link
                    v-for="(it, i) in navigation"
                    :key="i"
                    :to="it.link"
                    class="side-bar__link border-bottom"
                    tag="div"
                >
                    {{ it.label }}
                </router-link>
                <div class="side-bar__link side-bar__link--logout">
                    Выход
                </div>
            </nav>
        </transition>
    </header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'AppHeader',
    components: {},
    data: () => ({
        navigation: [
            {
                label: 'Проверка VIN из ТТН/Акт',
                link: '/scan-TTN',
            },
            {
                label: 'Документы в работе',
                link: '/',
            },
        ],
    }),
    computed: {
        ...mapGetters(['userArea']),
        isMenuShown() {
            return this.$store.state.isMenuShown;
        },
    },
    methods: {
        toggleMenu() {
            this.$store.commit('toggleMenu');
        },
        hideMnu() {
            this.$store.commit('hideMenu');
        },
    },
};
</script>
<style lang="scss" scoped>
header {
    position: relative;
    z-index: 100;
    width: 100%;
}

.navbar {
    position: relative;
    height: 60px;
    padding: 15px;
    font-size: 20px;
    font-weight: 600;
    background-color: $ford-slate;
    color: white;

    & small {
        font-size: 0.9em;
    }

    &__toggler {
        position: absolute;
        right: 15px;
        top: 8px;
    }
}

.side-bar {
    position: absolute;
    z-index: 1;
    top: 60px;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 60px);
    background-color: #f8f9fa;

    &__link {
        display: block;
        padding: 15px;
        border-bottom: 1px solid #dee2e6;
        font-size: 22px;

        &--logout {
            margin-top: auto;
            border-top: 1px solid #dee2e6;
            opacity: 0.7;
        }
    }
}

.menu-enter-active {
    transition: all 0.15s ease-out;
}

.menu-leave-active {
    transition: all 0.15s ease-in;
}

.menu-enter,
.menu-leave-active {
    opacity: 0;
    transform: translateX(-10px);
}
</style>
