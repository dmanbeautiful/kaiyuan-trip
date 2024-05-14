<template>
    <div class="home">
        <home-nav-bar/>
        <div class="banner">
            <img src="@/assets/img/photo/1.jpg" alt="">
        </div>
        <div class="location">
            <div class="city">江苏</div>
            <div class="position">
                <span class="text">我的位置</span>
                <img src="@/assets/img/搜索.png" alt="">
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import HomeNavBar from "./cpns/home-nav-bar.vue";
</script>

<style lang="less" scoped>
    .banner{
        img{
            width: 100%;
            height: 140px;
        }
    }
    .location{
        display: flex;
        align-items: center;
        height: 44px;
        padding: 0 20px;
        .city
        {
            flex:1;
        }

        .position{
            width: 74px;
            
            .text{
                font-size: 12px;
            }

            img{
                margin-left: 5px;
                width: 18px;
                height: 18px;
            }
        }
    }
</style>