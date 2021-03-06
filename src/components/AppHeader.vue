<template>
    <header v-if="user">
        <div class="navbar">
            <span
                v-if="!isMenuShownFirstTime"
                class="navbar__toggler"
                @click="toggleMenu"
            >
                <span :class="['hamburger-menu', {'animate': isMenuShown}]" />
            </span>
            <span>{{ user.area.description }}</span>
        </div>
        <transition name="menu">
            <nav
                v-if="isMenuShown"
                class="side-bar"
            >
                <router-link
                    v-for="(it, i) in navigation"
                    v-show="userHasAccess(it)"
                    :key="i"
                    :to="it.link"
                    class="side-bar__link border-bottom"
                    @click.native="hideMenu"
                >
                    {{ it.label }}
                </router-link>
                <div
                    class="side-bar__link side-bar__link--logout"
                    @click="logOut"
                >
                    Выход
                </div>
            </nav>
        </transition>
    </header>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'AppHeader',
    data: () => ({
        navigation: [
            {
                label: 'Проверка VIN из ТТН/Акт',
                link: '/scan-TTN',
                role: 'pre-scan',
            },
            {
                label: 'Документы в работе',
                link: '/documents-at-work',
                role: 'atWork',
            },
            {
                label: 'Подтверждение отгрузки',
                link: '/shipment-confirmation',
                role: 'dispatch',
            },
            {
                label: 'Подтверждение приемки',
                link: '/shipment-acceptance',
                role: 'CompoundIn',
            },
        ],
    }),
    computed: {
        ...mapState(['isMenuShown', 'isMenuShownFirstTime', 'user']),
    },
    methods: {
        toggleMenu() {
            this.$store.commit('toggleMenu');
        },
        hideMenu() {
            this.$store.commit('hideMenu');
        },
        logOut() {
            localStorage.removeItem('user');
        },
        userHasAccess(link) {
            return this.user.roles.some(userRole => userRole === link.role);
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
    font-size: 18px;
    line-height: 30px;
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
        color: inherit;
        text-decoration: none;
        transition-delay: 0.15s;

        &.router-link-active {
            background-color: rgba(0, 0, 0, 0.05);
        }

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
