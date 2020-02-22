import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import store from './store'
import './plugins/element.js'
import './assets/css/global.css'
import { Form, FormItem, Input, Button, Message, Container, Header, Aside, Main, Menu, Submenu, MenuItemGroup, MenuItem, breadcrumb, breadcrumbItem, card, row, col, Table, TableColumn, Switch, Tooltip, Pagination, Dialog, MessageBox, Tag, Cascader } from 'element-ui'
import './assets/fonts/iconfont.css'
import axios from 'axios'
import TreeTable from "vue-table-with-tree-grid"



Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Menu)
Vue.use(breadcrumb)
Vue.use(breadcrumbItem)
Vue.use(card)
Vue.use(row)
Vue.use(col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Cascader)


// Vue.use(MessageBox)











axios.defaults.baseURL = 'http://192.168.1.6:8080/'
axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem("token")
    return config
})
Vue.prototype.$http = axios
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm





Vue.config.productionTip = false
Vue.component("tree-table", TreeTable)


new Vue({
    router,
    render: h => h(App)
}).$mount('#app')