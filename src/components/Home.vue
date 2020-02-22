<template>
  
        
         <el-container class="home-container">
  <el-header>
    <div>
        <img src="../assets/logo.png" alt="">
        <span>电商后台管理系统</span>
      </div>
       <el-button type="info" @click="logout">退出</el-button>
  </el-header>

  <!-- 侧边栏 -->
  <el-container>
    <el-aside width="200px">
<!-- 导航栏一级菜单 -->
       <el-menu unique-opened router :default-active="activePath">
      <el-submenu :index="item.id + ''" v-for="item in menulist[0].data" :key="item.id" >
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item.authName}}</span>
        </template>
        <!-- 导航栏二级菜单 -->
         <el-menu-item @click="saveNavState(subItem.path)" :index="subItem.path + ''"  v-for="subItem in item.children" :key="subItem.id">{{subItem.authName}}</el-menu-item>
      </el-submenu>
       </el-menu>
    </el-aside>


    <!-- 侧边栏结束 -->
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
    
</template>
<script>
export default {
  data(){
    return{
        activePath: '',
      menulist:[
        {
    "data": [{
        "id": "1",
        "authName": "用户管理",
        "path": "/users",
        "children": [{
            "id": 101,
            "authName": "用户列表",
            "path": "/users",
            "children": []
        }]

    },{
       "id": "2",
        "authName": "权限管理",
        "path": "/rights",
        "children": [{
            "id": 201,
            "authName": "角色列表",
            "path": "/rights",
            "children": []
        },{
          "id": 202,
            "authName": "权限列表",
            "path": "/rights",
            "children": []

        }]
    },{
       "id": "3",
        "authName": "商品管理",
        "path": "/categories",
        "children": [{
            "id": 301,
            "authName": "商品列表",
            "path": "/sdf",
            "children": []
        },{
          "id": 302,
            "authName": "分类参数",
            "path":  "/orders",
            "children": []
        },{ "id": 303,
            "authName": "商品分类",
            "path":  "/categories",
            "children": []}]
    },{
       "id": "4",
        "authName": "订单管理",
        "path": "/reports",
        "children": [{
            "id": 401,
            "authName": "商品列表",
            "path":"/reports",
            "children": []
        }]
    },{
       "id": "5",
        "authName": "数据统计",
        "path": "/safsad",
        "children": [{
            "id": 501,
            "authName": "数据列表",
            "path":  "/report",
            "children": []
        }]
    }],



    "meta": {
        "msg": "获取商品菜单列表成功",
        "status": 200
    }
}
        
      ]
    }

  },
  created(){
   this.activePath = window.sessionStorage.getItem('activePath')

  },
    methods:{
        logout(){
            window.sessionStorage.clear()
            this.$router.push('/login')

        },
        saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
      // console.log(this.activePath)
    }

    }
}
</script>


<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>