<template>
    <div class="page">
        <template v-if="documentList">
            <div class="title">
                Документы в работе:
            </div>
            <ul class="list-group">
                <!-- <li class="list-group-item justify-content-between align-items-baseline">
                    <span>Документ</span>
                    <small>Ответственный</small>
                </li> -->
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
        <div v-else>
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
</style>
