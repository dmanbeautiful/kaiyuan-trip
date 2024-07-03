import hyRequest from '@/service/request/index'

export function getHomeSuggests(){
    return hyRequest.get({url:'/home/hotSuggests'})
}

export function getHomeCategories(){
    return hyRequest.get({url:'/home/categories'})
}

export function getHomeHouselist(currentPage = 1){
    return hyRequest.get({
        url:'/home/houselist',
        params:{
            page:currentPage
        }
    })
}