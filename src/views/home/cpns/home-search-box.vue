<template>
    <div class="search-box">
        <!-- 位置 -->
        <div class="location">
            <div class="city" @click="cityClick">{{ currentCity.cityName }}</div>
            <div class="position" @click="positionClick">
                <span class="text">我的位置</span>
                <img src="@/assets/img/搜索.png" alt="">
            </div>
        </div>

        <!-- 日期范围 -->
        <div class="section date-range" @click="showCalendar = true">
            <div class="start">
                <div class="date">
                    <span class="tip">入住</span>
                    <span class="time">{{ startDateStr }}</span>
                </div>
                <div class="stay">共{{stayCount}}晚</div>
            </div>
            <div class="end">
                <div class="date">
                    <span class="tip">离店</span>
                    <span class="time">{{ endDateStr }}</span>
                </div>
            </div>
        </div>
        <van-calendar 
        v-model:show="showCalendar" 
        color="#ff9854"
        type="range"
        @confirm="onConfirm"
        :round="false"
        />

        <!-- 价格人数选择 -->
        <div class="price-counter">
            <div class="start">价格不限</div>
            <div class="end">人数不限</div>
        </div>
        <div class="item keyword bottom-gray-line">关键字/位置/民宿名</div>

        <!-- 热门建议 -->
        <div class="hot-suggests">
            <template v-for="(item,index) in hotSuggests" :key="index">
                <div 
                class="item"
                :style="{color:item.tagText.color,background:item.tagText.background.color}"
                >
                    {{ item.tagText.text }}
                </div>
            </template>
        </div>

        <!-- 搜索按钮 -->
        <div class="search-btn">
            <div class="btn" @click="searchBtnClick">开始搜索</div>
        </div>
    </div>
</template>

<script setup>
import { ref,computed } from "vue";
import useCityStore from "@/stores/moudles/city";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import {formatMonthDay,getDiffDays} from '@/utils/format_date'
import useHomeStore from '@/stores/moudles/home'
import useMainStore from "@/stores/moudles/main";

const router = useRouter()

// const props =defineProps({
//     hotSuggests:{
//         type:Array,
//         default:()=>[]
//     }
// })

//位置/城市
const cityClick = () => {
    router.push('/city')
}

const positionClick = () => {
    navigator.geolocation.getCurrentPosition(res => {
        console.log('获取位置成功', res);
    }, err => {
        console.log('获取位置失败', err);
    })
}

//当前城市
const cityStore = useCityStore()
const { currentCity } = storeToRefs(cityStore)

//日期范围处理
const mainStore = useMainStore()
const{startDate,endDate} = storeToRefs(mainStore)

const startDateStr = computed(()=>formatMonthDay(startDate.value))
const endDateStr = computed(()=>formatMonthDay(endDate.value))
const stayCount = ref(getDiffDays(startDate.value,endDate.value))

const showCalendar = ref(false)
const onConfirm = (value)=>{
    //1.设置日期
    const selectStartDate = value[0]
    const selectEndDate = value[1]
    mainStore.startDate = selectStartDate
    mainStore.endDate =  selectEndDate
    stayCount.value = getDiffDays(selectStartDate,selectEndDate)
    //2.隐藏日期
    showCalendar.value = false
}

//热门建议
const homeStore = useHomeStore()
const {hotSuggests} = storeToRefs(homeStore)

//开始搜索
const searchBtnClick = ()=>{
     router.push({
        path:'/search',
        query:{
            startDate:startDate.value,
            endDate:endDate.value,
            currentCity:currentCity.value.cityName
        }
     })
}

</script>

<style lang="less" scoped>
// .search-box{
//     // --van-calendar-popup-height:100
// }

.location {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 20px;

    .city {
        flex: 1;
        color: #333;
        font-size: 14px;
    }

    .position {
        width: 74px;

        .text {
            font-size: 12px;
            color: #666;
        }

        img {
            margin-left: 5px;
            width: 18px;
            height: 18px;
        }
    }
}

.date-range{
    display: flex;
    justify-content: space-around;
    .start{
        display: flex;
        .date{
            display: flex;
            flex-direction: column;
        }

        .stay{
            position: relative;
            top: 10px;
            left: 60px;
            font-size: 10px;
            color: #666;
        }
    }

    .end{
        display: flex;
        .date{
            display: flex;
            flex-direction: column;
        }
    }

    .tip{
        font-size: 12px;
        color: #666;
    }
    .time{
        font-size: 14px;
        color: #333;
    }
}

.price-counter{
    position: relative;
    top: 15px;
    height: 44px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    .start{
        // border-right: 1px solid #f2f2f2;
        font-size: 12px;
        color: #666;
    }
    .end{
        font-size: 12px;
        color: #666;
    }
}

.keyword {
    width: 320px;
    margin-left: 30px;
    font-size: 12px;
    color: #666;
    height: 24px;
}

.bottom-gray-line{
    border-bottom:1px  solid #f2f2f2 ;
}

.hot-suggests{
    margin-top: 4px;
    margin-left: 14px;
    display: flex;
    flex-wrap: wrap;
    .item{
        font-size: 12px;
        padding: 4px 8px;
        border-radius:14px;
        margin: 4px;
    }
}

.btn{
    margin-top: 5px;
    margin-left: 15px;
    width: 342px;
    height: 38px;
    max-height: 50px;
    font-weight: 500;
    font-size: 18px;
    line-height: 38px;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    background-image: linear-gradient(90deg,#fa8c1d,#fcaf3f);
}
</style>