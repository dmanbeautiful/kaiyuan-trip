import axios from "axios";

import { BASE_URL, TIMEOUT } from "./config";
import { get } from "vant/lib/utils";
import useMainStore from "@/stores/moudles/main";

const mainStore = useMainStore()



class HYRequest {
  constructor(baseURL, timeout = 10000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })

    this.instance.interceptors.request.use(config => {
      mainStore.isLoading = true
      return config
    }, err => {
      return err
    })
    this.instance.interceptors.response.use(res => {
      mainStore.isLoading = false
      return res
    }, err => {
      mainStore.isLoading = false
      return err
    })
  }

  request(config) {
    //在拦截器中实现操作
    // mainStore.isLoading = true
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res.data)
        // mainStore.isLoading = false
      }).catch(err => {
        reject(err)
        // mainStore.isLoading = false
      })
    })
  }

  get(config) {
    return this.request({ ...config, method: 'get' })
  }

  post(config) {
    return this.request({ ...config, method: 'post' })
  }
}
export default new HYRequest(BASE_URL, TIMEOUT)