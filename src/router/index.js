import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import d3 from '@/views/d3'
import tb from '@/views/tb'
import line from '@/views/line'
import line4 from '@/views/line4'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/d3',
      name: 'd3',
      component: d3
    },
    {
      path: '/tb',
      name: 'tb',
      component: tb
    },
    {
      path:'/line',
      name: 'line',
      component: line
    },
    {
      path:'/line4',
      name: 'line4',
      component: line4
    }

  ]
})
