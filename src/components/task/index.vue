<template>
  <div class="task zc_auto">
    <header>
      <div class="homeCCLT-title">
        <div v-for='(i,idx) in tabArr'
             @click='tabCk(idx,i)'>
             <p :class="tabIdx==idx?'homeCCLT-title-acvtive':''">
                <span :class="tabIdx==idx?'homeCCLT-titleSpan-active':''"></span>
                {{i}}
             </p>
        </div>
      </div>
      <div :class="user=='USER_PUBLISH'?'taskH-right':'taskH-rights'">
        
        <el-upload
           class="setting-upload"
           style='margin-right: 0'
           :http-request='httpRequest'
           action=""
           :show-file-list="false"
           accept=".xlsx,.xls"
           :before-upload="fileBefore"
           :on-success='fileSuccess'>
           <el-button type='primary' style='width: 78px;height: 44px;margin-right: 10px;border-radius: 2px;'>导入</el-button>
         </el-upload>
         <div class="taskHR-btn"  @click='exportM()' style="margin-right: 10px;">导入模板</div>
         <div class="taskHR-btn"  @click='exportE()'>导出</div>
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
      <!-- 未领取的任务 -->
      <div v-show='tabIdx==0' class="animated lightSpeedIn">
        <div class="notReceived">
          <p v-for='i in notReceived.title'>{{i}}</p>
        </div>
        <div class="taskT-main">
          <div v-for='i in notReceived.content' class="taskTM-box" @click='hostDetail(i)'>
            <p>{{i.projectType}}</p>
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
            <p>
              <span v-show='i.projectPriority=="1005"'>超高</span>
              <span v-show='i.projectPriority=="1000"'>高</span>
              <span v-show='i.projectPriority=="1001"'>中高</span>
              <span v-show='i.projectPriority=="1002"'>中</span>
              <span v-show='i.projectPriority=="1003"'>中低</span>
              <span v-show='i.projectPriority=="1004"'>低</span>
            </p>
          </div>
        </div>
      </div>
      <!-- 已领取的任务 -->
      <div v-show='tabIdx==1' class="animated lightSpeedIn">
        <div class="received">
          <p v-for='i in received.title'>{{i}}</p>
        </div>
        <div class="taskT-main">
          <div v-for='i in notReceived.content' class="received-box" @click='hostDetail(i)'>
            <p>{{i.projectType}}</p>
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
          </div>
        </div>
      </div>
      <!-- 已立项的任务 -->
      <div v-show='tabIdx==2' class="animated lightSpeedIn">
        <div class="received">
          <p v-for='i in received.title'>{{i}}</p>
        </div>
        <div class="taskT-main">
          <div v-for='i in notReceived.content' class="received-box" @click='hostDetail(i)'>
            <p>{{i.projectType}}</p>
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
          </div>
        </div>
      </div>
      <!-- 已完成的任务 -->
      <div v-show='tabIdx==3' class="animated lightSpeedIn">
        <div class="received">
          <p v-for='i in received.title'>{{i}}</p>
        </div>
        <div class="taskT-main">
          <div v-for='i in notReceived.content' class="received-box" @click='hostDetail(i)'>
            <p>{{i.projectType}}</p>
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
          </div>
        </div>
      </div>
      <!-- 全部 -->
      <div v-show='tabIdx==4' class="animated lightSpeedIn">
        <div class="received">
          <p v-for='i in received.title'>{{i}}</p>
        </div>
        <div class="taskT-main">
          <div v-for='i in notReceived.content' class="received-box" @click='hostDetail(i)'>
            <p>{{i.projectType}}</p>
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
          </div>
        </div>
      </div>
    </div>
    <!-- v-show='page.total>0' -->
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
    this.judge();
	},
  data () {
    return {
      fileUpload:{   //附件上传
        file:null
      },
      statusName:'',
      user:sessionStorage.getItem('user'),
      page:{
        current:1,
        pageSize:10,
        total:0
      },
      tabIdx:0,
      tabArr:['未领取任务','已领取任务','已立项任务','已完成任务','全部'],
      notReceived:{//未领取
        title:['分类','项目名称','状态','发起人','赏金','优先级'],
        content:['试点','广元市昭化区雪亮工程','新建','超哥哥','100000']
      },
      received:{//已领取
        title:['分类','项目名称','状态','发起人','赏金','领取人','进度'],
        content:['试点','广元市昭化区雪亮工程','确认中','超哥哥','100000','赵老板','100%']
      },
      approval:[],//已立项
      complete:[],//已完成
      whole:[],//全部
    }
  },
  methods:{
    //上传相关
    httpRequest(){
      let fd = new FormData();
      fd.append('file', this.fileUpload.file)
      const loading = this.$loading(this.$store.state.loading);
      this.$CZC('/api/visc/noAuth/importProject',fd,(res)=>{
        loading.close();
        if(res.code==200){
          this.judge();
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    fileBefore (file) {
        this.fileUpload.file=file;
      },
      fileSuccess(response, file, fileList){
        if(response.code===200){
        }else{
        }
      },
    //我的需求提交
    myCommit(){
      this.$router.push({path:'/home/submission'})
    },
    //详情
    hostDetail(i){
      this.$router.push({'path':'detail',query:{'id':i.projectId}});
    },
    //导出
    exportE(){
      let url=this.$http+'/noAuth/exportExcelAllProject?projectStatus='+this.statusName;
      window.location.href=url;
    },
    exportM(){
      let url='http://58.30.9.142:48086/files/2019/08/05/20190805111338_导入模板.xls';
      window.location.href=url;
    },
    switchCommon(_d){
      switch(_d){
        case 0: case '未领取任务':
          this.statusName='newbuilt';
          break;
        case 1: case '已领取任务':
          this.statusName='confirming';
          break;
        case 2: case '已立项任务':
          this.statusName='working';
          break;
        case 3: case '已完成任务':
          this.statusName='done';
          break;
        case 4: case '全部':
          this.statusName='';
          break;
      }
    },
    judge(){
      let status=this.$route.query.id;
      if(status!=undefined){
        this.tabIdx=Number(status);
        /*switch(this.tabIdx){
          case 0:
            this.currentD('newbuilt');
            break;
          case 1:
            this.currentD('confirming');
            break;
          case 2:
            this.currentD('working');
            break;
          case 3:
            this.currentD('done');
            break;
        }*/
        this.switchCommon(this.tabIdx);
        this.currentD(this.statusName);
      }else{
        this.statusName='newbuilt';
        this.currentD('newbuilt');
      }
    },
    currentD(_d){
      const loading = this.$loading(this.$store.state.loading);
      this.notReceived.content=[];
      this.$CPOST('/project/findAllProject',{
        projectStatus:_d,
        pageNum:this.page.current,
        pageSize:this.page.pageSize
      },(res)=>{
        loading.close();
        let data=res.data;
        this.notReceived.content=data.list;
        this.page.total=data.total;
      })
    },
    //tab切换处理函数
    tabCk(idx,_d){
      this.tabIdx=idx;
      this.page.current=1;
      /*switch(_d){
        case '未领取任务':
          this.currentD('newbuilt');
          break;
        case '已领取任务':
          this.currentD('confirming');
          break;
        case '已立项任务':
          this.currentD('working');
          break;
        case '已完成任务':
          this.currentD('done');
          break;
        case '全部':
          this.currentD('');
          break;
      }*/
      this.switchCommon(_d);
      this.currentD(this.statusName)
    },
    //下一页
    nextPage(_d){
      this.page.current=_d;
      /*switch(this.tabIdx){
          case 0:
            this.statusName='newbuilt';
            break;
          case 1:
            this.statusName='confirming';
            break;
          case 2:
            this.statusName='working';
            break;
          case 3:
            this.statusName='done';
            break;
          case 4:
            this.statusName='';
            break;
      };*/
      this.switchCommon(this.tabIdx);
      this.currentD(this.statusName);
    },
  }
}
</script>


<style scoped>
  .task{
    padding: 57px 0 70px 0;
  }
  .task header{
    position: relative;
    display: flex;
    align-items: center;
  }
  .homeCCLT-title{
    display: flex;
    justify-content: space-between;
    width: 720px;
    height: 91px;
    line-height: 91px;
    text-align: center;
  }
  .homeCCLT-title div{
    width: 168px;
    font-size: 18px;
    color: #555555;
    cursor: pointer;
  }
  .homeCCLT-title div p{
    position: relative;
    display: flex;
    justify-content: center;
  }
  .homeCCLT-title-acvtive{
    color: #000000;
    font-size: 20px !important;
    font-weight:600;
  }
  .homeCCLT-titleSpan-active{
    font-weight:600;
    position: absolute;
    display: inline-block;
    width: 54px;
    height: 4px;
    background: #0091FF;
    top: 75px;
  }
  .taskHR-btn{
    cursor: pointer;
    width: 78px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background: #F7FAFC;
    color: #0091FF;
    border-radius:2px;
    border:1px solid rgba(0,145,255,1);
    background:rgba(255,255,255,1);
  }
  .taskH-right{
    display: flex;
    flex: 1;
  }
  .taskH-rights{
    display: flex;
    flex: 1;
    justify-content: flex-end;
  }
  .homeCTR-content{
    width: 202px;
    height: 98px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: -30px;
    right:0;
  }
  .homeCTR-content div:first-child{
    margin: auto;
    width: 86px;
    height: 98px;
    background: url(../../assets/img/katong.png) no-repeat center;
    background-size: 100%;
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
  .notReceived,.received{
    display: flex;
    background:#FAFDFF;
    height: 66px;
    font-size: 14px;
    color: #555;
    align-items: center;
    justify-content: space-between;
    border-bottom: solid 1px rgba(247,250,252,1);
  }
  .notReceived p,.received p{
    text-align: center;
    border-left: solid 1px #D9D9D9;
    border-right: solid 1px #D9D9D9;
  }
  .notReceived p:first-child,.received p:first-child{
    border-left: none;
  }
  .notReceived p:last-child,.received p:last-child{
    border-right: none;
  }
  /*已领取*/
  .received p:nth-child(1),.received p:nth-child(7),.received-box p:nth-child(1),.received-box p:nth-child(7){
    width: 102px;
  }
  .received p:nth-child(2),.received-box p:nth-child(2){
    width: 384px;
  }
  .received p:nth-child(3),.received p:nth-child(5),.received-box p:nth-child(3),.received-box p:nth-child(5){
    width: 126px;
  }
  /*未领取*/
  .notReceived p:nth-child(1),.notReceived p:nth-child(3),.taskTM-box p:nth-child(1),.taskTM-box p:nth-child(3),.received p:nth-child(4),.received p:nth-child(6),.received-box p:nth-child(4),.received-box p:nth-child(6){
    width: 180px;
  }
  .notReceived p:nth-child(5),.taskTM-box p:nth-child(5){
    width: 100px;
  }
  .notReceived p:nth-child(6),.taskTM-box p:nth-child(6){
    width: 80px;
  }
  .notReceived p:nth-child(2),.taskTM-box p:nth-child(2){
    width: 432px;
  }
  .notReceived p:nth-child(4),.taskTM-box p:nth-child(4){
    width: 228px;
  }
  .taskT-main{
    background: #ffffff;
  }
  .taskTM-box,.received-box{
    cursor:pointer;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: solid 1px rgba(247,250,252,1);
    color: #333;
  }
  .taskTM-box:hover,.received-box:hover{
    background:rgba(250,253,255,1);
  }
  .taskTM-box p,.received-box p{
    text-align: center;
    font-size:16px;
  }
</style>
