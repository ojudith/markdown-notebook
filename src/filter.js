import moment from 'moment'
import Vue from 'vue'

const dateFilter = time => moment(time).format('DD/YY/MM, HH:mm')

Vue.filter('date', dateFilter)


export default dateFilter