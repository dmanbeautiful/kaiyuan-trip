<template>
    <div class="house-item">
        <div class="item-inner">
            <div class="cover">
                <img :src="itemData.image.url" alt="">
            </div>
            <div class="info">
                <div class="location">
                    <img src="@/assets/img/401位置.svg" alt="">
                    <span>{{ itemData.location }}</span>
                </div>
                <div class="name">{{ itemData.houseName }}</div>
                <div class="summary">{{ itemData.summaryText }}</div>
                <div class="price">
                    <div class="new">￥{{ itemData.finalPrice }}</div>
                    <div class="old">￥{{ itemData.productPrice }}</div>
                    <div class="tip">{{ itemData?.priceTipBadge?.text }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

defineProps({
    itemData: {
        type: Object,
        default: () => ({})
    }
})

</script>

<style lang="less" scoped>
.house-item {
    width: 50%;

    .item-inner {
        margin: 5px;
        background: #fff;
        border-radius: 6px;
        overflow: hidden;

        .cover {
            img {
                width: 100%;
            }
        }

        .info {
            bottom: 0;
            padding: 8px 10px;
            color: #000;

            .location {
                display: flex;
                flex-direction: row;
                span{
                    font-size: 12px;
                    color: #666;
                }

                img {
                    width: 12px;
                    height: 12px;
                }
            }

            .summary {
                font-size: 12px;
                color: #666;
            }

            .name {
                font-size: 14px;
                margin: 5px 0;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }

            .price {
                display: flex;
                justify-content: space-between;
                margin-top: 10px;
                font-size: 14px;

                .new{
                color: #ff9854;
                }
                
                .old{
                    text-decoration:line;
                }

                .tip{
                    background-color: #ff6666;
                    border-radius: 5px;
                }
            }
        }
    }
}
</style>