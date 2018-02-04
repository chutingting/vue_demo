import Vue from 'vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.use(ElementUI)
Vue.use(VueRouter)

import Login from './pages/login.vue'
import Table from './pages/tableList.vue'
import About from './pages/about.vue'
import LeftMenu from './pages/leftMenu.vue'
const routes = [
    /*{ path: '/', redirect: '/login' },*/
    { path: '/login', component: Login },
   // { path: '/leftMenu', component: LeftMenu },
    {
        path: '/',
        component: LeftMenu,
        children: [
            { path: '/table', component: Table },
            { path: '/about', component: About }
        ]
    }
    /*{ path: '/table', component: Table },
    { path: '/about', component: About },
    { path: '/leftMenu', component: LeftMenu },*/
];
const router = new VueRouter({
    routes
});

new Vue({
    router,
    el: '#app',
    render: h => h(App)
 });
