<template>
    <div class="city">
        <div class="top">
            <!-- 搜索框 -->
            <van-search 
        v-model="searchValue" 
        placeholder="城市/区域/位置" 
        shape='round'
        show-action
        @cancel='cancelClick'
            />
            <!-- tab切换 -->
            <van-tabs v-model:active="tabActive" color="#ff9854">
            <template v-for="(value,key,index) in allCities" ;key="key">
                <van-tab :title="value.title" :name="key"></van-tab>
            </template>
            </van-tabs>
        </div>
        <div class="content">
            <!-- <city-group :group-data="currentGroup"/> -->
            <template v-for="(value,key,index) in allCities">
                <city-group v-show="tabActive===key" :group-data="value"/>
            </template>
        </div>
    </div>
</template>

<script setup>
import { ref,computed } from "vue";
import { useRouter } from "vue-router";
// import hyRequest from '@/service/request'
import {getCityAll} from '@/service'
import useCityStore from "@/stores/moudles/city";
import { storeToRefs } from "pinia";
import CityGroup from "./cpns/city-group.vue";


const router = useRouter()

//搜索框功能
const searchValue = ref("")
const cancelClick=()=>{
    router.back()
}

//tab的切换
const tabActive = ref()//绑定索引

//网络请求，获取城市的数据
// hyRequest.get({
//     url:'/city/all'
// }).then(res=>{
//     console.log(res);
// })
// const allCity = ref({})
// getCityAll().then(res=>{
//     allCity.value = res.data
// })

//从Store中获取数据
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const {allCities} = storeToRefs(cityStore)

//获取选中标签后的数据
//1.获取正确的key：将tabs中绑定的tabActive正确绑定
//2.根据key从allCities获取数据，默认获取的不是响应式的，所以必须包裹computed
const currentGroup = computed(()=>allCities.value[tabActive.value])

</script>

<style lang="less" scoped>
    .city{

        // .top{
        //     position: fixed;
        //     top:0;
        //     left: 0;
        //     right: 0;
        // }

        // .content{
        //     margin-top: 94px;
        // }

        .top{
            position: relative;
            z-index: 9;
        }
        //局部滚动
        .content{
            height: calc(100vh - 98px);
            overflow-y: auto;
        }
    }
</style>