import { defineStore } from "pinia"
import {getHomeSuggests,getHomeCategories,getHomeHouselist} from '@/service'

const useHomeStore = defineStore('home',{
    state:()=>({
        hotSuggests:[],
        categories:[],
        currentPage:1,
        houselist:[]
    }),
    actions:{
        async fetchHotSuggestData(){
            const res = await getHomeSuggests()
            this.hotSuggests = res.data
        },
        async fetchCategoriesData(){
            const res = await getHomeCategories()
            this.categories = res.data
        },
        async fetchHouselistData(){
            const res = await getHomeHouselist(this.currentPage)
            this.houselist.push(...res.data)
            this.currentPage++
        }
    }
})

export default useHomeStore