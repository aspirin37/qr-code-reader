<template>
    <div class="page">
        <transition
            name="fade"
            mode="out-in"
        >
            <template v-if="documentList && documentList.length">
                <ul class="list-group">
                    <li class="list-group-item justify-content-between bg-light">
                        <span>ТТН/Акт</span>
                        <span>Пользователь</span>
                    </li>
                    <li
                        v-for="(it, i) in documentList"
                        :key="i"
                        class="list-group-item justify-content-between"
                    >
                        <span>{{ it.description }}</span>
                        <span>{{ it.userName }}</span>
                    </li>
                </ul>
            </template>
            <div
                v-if="documentList && !documentList.length"
                class="mock-text"
            >
                Нет документов в работе.
            </div>
            <div
                v-if="!documentList"
                class="mock-text"
            >
                loading...
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'DocumentsAtWork',
    data: () => ({
        documentList: null,
    }),
    created() {
        this.getDocuments();
    },
    methods: {
        async getDocuments() {
            this.documentList = (await this.$http.get('documents')) || [];
        },
    },
};
</script>
<style lang="scss" scoped>
.title {
    padding-left: 0.5rem;
    margin-bottom: 0.6rem;
    font-size: 20px;
}

.list-group-item span {
    width: 49%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.mock-text {
    padding: 1.5rem;
    text-align: center;
    font-size: 18px;
}
</style>
