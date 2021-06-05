import Vue from 'vue'

import dayjs from 'dayjs'

import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

dayjs.locale('zh-cn')

// console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'))

// console.log(dayjs('2008-01-01').from(dayjs()))

Vue.filter('relativeTime', value => {
    return dayjs(value).from(dayjs())
})
Vue.filter('datetime', (value, format = 'YY-MM-DD') => {
    return dayjs(value).format(format)
})