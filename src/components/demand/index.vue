<template>
  <div class="demand zc_auto">
    <header>
      <div class="demandA-select">
        <el-select v-model="statesId" placeholder="请选择">
            <el-option
              v-for="item in statesArr"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </div>
      <div class="homeCCLT-title">
        <div>
          <el-date-picker
            v-model="datePicker"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>
      <div class="taskH-right">
        <div class="demandB-select">
          <el-input 
            v-model="projectName" 
            placeholder="请输入项目名称"
            prefix-icon="el-icon-search">
          </el-input>
        </div>
        <div class="taskHR-btn-search" @click='searchL("s")'>搜索</div>
        <div class="taskHR-btn" @click='exportE'>导出</div>
        <div class="homeCTR-content" v-if='user=="USER_PUBLISH"'>
          <div></div>
          <div @click='myCommit'>
            <span></span>
            <p>我要提需求</p>
          </div>
        </div>
      </div>
    </header>
    <div class="task-table">
      <div class="animated lightSpeedIn">
        <div class="notReceived">
          <p v-for='i in tableArr.title'>{{i}}</p>
        </div>
        <div class="taskT-main">
          <div v-for='i in tableArr.content' class="taskTM-box" @click='hostDetail(i)'>
            <p>{{i.projectClass}}</p>
            <p>{{i.projectName}}</p>
            <p>
              <span v-show='i.projectStatus=="releasing"'>发布中</span>
              <span v-show='i.projectStatus=="newbuilt"'>新建</span>
              <span v-show='i.projectStatus=="confirming"'>确认中</span>
              <span v-show='i.projectStatus=="working"'>已立项</span>
              <span v-show='i.projectStatus=="done"'>已完成</span>
              <span v-show='i.projectStatus=="cancel"'>取消</span>
            </p>
            <p>{{i.var1}}</p>
            <p>{{i.projectCoin}}</p> 
            <p>{{i.employeName}}</p>
            <p>{{i.progressNew}}%</p>
            <p>{{i.createtime}}</p>
            <p v-if='i.projectStatus=="confirming"||i.projectStatus=="newbuilt"' @click.stop='addDetaild(i)'>
              <img src="../../assets/img/bianji.png" alt="">
            </p>
            <p v-else></p>
          </div>
        </div>
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
  </div>
</template>

<script>
export default {
	created(){
    this.searchL();
	},
  data () {
    return {
      user:sessionStorage.getItem('user'),
      page:{
        current:1,
        pageSize:10,
        total:0
      },
      datePicker:[],//时间选项
      statesId:'',
      tableArr:{
        title:['分类','项目名称','状态','发起人','赏金','领取人','进度','申请时间','编辑'],
        content:[]
      },
      statesArr:[//下拉框选项
        {
          value: '',
          label: '全部'
        },
        {
          value: 'cancel',
          label: '取消'
        },
        {
          value: 'newbuilt',
          label: '新建'
        },
        {
          value: 'releasing',
          label: '发布中'
        },
        {
          value: 'confirming',
          label: '确认中'
        },
        {
          value: 'working',
          label: '工作中'
        },
        {
          value: 'done',
          label: '已完成'
        }
      ],
      projectName:''
    }
  },
  methods:{
    addDetaild(i){
      this.$router.push({'path':'home/submission',query:{'id':i.projectId}});
    },
    //我的需求提交
    myCommit(){
      this.$router.push({path:'/home/submission'})
    },
    //详情
    hostDetail(i){
      this.$router.push({'path':'detail',query:{'id':i.projectId}});
    },
    searchL(_d){
      if(_d=='s'){
        this.page.current=1;
      }
      this.tableArr.content=[];
      let url,data;
      if(this.user!='USER_PUBLISH'){
        url='/project/findEmployeeAllProject'
      }else if(this.user=='USER_PUBLISH'){
        url='/project/findEmployerAllProject'
      }
      if(this.datePicker!=null){
        data={
          sort:'createtime',
          order:'desc',
          projectName:this.projectName,
          startTime:this.datePicker[0],
          endTime:this.datePicker[1],
          projectStatus:this.statesId,
          pageSize:this.page.pageSize,
          pageNum:this.page.current
        }
      }else{
        data={
          sort:'createtime',
          order:'desc',
          projectName:this.projectName,
          projectStatus:this.statesId,
          pageSize:this.page.pageSize,
          pageNum:this.page.current
        }
      }
      this.$CPOST(url,data,(res)=>{
        let data=res.data;
        this.tableArr.content=data.list;
        this.page.total=data.total;
      })
    },
    //导出
    exportE(){
      let url,data;
      if(this.user=='USER_CLAIM'){
        url='/noAuth/exportEmployeeAllProject'
      }else if(this.user=='USER_PUBLISH'){
        url='/noAuth/exportEmployerAllProject'
      }
      if(this.datePicker!=null&&this.datePicker.length>0){
        data='?projectStatus='+this.statesId+'&startTime='+this.datePicker[0]+'&endTime='+this.datePicker[1]+'&projectName='+this.projectName+'&userId='+'1';
      }else{
        data='?projectStatus='+this.statesId+'&projectName='+this.projectName+'&userId='+'1';
      }
      let zcl=this.$http+url+data;
      console.log(zcl)
      window.location.href=zcl;
    },
    //下一页
    nextPage(_d){
      this.page.current=_d;
      this.searchL();
    },
  }
}
</script>

