<template>
    <div class="home" ref="homeRef">
        <home-nav-bar />
        <div class="banner">
            <img src="@/assets/img/photo/1.jpg" alt="">
        </div>
        <home-search-box/>
        <home-categories/>

        <div class="search-bar" v-if="isShowSearchBar">
            <search-bar/>
        </div>
 
        <home-content/>
        <!-- <button @click="moreBtnClick">加载更多</button> -->
    </div>
</template>

<script setup>
import { ref,watch,computed } from 'vue';
import HomeNavBar from "./cpns/home-nav-bar.vue";
import HomeSearchBox from './cpns/home-search-box.vue'
import useHomeStore from '@/stores/moudles/home'
import HomeCategories from './cpns/home-categories.vue'
import HomeContent from './cpns/home-content.vue'
import SearchBar from '@/components/search-bar/search-bar.vue'

import useScroll from '@/hooks/useScroll'
import { onActivated } from 'vue';

//发送网络请求
//1.热门建议
// const hotSuggests = ref([])
// hyRequest.get({
//     url: '/home/hotSuggests'
// }).then(res => {
//     hotSuggests.value = res.data
// })
const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
homeStore.fetchCategoriesData()
homeStore.fetchHouselistData()

//加载更多页
// const moreBtnClick = ()=>{
//     homeStore.fetchHouselistData()
// }

// //监听window窗口的滚动
// const scrollListenHandler= ()=>{
//     const clientHeight = document.documentElement.clientHeight
//     const scrollTop = document.documentElement.scrollTop
//     const scrollHeight = document.documentElement.scrollHeight
//     if((clientHeight+scrollTop) >= scrollHeight){
//         homeStore.fetchHouselistData()
//     }
// }
// onMounted(()=>{
//     window.addEventListener('scroll',scrollListenHandler)
// })
// //离开页面时，去除当前对于页面的监听
// onUnmounted(()=>{
//     window.removeEventListener('scroll',scrollListenHandler)
// })

const homeRef = ref()

const {isReachBottom,scrollTop} = useScroll(homeRef) 
watch(isReachBottom,(newValue)=>{
    if(newValue){
        homeStore.fetchHouselistData().then(()=>{
            isReachBottom.value = false
        })
    }
})

//跳转后返回home，保留原先的位置
onActivated(()=>{
    homeRef.value?.scrollTop({
        top:scrollTop.value
    })
})


//搜索框显示的控制
// const isShowSearchBar = ref(false)
// watch(scrollTop,(newTop)=>{
//     isShowSearchBar.value = newTop > 100
// })
const isShowSearchBar = computed(()=>{
    return scrollTop.value >= 320
})



</script>

<style lang="less" scoped>
.home{
    padding-bottom: 100px;
    box-sizing: border-box;
    height: 100vh;
    overflow-y: auto;
}
.banner {
    img {
        width: 100%;
        height: 140px;
    }
}

.search-bar{
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background-color: #fff;
}
</style>