<template>
    <div class="loading" v-if="mainStore.isLoading" @click="isLoadingClick">
        <div class="bg">
            <img src="../../assets/img/loading.gif" alt="">
        </div>
    </div>
</template>

<script setup>
import useMainStore from '@/stores/moudles/main';
import { storeToRefs } from 'pinia';

const mainStore = useMainStore()
const isLoadingClick = ()=>{
    mainStore.isLoading = false
}

</script>

<style lang="less" scoped>
.loading {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, .2);
}

.bg {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>