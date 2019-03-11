<template>
    <div class="page">
        <template v-if="documentList">
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
            v-else
            class="text-center p-4"
        >
            loading...
        </div>
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
            this.documentList = await this.$http.get('documents');
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
</style>
