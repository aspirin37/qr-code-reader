<template>
    <div class="d-flex modal">
        <div class="spinner">
            <b-spinner
                type="grow"
                label="Spinning"
                style="width: 3rem; height: 3rem;"
            />
        </div>
    </div>
</template>

<script>
export default {
    name: 'PageLoader',
};
</script>

<style lang="scss" scoped>
.modal {
    background-color: rgba(255, 255, 255, 0.5);
}

.spinner {
    margin: auto;
    color: $ford-slate;
}
</style>
