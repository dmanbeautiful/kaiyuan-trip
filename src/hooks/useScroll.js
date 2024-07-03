import { onMounted,onUnmounted,ref } from 'vue';
import {throttle} from 'underscore'

// export default function useScroll() {
//     const isReachBottom = ref(false)
//     const scrollTop = ref(0)
//     const scrollHeight = ref(0)
//     const clientHeight = ref(0)

//     //监听window窗口的滚动
//     const scrollListenHandler = () => {
//         clientHeight.value = document.documentElement.clientHeight
//         scrollTop.value = document.documentElement.scrollTop
//         scrollHeight.value = document.documentElement.scrollHeight
//         if ((clientHeight.value + scrollTop.value) >= scrollHeight.value) {
//             // homeStore.fetchHouselistData()
//             isReachBottom.value = true
//         }
//     }
//     onMounted(() => {
//         window.addEventListener('scroll', scrollListenHandler)
//     })
//     //离开页面时，去除当前对于页面的监听
//     onUnmounted(() => {
//         window.removeEventListener('scroll', scrollListenHandler)
//     })
//     return {isReachBottom,clientHeight,scrollHeight,scrollTop}
// }

export default function useScroll() {
    const isReachBottom = ref(false)
    const scrollTop = ref(0)
    const scrollHeight = ref(0)
    const clientHeight = ref(0)

    //监听window窗口的滚动
    const scrollListenHandler = throttle(() => {
        clientHeight.value = document.documentElement.clientHeight
        scrollTop.value = document.documentElement.scrollTop
        scrollHeight.value = document.documentElement.scrollHeight
        if ((clientHeight.value + scrollTop.value) >= scrollHeight.value) {
            // homeStore.fetchHouselistData()
            isReachBottom.value = true
        }
    },100)
    onMounted(() => {
                window.addEventListener('scroll', scrollListenHandler)
            })
            //离开页面时，去除当前对于页面的监听
            onUnmounted(() => {
                window.removeEventListener('scroll', scrollListenHandler)
            })
            return {isReachBottom,clientHeight,scrollHeight,scrollTop}
}