<style scoped>
   .demandA-select .el-select{
    width: 100px;
    margin-right: 20px;
  } 
  .demandB-select{
    margin: 0 20px;
  }
  .demand{
    padding: 57px 0 70px 0;
  }
  .demand header{
    position: relative;
    display: flex;
    align-items: center;
  }
  .homeCCLT-title{
    display: flex;
    justify-content: space-between;
    height: 91px;
    line-height: 91px;
    text-align: center;
  }
  .taskH-right{
    display: flex;
    margin-right: 0px;
  }
  .taskHR-btn{
    cursor: pointer;
    width: 78px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #F7FAFC;
    color: #0091FF;
    border-radius:4px;
    border:1px solid rgba(0,145,255,1);
    background:rgba(255,255,255,1);
  }
  .homeCTR-content{
    width: 202px;
    height: 98px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 0px;
    top: -30px;
  }
  .homeCTR-content div:first-child{
    margin: auto;
    width: 86px;
    height: 98px;
    background: url(../../assets/img/katong.png) no-repeat center;
    background-size: 100%;
  }
  .taskHR-btn-search{
    margin-right: 20px;
    cursor: pointer;
    width: 78px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #0091FF;
    color: #fff;
    border-radius:4px;
    border:1px solid rgba(0,145,255,1);
  }
  .taskHR-btn:hover{
    background: #EAEAEA;
  }
  .taskHR-btn:active{
    background: #D9D9D9;
   }
  .taskHR-btn-search:hover,.homeCTR-content div:last-child:hover{
    background: #4FB3FF;
  }
  .taskHR-btn-search:active,.homeCTR-content div:last-child:active{
    background: #0F7CCF;
   }
  
  .homeCTR-content div:last-child{
    position: absolute;
    top: 54px;
    cursor: pointer;
    display: flex;
    width:202px;
    height:44px;
    background:rgba(0,145,255,1);
    box-shadow:0px 6px 25px -8px rgba(8,113,193,0.5);
    border-radius:6px;
    justify-content: center;
    align-items: center;
  }
  .homeCTR-content span{
    width: 23px;
    height: 20px;
    display: inline-block;
    background: url(../../assets/img/send.png) no-repeat center;
    background-size: 100%;
    margin-right: 16px;
  }
  .homeCTR-content div:last-child p{
    font-size: 18px;
    color: #fff;
  }
  .notReceived{
    display: flex;
    background:#fff;
    height: 66px;
    font-size: 14px;
    color: #555;
    align-items: center;
    justify-content: space-between;
    border-bottom: solid 4px rgba(247,250,252,1);
  }
  .notReceived p{
    text-align: center;
    border-left: solid 1px #D9D9D9;
    border-right: solid 1px #D9D9D9;
  }
  .notReceived p:first-child{
    border-left: none;
  }
  .notReceived p:last-child{
    border-right: none;
  }
  .notReceived p:nth-child(1),.notReceived p:nth-child(3),.notReceived p:nth-child(4),.notReceived p:nth-child(5),.notReceived p:nth-child(6),.notReceived p:nth-child(7),.taskTM-box p:nth-child(1),.taskTM-box p:nth-child(3),.taskTM-box p:nth-child(4),.taskTM-box p:nth-child(5),.taskTM-box p:nth-child(6),.taskTM-box p:nth-child(7){
    width: 102px;
  }
  .notReceived p:nth-child(2),.taskTM-box p:nth-child(2){
    width: 384px;
  }
  .notReceived p:nth-child(8),.taskTM-box p:nth-child(8){
    width: 126px;
  }
  .notReceived p:nth-child(9),.taskTM-box p:nth-child(9){
    width: 78px;
  }
  .taskTM-box p:nth-child(9) img{
    display: inline-block;
    width: 14px;
    height: 14px;
    cursor: pointer;
  }
  .taskT-main{
    background: #ffffff;
  }
  .taskTM-box{
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: solid 1px rgba(247,250,252,1);
    cursor:pointer;
  }
  .taskTM-box:hover{
    background:rgba(250,253,255,1);
  }
  .taskTM-box p{
    text-align: center;
    font-size:16px;
  }
</style>
