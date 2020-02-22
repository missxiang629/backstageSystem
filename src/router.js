import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Welcome from './components/Welcome.vue'
import Users from './components/user/Users.vue'
import Rights from './components/power/Rights.vue'
import Cate from './components/goods/Cate.vue'
import Report from './components/report/Report.vue'







Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/',
            redirect: 'login'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/home',
            component: Home,
            redirect: '/welcome',
            children: [{
                    path: '/welcome',
                    component: Welcome
                }, {
                    path: '/users',
                    component: Users
                }, {
                    path: '/rights',
                    component: Rights
                },
                {
                    path: '/categories',
                    component: Cate
                }, {
                    path: '/report',
                    component: Report
                }
            ]
        }

    ]
})


router.beforeEach((to, from, next) => {
    if (to.path === "/login") return next()
    const tokenstr = window.sessionStorage.getItem("token")
    if (!tokenstr) return next('/login')
    next()
})


export default router