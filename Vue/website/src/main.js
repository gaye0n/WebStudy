import Vue from 'vue'
import App from './App.vue'
import Home from "@/components/Home";
import Login from "@/components/Login";
import Register from "@/components/Register";

import VueRouter from 'vue-router';

Vue.config.productionTip = false

// 플러그인 형태의 VueRouter 등록
Vue.use(VueRouter);

//라우터 객체 생성
const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login},
    { path: '/register', component: Register},
  ]
})

new Vue({
  router, //라우터 등록
  render: h => h(App),
}).$mount('#app')