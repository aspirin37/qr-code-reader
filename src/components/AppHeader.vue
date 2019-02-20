<template>
    <!-- :class="{'position-fixed': isMenuShown}" -->
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
                @click="hideMenu"
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
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'AppHeader',
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
        ...mapState(['isMenuShown']),
        ...mapGetters(['userArea']),
    },
    methods: {
        toggleMenu() {
            this.$store.commit('toggleMenu');
        },
        hideMenu() {
            this.$store.commit('hideMenu');
        },
    },
};
</script>
<style lang="scss" scoped>
header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
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
    display: flex;
    flex-direction: column;
    height: calc(100vh - 116px);
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
