<<template>
    <div class="detail">
        <van-nav-bar title="房屋详情" left-text="旅途" left-arrow @click-left="onClickLeft" />
        <div class="main" v-if="mainPart"> 
            <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics" />
            <detail-infos :top-infos="mainPart.topModule"/>
            <detail-facility :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"/>
            <detail-landlord :landlord="mainPart.dynamicModule.landlordModule"/>
            <detail-comment :comment="mainPart.dynamicModule.commentModule"/>
            <detail-notice :order-rules="mainPart.dynamicModule.rulesModule.orderRules"/>
            <!-- <detail-map/> -->
            <!-- <detail-intro :price-intro="mainPart.introductionModule"/> -->
            <detail-intro/>
        </div>

        <div class="footer">
            <img src="../../assets/img/通用.png" alt="">
            <div class="text">刑具旅途，永无止境</div>
        </div>
    </div>
</template>

    <script setup name="home">
    import { useRoute, useRouter } from "vue-router";
    import { getDetailInfos } from '@/service'
    import { ref, onMounted } from "vue";
    import { computed } from "vue";

    import DetailSwipe from "./cpns/detail_01-swipe.vue";
    import DetailInfos from "./cpns/detail_02-infos.vue";
    import DetailFacility from './cpns/detail_03-facility.vue'
    import DetailLandlord from './cpns/detail_04-landlord.vue'
    import DetailComment from './cpns/detail_05-comment.vue'
    import DetailNotice from './cpns/detail_06-notice.vue'
    import DetailMap from './cpns/detail_07-map.vue'
    import DetailIntro from './cpns/detail_08-intro.vue'

    const router = useRouter()
    const route = useRoute()
    //发送网络请求
    const detailInfos = ref({})
    const mainPart = computed(() => detailInfos.value.mainPart)
    const houseId = route.params.id;

    getDetailInfos(houseId).then(res => {
        detailInfos.value = res.data
    })



    //监听返回按钮的点击
    const onClickLeft = () => {
        router.back()
    }

</script>
<style lang="less" scoped>
.footer{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100px;

    img{
        width: 24px;
    }

    .text{
        margin-top: 12px;
        font-size: 12px;
        color: #7688a7;
    }
}
</style>