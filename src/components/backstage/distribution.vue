<template>
  <div class="distribution">
    <div class="distribution-top">
        <div class="distribution-top-btn" v-show='checkArr.length<=0'>分配视联币</div>
        <div class="distribution-top-btns" @click='dBution(4)' v-show='checkArr.length>0'>分配视联币</div>
        <div class="distribution-top-search">
            <el-select v-model="userList.name" placeholder="请选择" style='margin-right: 10px;width: 300px'>
                <el-option
                  v-for="item in userList.arr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            <el-input
                  style='width: 700px;'
                  placeholder="请输入用户名"
                  prefix-icon="el-icon-search"
                  v-model='userName'>
             </el-input>
             <el-button type='primary' style='margin-left: 10px;' @click='searchL("s")'>搜索</el-button>
        </div>
    </div>
    <div class="distribution-header">
        <p>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox>
        </p>
        <p v-for='i in titleArr'>{{i}}</p>
    </div>
    <div class="distribution-main">
        <div v-for='i in tableArr' class="distributionM-box">
            <p>
                <!-- <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange"> -->
                    <el-checkbox v-model='i.check'  @change="isCheckAll"></el-checkbox>
                <!-- </el-checkbox-group> -->
            </p>
            <p>{{i.userName}}</p>
            <p>{{i.userNumber}}</p>
            <p>{{i.positionName}}</p>
            <p>{{i.var2}}</p>
            <p>{{i.coin}}</p>
        </div>
    </div>
    <div class="zc_page" v-show='page.total>0'>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size='page.pageSize'
        :current-page='page.current'
        @current-change='nextPage'
        :total='this.page.total'>
      </el-pagination>
    </div>
    <Prompt v-if='prompt.isPrompt' @close='close' :prompt='prompt'></Prompt>
  </div>
</template>

<script>
import Prompt from '../common/prompt';
export default {
    components:{
        Prompt
    },
  created(){
    this.currentD();
    this.searchL();
  },
  data () {
    return {
        userList:{
            arr:[],
            name:null
        },
        userName:'',
        prompt:{//弹框
            isPrompt:false,
            status:'',//
            coin:'',//总金币
            userAll:[]
          },
        page:{
            current:1,
            pageSize:10,
            total:0
        },
        checkAll: false,
        checkArr:[],
        isIndeterminate: true,
        titleArr:['用户名','工号','职位','角色','视联币'],
        tableArr:[],
    }
  },
  methods:{
    currentD(){
        this.$CPOST('/ctbank/findCtBankAccount',{

        },(res)=>{
            this.prompt.coin=res.data.remaineSum;
        })
        //角色
        this.$CPOST('/userInfo/findRoles',{

        },(res)=>{
            let data=res.data;
            for(let i=0;i<data.length;i++){
                this.userList.arr.push({
                    value:data[i].roleId,
                    label:data[i].var1
                })
            }
        })
    },
    searchL(val){
        this.checkArr=[];
        this.checkAll=false;
        this.isIndeterminate=true;
        const loading = this.$loading(this.$store.state.loading);
          if(val=='s'){
            this.page.current=1;
          }
        this.$CPOST('/userCoin/findAllUserCoin',{
            pageNum:this.page.current,
            pageSize:this.page.pageSize,
            sort:'coin',
            order:'desc',
            userName:this.userName,
            var1:this.userList.name
        },(res)=>{
            loading.close();
            let data=res.data.list;
            this.tableArr=data;
            this.page.total=res.data.total;
        })
    },
    //分配视联币
    dBution(id){
        this.prompt.userAll=[];
        this.prompt.isPrompt=true;
        this.prompt.status=id;
        for(let i=0;i<this.checkArr.length;i++){
            this.prompt.userAll.push(this.checkArr[i].userId);
        }
    },
    //弹窗关闭
    close(){
      this.page.current=1;
      this.prompt.isPrompt=false;
      this.currentD();
      this.searchL();
    },
    //下一页
    nextPage(_d){
      this.checkArr=[];
      this.page.current=_d;
      this.searchL();
    },
    handleCheckAllChange(val) {
        this.checkArr=[];
        let len=this.tableArr.length;
        for(let i=0;i<len;i++){
            this.tableArr[i].check=val;
            if(this.tableArr[i].check==true){
                // this.checkArr.push(this.tableArr[i].check);
                this.checkArr.push(this.tableArr[i]);
            }
        }
        if(!val){
            this.isIndeterminate=false;
            this.checkAll=false;
        }else if(val){
            this.checkAll=true;
            this.isIndeterminate=false;
        }
    },
    isCheckAll(val){
        this.checkArr=[];
        let len=this.tableArr.length;
        for(let i=0;i<len;i++){
            if(this.tableArr[i].check==true){
                // this.checkArr.push(this.tableArr[i].check);
                this.checkArr.push(this.tableArr[i]);
            }
        }
        if(this.checkArr.length<=0){
            this.isIndeterminate=false;
            this.checkAll=false;
        }else if(this.checkArr.length==len){
            this.checkAll=true;
            this.isIndeterminate=false;
        }else{
            this.checkAll=false;
            this.isIndeterminate=true;
        }
    }
  }
}
</script>


<style scoped>
    .distribution-main{
        background: #fff;
        margin-top: 4px;
    }
    .distribution-header p:nth-child(1),.distributionM-box p:nth-child(1){
        flex: 1;
    }
    .distribution-header p:nth-child(2),.distributionM-box p:nth-child(2){
        width: 126px;
    }
    .distribution-header p:nth-child(3),.distributionM-box p:nth-child(3){
        width: 76px;
    }
    .distribution-header p:nth-child(4),.distributionM-box p:nth-child(4){
        width: 228px;
    }
    .distribution-header p:nth-child(5),.distributionM-box p:nth-child(5){
        width: 178px;
    }
    .distribution-header p:nth-child(6),.distributionM-box p:nth-child(6){
        width: 208px;
    }
    .distribution-header p:first-child,.distributionM-box p:first-child{
        border-left: none;
    }
    .distribution-header p:last-child,.distributionM-box p:last-child{
        border-right: none;
    }
    .distributionM-box p{
        display: flex;
        align-items: center;
        justify-content: center;
        font-size:16px;
        color: #333;
    }
    .distribution-header p{
        border-right: solid 1px #D9D9D9;
        border-left: solid 1px #D9D9D9;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size:14px;
        color: #555;
    }
    .distributionM-box{
        display: flex;
        height: 60px;
        align-items: center;
        border-bottom: solid 1px rgba(247,250,252,1);
    }
    .distribution-header{
        height: 66px;
        margin-top: 30px;
        display: flex;
        align-items: center;
        background: #fff;
    }
    .distribution-top{
        display: flex;
        align-items: center;
    }
    .distribution-top-btns{
        cursor: pointer;
        width: 104px;
        height: 44px;
        background: #409eff;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius:2px;
    }
    .distribution-top-btn{
        cursor: pointer;
        width: 104px;
        height: 44px;
        background: #CACACA;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius:2px;
    }
    .distribution-top-search{
        width: 435px;
        margin-left: 347px;
        display: flex;
        justify-content: flex-end;
    }
</style>
