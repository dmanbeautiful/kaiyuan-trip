<template>
    <van-tabbar v-model="currentIndex" route>
        <template v-for="(item,index) in tabbarData">
            <van-tabbar-item :to="item.path">
                <span>{{ item.text }}</span>
                <template #icon>
                    <img :src="getAssetUrl(item.image)" alt="">
                </template>
            </van-tabbar-item>
        </template>
    
    </van-tabbar>


    <!-- <div class="tab-bar">
        <template v-for="(item, index) in tabbarData">
            <div class="tab-bar-item" 
            :class="{active:currentIndex===index}"
            @click="itemClcik(index,item)"
            >
                <img :src=getAssetUrl(item.image) alt="">
                <span class="text">{{item.text}}</span>
            </div>
        </template>
</div> -->
</template>

<script setup>

import { ref } from "vue";
import tabbarData from "@/assets/data/tabbar";
import { getAssetUrl } from "@/utils/load_assets";
import { useRouter } from "vue-router";

const router = useRouter()
const currentIndex = ref(0)  
const itemClcik = (index, item) => {
    currentIndex.value = index
    router.push(item.path)
}

</script>

<style lang="less" scoped>
.tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    display: flex;

    border-top: 1px solid #f3f3f3;

    .tab-bar-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        &.active {
            color: #ff9854;
        }

        .text {
            font-size: 12px;
        }

        img {
            width: 32px;
            height: 32px;
        }
    }
}
</style>