<template>
 <div>
        <!-- 面包屑区域 -->
<!-- <el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item>商品管理</el-breadcrumb-item>
  <el-breadcrumb-item>商品分类</el-breadcrumb-item>
</el-breadcrumb> -->
<Bread>
<span slot='a'>首页</span>
<span slot='b'>商品分类</span>
<span slot='c'>商品管理</span>

</Bread>


<!-- 添加分类 -->
<el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
        </el-col>
      </el-row>
      

      <!-- 表格 -->
      <tree-table :data="catelist" :columns="columns" :selection-type="false" :expand-type="false" show-index index-text="#" border>
        <!-- <template slot="isok" slot-scope="scope">
          <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color: lightgreen;"></i>
          <i class="el-icon-error" v-else style="color: red;"></i>
        </template> -->
        <template  slot="order" slot-scope="scope"> 
            <el-tag size="mini" v-if="scope.row.catLevel==1">一级
            </el-tag>
            <el-tag type="success" v-else-if="scope.row.catLevel==2">二级</el-tag>
            <el-tag type="warning" v-else>三级</el-tag>
        </template>
         <template  slot="opt"   > 
           <!-- slot-scope="scope" -->
              <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        
        </template>
    
      </tree-table>

      <!-- 分页？ -->
       <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="1"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>

    <!-- 添加分类的对话框 -->
    <el-dialog
  title="添加分类" :visible.sync="addCateDialogVisible"  @close="addCateDialogClosed" width="50%">
  <!-- 添加分类的表单 -->

<el-form ref="addCateFormRef" :model="addCateForm" :rules="addCateFormRules"  label-width="100px">
  <el-form-item label="分类名称"  prop="catName">
    <el-input v-model="addCateForm.catName"></el-input>
  </el-form-item>
 <el-form-item label="父级分类">
    <el-cascader props.expandTrigger="hover" :options="parentCateList" :props="cascaderProps"
    v-model="selectedKeys" @change="parentCateChanged" clearable >
    </el-cascader>
 </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="addCateDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addCate">确 定</el-button>
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
        return{
            queryInfo:{
                type:3,
                pagenum:1,
                pagesize:1
            },
            addCateDialogVisible:false,
            addCateForm:{
                catName:"",
                catPid:0,
                catLevel:1
            },
            addCateFormRules:{
                catName:[
                   { required:true,message:"请输入分类名称",trigger:'blur'}
                ]
            },
             aaa:{
         curPage:1,
       pageSize:1,
      },
      parentCateList: [],
      selectedKeys:[],
      cascaderProps:{
          value:'catId',
          label:'catName',
          children:'children',
          checkStrictly: true
      },
            
            catelist:[],
            total:0,
            columns:[
                {label:'分类名称',prop:'catName'},
                // {label:'是否有效',type:'template',template:'isok'},
                 {label:'排序',type:'template',template:'order'},{label:'操作',type:'template',template:'opt'}

            ]

        }
    },
    created(){
        this.getCateList()
    },
    methods:{
        async getCateList(){
            const {data:res}=await this.$http.get("categories",{
        params:this.aaa
      })
    //  console.log(res)
     console.log(res)
     this.catelist=res.records
     this.total = res.total
        }
        ,
        showAddCateDialog(){
             
            this.addCateDialogVisible=true
            this.getParentCateList()

        },
       async getParentCateList(){
           const {data:res}=await this.$http.get('categories')
        //    if(res.meta.status !==200){
        //        return this.$message.error('获取父级分类数据失败！')
        //    }
           console.log(res.records)
           this.parentCateList =res.records


        },
        handleSizeChange(newsize){
this.queryInfo.pagesize=newsize
      this.aaa.pageSize=newsize
      this.getCateList()
        },

        handleCurrentChange(newPage){
             this.queryInfo.pagenum = newPage
       this.aaa.curPage=newPage
       this.getCateList()
        },
        parentCateChanged(){
            console.log(this.parentCateList)
            console.log('selectedKeys'+this.selectedKeys)
            this.addCateForm.catPid=this.selectedKeys[this.selectedKeys.length-1]
            this.addCateForm.catLevel=this.selectedKeys.length
        },
        addCate(){
            // console.log(this.addCateForm)
            
           this.$refs.addCateFormRef.validate(async valid=>{
               if(!valid) return
               const {data:res}= await this.$http.post("categories",this.addCateForm)
               console.log(this.addCateForm)
            //    if(res.meta.status!==201){
            //        return this.$message.error("添加分类失败")
            //    }
               this.$message.success("添加分类成功")
               this.getCateList()
               this.addCateDialogVisible=false

           })
        },
         addCateDialogClosed() {
      this.$refs.addCateFormRef.resetFields()
      this.selectedKeys = []
      this.addCateForm.catLevel = 1
      this.addCateForm.catPid = 0
    }


    }
    
}
</script>