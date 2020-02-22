<template>
    <div>
        <!-- 面包屑区域 -->
<!-- <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>用户管理</el-breadcrumb-item>
  <el-breadcrumb-item>用户列表</el-breadcrumb-item>
</el-breadcrumb> -->
<Bread>
<span slot='a'>首页</span>
<span slot='b'>111111111</span>
<span slot='c'>22222222222</span>

</Bread>

<el-card >
   <!-- 搜索与添加用户 -->
    <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList" ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogVisible=true">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
       <el-table
      style="width: 100%" stripe border :data="userlist">
       <el-table-column
       type='index'
       >
      </el-table-column>

      <el-table-column
        prop="username"
        label="姓名"

       >
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
       >
      </el-table-column>
      <el-table-column
        prop="tel"
        label="电话">
      </el-table-column>
        <el-table-column
        prop="role"
        label="角色">
      </el-table-column>
        <el-table-column
        label="状态">
         <template slot-scope="scope">
            <el-switch v-model="scope.row.status" @change="userStateChanged(scope.row)">
            </el-switch>
          </template>
      </el-table-column>

       <el-table-column
        label="操作" width='180px'>

          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" @click="removeUserById(scope.row.id)" size="mini"></el-button>
            <!-- 分配角色按钮 -->
            <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
            </el-tooltip>
          </template>
      </el-table-column>
      </el-table>


        <!-- 分页区域 -->
     <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="1" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
</el-card>
<!-- 添加用户的对话框 -->
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"  @close="addDialogClosed" 
  >
  <!-- 内容主体 -->
 <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="tel">
          <el-input v-model="addForm.tel"></el-input>
        </el-form-item>
      </el-form>
  <!-- 底部区域 -->
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addUser">确 定</el-button>
  </span>
</el-dialog>

<!-- 修改用户的对话框 -->
<el-dialog
  title="修改用户"
  :visible.sync="editDialogVisible"
  width="50%" @close="editDialogClosed">
  <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="tel">
          <el-input v-model="editForm.tel"></el-input>
        </el-form-item>
      </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="editDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="editUserInfo">确 定</el-button>
  </span>
</el-dialog>
    </div>
</template>
<script>
import Bread from '@/components/Bread'

export default {
   components:{
    Bread

  },
  data(){
 var checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb()
      }

      cb(new Error('请输入合法的邮箱'))
    }

    // 验证手机号的规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

      if (regMobile.test(value)) {
        return cb()
      }

      cb(new Error('请输入合法的手机号'))
    }
    return{
      queryInfo:{
        query:"",
        pagenum:1,
        pagesize:1
      },
      aaa:{
         curPage:1,
       pageSize:1,
      },
      userlist:[],
      total:0,
     dialogVisible:false,
     addForm:{
       username:"",
       password:"",
       email:"",
       tel:""
     },
    addFormRules:{
      username:[
        {required:true,message:"请输入用户邮箱",trigger:"blur"
        },
         {
            min: 3,
            max: 10,
            message: '用户名的长度在3~10个字符之间',
            trigger: 'blur'
          }
      ],
       password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '用户名的长度在6~15个字符之间',
            trigger: 'blur'
          }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
    },
    // 修改用户
    editDialogVisible:false,
     editFormRules: {
        email: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' }
        ],
        tel: [
          { required: true, message: '请输入用户手机', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ]
      }, 
        editForm: {},
    }
  },
  created(){
    this.getUserList()

  },
  methods:{
    async getUserList(){
      const {data:res}=await this.$http.get("user",{
        params:this.aaa
      })
      if (res.records.length ==0) {return this.$message.error("获取用户列表失败")}
      this.userlist = res.records
      this.total=res.total
      // this.aaatotal=res.total
      console.log(res)
    },
    // 监听pagesize改变的事件
    handleSizeChange(newSize){
      //  console.log(`每页 ${newSize} 条`);
      this.queryInfo.pagesize=newSize
      this.aaa.pageSize=newSize
      this.getUserList()



    },
    // 监听页码值改变的事件
    handleCurrentChange(newPage){
      // console.log(`当前页: ${newPage}`);
       this.queryInfo.pagenum = newPage
       this.aaa.curPage=newPage
      this.getUserList()
    },
    // 监听switch开关状态的改变
   async userStateChanged(userinfo){
      // console.log(userinfo)
  //  const {data:res}= await  this.$http.put(`user/${userinfo.id}/state/${userinfo.mg_state}`)
  //  if(res.meta.status !==200){
  //    userinfo.mg_state=!userinfo.mg_state
  //    return this.message.error("更新用户状态失败")
  //  }
  //  this.$message.success("更新用户状态成功")
    },

    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    addUser(){
      this.$refs.addFormRef.validate( async valid=>{
        console.log(valid)
        if(!valid)return
        console.log(this.addForm)
        const{data:res}=await this.$http.post("user",this.addForm)
        console.log(res)
        //   if (res.meta.status !== 201) {
        //   this.$message.error('添加用户失败！')
        // }

        this.$message.success('添加用户成功！')
        // 隐藏添加用户的对话框
        this.dialogVisible = false
        // 重新获取用户列表数据
        this.getUserList()
      })
    },
    async showEditDialog(id) {
      // console.log(id)
      // const { data: res } = await this.$http.get('users/' + id)

      // if (res.meta.status !== 200) {
      //   return this.$message.error('查询用户信息失败！')
      // }
// console.log(this.userlist.id)

      // this.editForm = this.userlist.id
      // console.log(id)
      // console.log(this.userlist[id-1])
      this.editForm = this.userlist[id-1]
      this.editDialogVisible = true
    },
    editDialogClosed(){
      this.$refs.editFormRef.resetFields()
    },
    editUserInfo(){
      this.$refs.editFormRef.validate(async valid=>{
        console.log(valid)
        if(!valid) return
        // 发起修改用户信息的数据请求
 const  {data:res}=     await  this.$http.put("/user",{
          id:this.editForm.id,
          email:this.editForm.email,
          tel:this.editForm.tel
        })
        // if(res.meta.status!==200){
        //   return this.$message.error("更新用户信息失败")
        // }
        this.$message.success(res)
        this.editDialogVisible=false
        this.getUserList()
       

      })
    },
async    removeUserById(id){
    const confirmResult = await    this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'}).catch(err=>err)
    // console.log(confirmResult)
    if(confirmResult !=="confirm"){
      return this.$message.info("已取消删除")
    }
    console.log(id)

    const {data:res}=await this.$http.delete("user/"+id)
    // if(res.meta.status !== 200){
    //   return this.$message.error("删除用户失败")
    // }
    this.$message.success("删除用户成功！")
    this.getUserList()


    }


  }
}
</script>