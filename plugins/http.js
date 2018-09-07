import axios from './axios'
import _ from 'lodash'
import Vue from 'vue'

let config = {
  imgBaseURL: 'https://www.lrowy.com'
}

Vue.prototype._ = _
Vue.prototype.$http = axios
Vue.prototype.$config = config
