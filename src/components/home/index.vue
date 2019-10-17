<template>
  <div class="home_box">
    <div class="home">
      <header>
      </header>
      <div class="home-content" v-show="Number(myVisc.userCoinByMonth).toLocaleString()!='NaN'">
        <div class="homeC-top">
          <h2><span></span>我的视联币</h2>
          <!-- 需求方 -->
          <div class="homeCT-main" v-show="user=='USER_PUBLISH'||user=='MONITOR_TP'||user=='MONITOR_REGULATOR'">
            <div class="homeCT-left">
              <div class="echart">
                <div id="myChart" :style="{width: '800px', height: '800px',fontSize:'12px'}"></div>
              </div>
              <div class="homeCTL-right">
                <div>
                  <div style="display: flex;">
                    <span></span>
                    <p>本月使用</p>
                  </div>
                  <!-- <span>{{Number(myVisc.userCoinByMonth).toLocaleString()}}</span> -->
                  <count-to :startVal='0' :endVal='Number(myVisc.userCoinByMonth)' :duration=2000></count-to>
                </div>
                <div>
                  <p>总支出</p>
                  <!-- <span>{{Number(myVisc.userCoinByTotal).toLocaleString()}}</span> -->
                  <count-to :startVal='0' :endVal='Number(myVisc.userCoinByTotal)' :duration=2000></count-to>
                </div>
              </div>
            </div>
            <div class="homeCT-center">
               <div>
                <div style="display: flex;align-items: center;">
                  <span></span>
                  <p>视联币余额</p>
                </div>
                <!-- <span>{{Number(myVisc.yue).toLocaleString()}}</span> -->
                <count-to :startVal='0' :endVal='Number(myVisc.yue)' :duration=2000></count-to>
              </div>
              <div v-show='myVisc.yue!=0'>
                <p>视联币余额{{parseInt(myVisc.userCoinByMonth/myVisc.yue*100)}}%</p>
                <el-progress 
                  v-if='myVisc.userCoinByMonth'
                  :text-inside="true" 
                  :stroke-width="6" 
                  :percentage="myVisc.userCoinByMonth/myVisc.yue*100" status="warning" 
                  :show-text='false'
                  :color="customColor"></el-progress>
              </div>
            </div>
            <div class="homeCT-right">
              <div class="homeCTR-content" v-if="user=='USER_PUBLISH'">
                <div></div>
                <div @click='myCommit'>
                  <span></span>
                  <p>我要提需求</p>
                </div>
              </div>
              <div class="homeCTR-content" v-else>
                <div></div>
                <div>
                  <span></span>
                  <p>我要提需求</p>
                </div>
              </div>
            </div>
          </div>
          <!-- 研发首页 -->
          <div class="homeCT-dev" v-show="user=='USER_CLAIM'">
            <div class="homeCTD-left zc-shadow">
              <div class="homeCTL-right">
                <div>
                  <div style="display: flex;">
                    <span></span>
                    <p>本月应收</p>
                  </div>
                  <count-to :startVal='0' :endVal='Number(myVisc.userCoinByMonth)' :duration=2000></count-to>
                </div>
                <div style="display: flex;align-items: center;">
                  <div class="homeCTDLR-flex">
                    <p>累计收入</p>
                    <count-to :startVal='0' :endVal='Number(myVisc.userCoinByTotal)' :duration=2000></count-to>
                  </div>
                  <div class="homeCTDLR-flex">
                    <p><i></i>已花费视联币</p>
                    <count-to :startVal='0' :endVal='0' :duration=2000></count-to>
                  </div>
                </div>
              </div>
              <div class="echart">
                <div id="devChart" :style="{width: '800px', height: '800px',fontSize:'12px'}"></div>
              </div>
            </div>
            <div class="homeCTD-right homeCT-center">
               <div>
                  <div style="display: flex;align-items: center;">
                    <span></span>
                    <p>余额</p>
                  </div>
                  <count-to :startVal='0' :endVal='Number(myVisc.yue)' :duration=2000 v-if='myVisc.yue'></count-to>
                </div>
                <div>
                  <!-- <p>应收视联币70%</p>
                  <el-progress :text-inside="true" :stroke-width="6" :percentage="80" status="warning" :show-text='false' :color="customColor"></el-progress> -->
                </div>
            </div>
          </div>
        </div>
        <div class="homeC-center">
          <div class="homeCC-left">
            <div class="homeCCL-top">
              <h2 style="color: #555555" v-show="user!='USER_CLAIM'"><span></span>我的需求</h2>
              <h2 style="color: #555555" v-show="user=='USER_CLAIM'"><span></span>我的任务</h2>
              <div style="box-shadow:0px 4px 25px -8px rgba(8,113,193,0.3);">
                <div class="homeCCLT-title">
                  <div v-for='(i,idx) in myDemand.tabArr'
                       v-show="user!='USER_CLAIM'"
                       @click='tabCk(idx,"myDemand",i)'>
                       <p :class="myDemand.tabIdx==idx?'homeCCLT-title-acvtive':''">
                          <span :class="myDemand.tabIdx==idx?'homeCCLT-titleSpan-active':''"></span>
                          {{i}}
                       </p>
                  </div>
                  <div v-for='(i,idx) in myDemand.tabsArr'
                       v-show="user=='USER_CLAIM'"
                       @click='tabCk(idx,"myDemand",i)'>
                       <p :class="myDemand.tabIdx==idx?'homeCCLT-title-acvtive':''">
                          <span :class="myDemand.tabIdx==idx?'homeCCLT-titleSpan-active':''"></span>
                          {{i}}
                       </p>
                  </div>
                </div>
                <div class='homeCCLT-content'>
                    <div class="homeCCLTC-title">
                      <p v-for='i in myDemand.notReceived.title'>{{i}}</p>
                    </div>
                    <div class="homeCCLTC-table" style="overflow: hidden;" v-if='myDemand.notReceived.tableArr.length>=0'>
                      <div v-for='i in myDemand.notReceived.tableArr' class="animated bounceInRight" v-show='myDemand.tabIdx==0' @click='hostDetail(i)'>
                        <p>{{i.projectName}}</p>
                        <p>{{i.var1}}</p>
                        <p>{{Number(i.projectCoin).toLocaleString()}}</p>
                        <p>
                          <span v-show="user=='USER_PUBLISH'">--------</span>
                          <span v-show="user=='USER_CLAIM'">{{i.employeName}}</span>
                        </p>
                        <p>{{i.progressNew}}%</p>
                      </div>
                      <div v-for='i in myDemand.notReceived.tableArr' class="animated bounceInRight" v-show='myDemand.tabIdx==1' @click='hostDetail(i)'>
                        <p>{{i.projectName}}</p>
                        <p>{{i.var1}}</p>
                        <p>{{Number(i.projectCoin).toLocaleString()}}</p>
                        <p>{{i.employeName}}</p>
                        <p>{{i.progressNew}}%</p>
                      </div>
                      <div v-for='i in myDemand.notReceived.tableArr' class="animated bounceInRight" v-show='myDemand.tabIdx==2' @click='hostDetail(i)'>
                        <p>{{i.projectName}}</p>
                        <p>{{i.var1}}</p>
                        <p>{{Number(i.projectCoin).toLocaleString()}}</p>
                        <p>{{i.employeName}}</p>
                        <p>{{i.progressNew}}%</p>
                      </div>
                      <div v-for='i in myDemand.notReceived.tableArr' class="animated bounceInRight" v-show='myDemand.tabIdx==3' @click='hostDetail(i)'>
                        <p>{{i.projectName}}</p>
                        <p>{{i.var1}}</p>
                        <p>{{Number(i.projectCoin).toLocaleString()}}</p>
                        <p>{{i.employeName}}</p>
                        <p>{{i.progressNew}}%</p>
                      </div>
                    </div>
                    <div class="homeCCLTC-more" @click='lookMore("myDemand")'>
                      查看更多 >
                    </div>
                </div>
              </div>
            </div>
            <div class="homeCCL-bottom homeCCL-top">
              <h2 style="color: #555555"><span></span>需求池</h2>
              <div class="zc-shadow">
                <div class="homeCCLT-title">
                  <div v-for='(i,idx) in demandPool.tabArr'
                       @click='tabCk(idx,"demandPool",i)'>
                       <p :class="demandPool.tabIdx==idx?'homeCCLT-title-acvtive':''">
                          <span :class="demandPool.tabIdx==idx?'homeCCLT-titleSpan-active':''"></span>
                          {{i}}
                       </p>
                  </div>
                </div>
                <div class='homeCCLT-content'>
                    <div class="homeCCLTC-title">
                      <p v-for='i in demandPool.notReceived.title'>{{i}}</p>
                    </div>
                    <div class="homeCCLTC-table">
                      <div v-for='i in demandPool.notReceived.tableArr'  class="animated bounceInRight" v-show='demandPool.tabIdx==0'  @click='hostDetail(i)'>
                        <p>{{i.projectName}}</p>
                        <p>{{i.var1}}</p>
                        <p>{{Number(i.projectCoin).toLocaleString()}}</p>
                        <p>{{i.employeName}}</p>
                        <p>{{i.progressNew}}%</p>
                      </div>
                      <div v-for='i in demandPool.notReceived.tableArr'  class="animated bounceInRight" v-show='demandPool.tabIdx==1'  @click='hostDetail(i)'>
                        <p>{{i.projectName}}</p>
                        <p>{{i.var1}}</p>
                        <p>{{Number(i.projectCoin).toLocaleString()}}</p>
                        <p>{{i.employeName}}</p>
                        <p>{{i.progressNew}}%</p>
                      </div>
                      <div v-for='i in demandPool.notReceived.tableArr'  class="animated bounceInRight" v-show='demandPool.tabIdx==2'  @click='hostDetail(i)'>
                        <p>{{i.projectName}}</p>
                        <p>{{i.var1}}</p>
                        <p>{{Number(i.projectCoin).toLocaleString()}}</p>
                        <p>{{i.employeName}}</p>
                        <p>{{i.progressNew}}%</p>
                      </div>
                      <div v-for='i in demandPool.notReceived.tableArr'  class="animated bounceInRight" v-show='demandPool.tabIdx==3'  @click='hostDetail(i)'>
                        <p>{{i.projectName}}</p>
                        <p>{{i.var1}}</p>
                        <p>{{Number(i.projectCoin).toLocaleString()}}</p>
                        <p>{{i.employeName}}</p>
                        <p>{{i.progressNew}}%</p>
                      </div>
                    </div>
                    <div class="homeCCLTC-more"  @click='lookMore("demandPool")'>
                      查看更多 >
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div class="homeCC-right">
            <h2 style="color: #555555"><span></span>财富榜</h2>
            <div class="zc-shadow homeCCR-main">
              <div class="homeCCR-tab">
                <p v-for='(i,idx) in wealth.tabArr'
                   @click='tabCk(idx,"wealth",i)'
                   :class="wealth.tabIdx==idx?'homeCCLT-title-acvtive':''"
                ><span :class="wealth.tabIdx==idx?'homeCCLT-titleSpan-active':''"></span>
                    {{i}}
                </p>
              </div>
              <div v-show='wealth.tabIdx==0' class="animated zoomInRight">
                <div class="homeCCR-box">
                  <div v-for='i in wealth.topThree'>
                    <p>{{i.userName}}</p>
                    <span>{{Number(i.coinSum).toLocaleString()}}</span>
                  </div>
                </div>
                <div class="homeCCR-content">
                  <div v-for='(i,idx) in wealth.all'>
                    <span class="homeCCR-content-span">{{idx+4}}</span>
                    <p>{{i.userName}}</p>
                    <div class="homeCCR-content-div"><span></span>{{Number(i.coinSum).toLocaleString()}}</div>
                  </div>
                </div>
              </div>
              <div v-show='wealth.tabIdx==1' class="animated zoomInRight">
                <div class="homeCCR-box">
                  <div v-for='i in wealth.topThree'>
                    <p>{{i.userName}}</p>
                    <span>{{Number(i.coinSum).toLocaleString()}}</span>
                  </div>
                </div>
                <div class="homeCCR-content">
                  <div v-for='(i,idx) in wealth.all'>
                    <span class="homeCCR-content-span">{{idx+4}}</span>
                    <p>{{i.userName}}</p>
                    <div class="homeCCR-content-div"><span></span>{{Number(i.coinSum).toLocaleString()}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import countTo from 'vue-count-to';
export default {
  components: { countTo },
	created(){
    this.currentD();
	},
  mounted(){
    setTimeout(()=>{
      this.drawLine();
      this.devLine();
    },1000);
  },
  data () {
    return {
      myVisc:{},
      user:sessionStorage.getItem('user'),
      startVal: 0,
      endVal: 2017,
      customColor: '#F7AB00',
      myDemand:{//我的需求
        tabIdx:0,
        tabArr:['未领取任务','已领取任务','已立项任务','已完成任务'],//tab切换,需求方
        tabsArr:['已领取任务','已立项任务','已完成任务'],//tab切换，研发方
        notReceived:{//未领取任务
          title:['标题','发起人','赏金','领取人','进度'],
          tableArr:[]
        },
        received:{//已领取
          title:['标题','发起人','赏金','领取人','进度'],
          tableArr:[]
        },
        approval:{//已立项
          title:['标题','发起人','赏金','领取人','进度'],
          tableArr:[]
        },
        complete:{//已完成
          title:['标题','发起人','赏金','领取人','进度'],
          tableArr:[]
        },
      },
      demandPool:{//需求池
        tabIdx:0,
        tabArr:['未领取任务','已领取任务','已立项任务','已完成任务'],//tab切换
        notReceived:{//未领取任务
          title:['标题','发起人','赏金','领取人','进度'],
          tableArr:[]
        }
      },
      wealth:{
        tabArr:['累计支出','累计收入'],
        tabIdx:0,
        topThree:[],
        all:[],//所有的
      }
    }
  },
  methods:{
    //详情
    hostDetail(i){
      this.$router.push({'path':'detail',query:{'id':i.projectId}});
    },
    //查看更多
    lookMore(key){
      if(key=='myDemand'){//我的需求
        this.$router.push({path:'demand',query:{id:1}});
      }else{//需求池
        this.$router.push({path:'task',query:{id:this.demandPool.tabIdx}});
      }
    },
    currentD(){
      if(this.user!='USER_PUBLISH'){
        //我的视联币
        this.$CPOST('/project/findHomepageEeCoinView',{
        },(res)=>{
          // loading.close();
          let data=res.data;
          this.myVisc=data;
        })
        this.mDemand('confirming');
      }else if(this.user=='USER_PUBLISH'){
        //我的视联币
        this.$CPOST('/project/findHomepageErCoinView',{
        },(res)=>{
          // loading.close();
          let data=res.data;
          this.myVisc=data;
        });
        this.mDemand('newbuilt');
      }
      this.mPond('newbuilt');
      this.mWealth('project_out');
    },
    //我的需求and我的任务
    mDemand(_d){
      /*releasing(1,"发布中"),//发布中
      newbuilt(2,"未领取"),//未领取
      confirming(3,"确认中"),//已领取
      working(4,"工作中"),//已立项
      done(5,"已完成"),//已完成
      cancel(6,"取消"),//取消*/
      this.myDemand.notReceived.tableArr=[];
      let url;
      if(this.user!='USER_PUBLISH'){
        url='/project/findEmployeeAllProject'
      }else if(this.user=='USER_PUBLISH'){
        url='/project/findEmployerAllProject'
      }
      this.$CPOST(url,{
        projectStatus:_d,
        pageSize:5
      },(res)=>{
        let data=res.data;
        this.myDemand.notReceived.tableArr=data.list;
      })
    },
    //需求池（通用）
    mPond(_d){
      this.demandPool.notReceived.tableArr=[];
      this.$CPOST('/project/findAllProject',{
        projectStatus:_d,
        pageSize:5
      },(res)=>{
        let data=res.data;
        this.demandPool.notReceived.tableArr=data.list;
      })
    },
    //财富榜
    mWealth(_d){
      this.wealth.topThree=[];
      this.wealth.all=[];
      this.$CPOST('/project/userCoinTop',{
        pageSize:19,
        fromType:_d
      },(res)=>{
        let data=res.data.list;
        for(let i=0;i<data.length;i++){
          if(i<=2){
            this.wealth.topThree.push(data[i])
          }else{
            this.wealth.all.push(data[i])
          }
        }
      })
    },
    //我的需求提交
    myCommit(){
      this.$router.push({path:'/home/submission'})
    },
    //我的需求、需求池tab切换
    tabCk(idx,_d,data){
      if(_d=='myDemand'){
        this.myDemand.tabIdx=idx;
        switch(data){
          case '未领取任务':
            this.mDemand('newbuilt');
            break;
          case '已领取任务':
            this.mDemand('confirming');
            break;
          case '已立项任务':
            this.mDemand('working');
            break;
          case '已完成任务':
            this.mDemand('done');
            break;
        }
      }else if(_d=='demandPool'){
        this.demandPool.tabIdx=idx;
        switch(data){
          case '未领取任务':
            this.mPond('newbuilt');
            break;
          case '已领取任务':
            this.mPond('confirming');
            break;
          case '已立项任务':
            this.mPond('working');
            break;
          case '已完成任务':
            this.mPond('done');
            break;
        }
      }else{
        this.wealth.tabIdx=idx;
        switch(data){
          case '累计收入':
            this.mWealth('project_in');
            break;
          case '累计支出':
            this.mWealth('project_out');
            break;
        }
      }
    },
    //eaharts
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'));
        // 绘制图表
        myChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            position: ['50%', '60%'],
            color:['#BBBBBB','#31C5FF'],
            legend: {
                orient: 'vertical',
                x: 'left',
                data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            },
            series: [
                {
                    name:'我的视联币',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center',
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '14',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:this.myVisc.userCoinByMonth, name:'本月使用'},
                        {value:this.myVisc.userCoinByTotal, name:'总支出'},
                    ]
                }
            ]
        });
    },
    //devchart
    devLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('devChart'));
        // 绘制图表
        myChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            position: ['20%', '60%'],
            color:['#BBBBBB','#31C5FF'],
            legend: {
                orient: 'vertical',
                x: 'left',
                data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            },
            series: [
                {
                    name:'我的视联币',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center',
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '14',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:this.myVisc.userCoinByMonth, name:'本月应收'},
                        {value:this.myVisc.userCoinByTotal, name:'累计收入'},
                    ]
                }
            ]
        });
    },
  }
}
</script>

<style>
  .homeCT-center .el-progress{
    width: 80%;
    margin-left: 18px;
  }
</style>
<style scoped>
  .home_box{
    height: 1790px;
  }
  .home{
    position: relative;
    
  }
  .home header{
    height: 368px;
    background: url(../../assets/img/banner_bottom.png) no-repeat;
    background-size: 100% 368px;
  }
  .home-content{
    width: 1200px;
    margin: auto;
    height: 500px;
    position: absolute;
    top: 0;
    margin-left: -600px;
    left: 50%;
    padding-top: 124px;
  }
  .homeCCL-top{
    background:#fff;
  }
  .homeC-top h2,.homeCCL-top h2,.homeCC-right h2{
    font-size: 24px;
    color: #fff;
    display: flex;
    align-items: center;
    font-weight: normal;
    margin-bottom: 25px;
  }
  .homeC-top h2 span{
    display: inline-block;
    width: 8px;
    height: 23px;
    background: #fff;
    margin-right: 12px;
  }
  .homeCT-main,.homeCT-dev{
    display: flex;
  }
  .homeCT-left{
    overflow: hidden;
    width: 423px;
    height: 264px;
    background:rgba(255,255,255,1);
    padding: 65px 25px;
    display: flex;
    box-shadow:0px 4px 25px -8px rgba(8,113,193,0.3);
  }
  .homeCT-center{
    width: 349px;
    height: 264px;
    margin: 0 24px 0 20px;
    background:rgba(255,255,255,1);
    box-shadow:0px 4px 25px -8px rgba(8,113,193,0.3);
    padding: 52px 40px;
  }
  .homeCT-right{
    width: 384px;
    height: 264px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:0px 4px 25px -8px rgba(8,113,193,0.3);
  }
  .homeCTR-content{
    width: 282px;
    height: 192px;
    position: relative;
  }
  .homeCTR-content div:first-child{
    height: 186px;
    background: url(../../assets/img/katong.png) no-repeat center;
  }
  .homeCTR-content div:last-child{
    position: absolute;
    top: 126px;
    cursor: pointer;
    display: flex;
    width:282px;
    height:66px;
    background:rgba(0,145,255,1);
    box-shadow:0px 6px 25px -8px rgba(8,113,193,0.5);
    border-radius:6px;
    justify-content: center;
    align-items: center;
  }
  .homeCTR-content div:last-child:hover{
    background: #4FB3FF;
  }
  .homeCTR-content div:last-child:active{
    background: #0F7CCF;
  }
  .homeCTR-content span{
    width: 33px;
    height: 28px;
    display: inline-block;
    background: url(../../assets/img/send.png) no-repeat center;
    background-size: 100%;
    margin-right: 16px;
  }
  .homeCTR-content div:last-child p{
    font-size: 24px;
    color: #fff;
  }
  .echart{
    height: 100%;
    display: flex;
    width: 200px;
    align-items: center;
  }
  .homeCTL-right{
    flex: 1;
  }
  .homeCTL-right div:first-child{
    align-items: center;
  }
  .homeCTL-right div:last-child,.homeCT-center div:last-child{
    margin-top: 13px;
  }
  .homeCTL-right div:first-child span:first-child{
    display: inline-block;
    width: 8px;
    height: 8px;
    background: #2895FB;
    border-radius: 10px;
    margin-right: 10px;
  }
  .homeCTL-right div:first-child span:last-child,.homeCT-center div:first-child span:last-child{
    color: #333333;
    font-size:53px;
    margin-left: 14px;
  }
  .homeCTL-right div:first-child p,.homeCTL-right div:last-child p,.homeCT-center div:first-child p,.homeCT-center div:last-child p{
    color: #909090;
    font-size: 16px;
  }
  .homeCTL-right div:last-child p,.homeCT-center div:last-child p{
    margin-left: 14px;
    min-width: 126px;
  }
  .homeCTL-right div:last-child span,.homeCT-center div:last-child span{
    font-size: 26px;
    color: #333333;
    margin-left: 18px;
  }
  .homeCT-center div:first-child span:first-child{
    display: inline-block;
    width: 8px;
    height: 8px;
    background: #F7AB00;
    border-radius: 10px;
    margin-right: 10px;
  }
  .homeC-center{
    display: flex;
    margin: 56px 0 86px 0;
  }
  .homeCC-left{
    width: 792px;
    margin-right: 24px;
  }
  .homeCC-right{
    width: 384px;
  }
  .homeCCL-top h2,.homeCC-right h2{
    height: 82px;
    background:#F7FAFC;
    margin-bottom: 0 !important;
  }
  .homeCCL-top h2 span,.homeCC-right h2 span{
    display: inline-block;
    width: 8px;
    height: 23px;
    background: #0068BD;
    margin-right: 12px;
  }
  .homeCCLT-title{
    display: flex;
    justify-content: space-between;
    width: 630px;
    height: 98px;
    line-height: 98px;
    text-align: center;
  }
  .homeCCLT-title div{
    width: 168px;
    font-size: 18px;
    color: #555555;
    cursor: pointer;
  }
  .homeCCLT-title div p{
    font-weight: 500;
    position: relative;
    display: flex;
    justify-content: center;
  }
  .homeCCLT-title-acvtive{
    color: #000000;
    font-weight: 600 !important;
    font-size: 20px !important;
    /*border-bottom: solid 4px #0091FF;*/
  }
  .homeCCLT-titleSpan-active{
    position: absolute;
    display: inline-block;
    width: 54px;
    height: 4px;
    background: #0091FF;
    top: 75px;
  }
  .homeCCLTC-title{
    display: flex;
    background:#FAFDFF;
    height: 40px;
    font-size: 14px;
    color: #555;
    align-items: center;
    padding: 0 35px;
  }
  .homeCCLTC-table{
    padding: 10px 35px;
    cursor:pointer;
  }
  .homeCCLTC-table p{
    font-size: 16px;
  }
  .homeCCLTC-table div{
    display: flex;
    height: 54px;
    align-items: center;
    color: #333333;
  }
  .homeCCLTC-title p:nth-child(1),.homeCCLTC-table div p:nth-child(1){
    width: 395px !important;
  }
  .homeCCLTC-title p:nth-child(2),.homeCCLTC-title p:nth-child(3),.homeCCLTC-title p:nth-child(4),.homeCCLTC-table p:nth-child(2),.homeCCLTC-table p:nth-child(3),.homeCCLTC-table p:nth-child(4){
    width: 100px;
  }
  .homeCCLTC-title p:nth-child(5),.homeCCLTC-table p:nth-child(5){
    width: 50px;
  }
  .homeCCLTC-more{
    cursor: pointer;
    height: 64px;
    line-height: 64px;
    text-align: center;
    color: #555555;
    font-size: 16px;
    border-top: solid 2px #F7FAFC;
  }
  .homeCCL-bottom{
    margin-top: 56px;
  }
  .homeCCR-main{
    height: 1122px
  }
  .homeCCR-tab{
    height: 90px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 18px;
    color: #909090;
    background: #fff;
  }
  .homeCCR-tab p{
    cursor: pointer;
    height: 90px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .homeCCR-box{
    height:164px;
    background:#FAFDFF;
    padding: 0 27px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
  }
  .homeCCR-box div{
    font-size: 18px;
    color: #000000;
  }
  .homeCCR-box div span{
    display: inline-block;
    width: 100%;
    font-size: 16px;
    text-align: center;
    color: #333;
  }
  .homeCCR-box div:nth-child(1){
    position: absolute;
    left: 146px;
    top: 20px;
  }
  .homeCCR-box div:nth-child(2){
    position: absolute;
    left: 40px;
    top:26px;
  }
  .homeCCR-box div:nth-child(3){
    position: absolute;
    right: 40px;
    top:26px;
  }
  .homeCCR-box div:nth-child(1) p{
    width: 94px;
    height: 107px;
    background: url(../../assets/img/first.png) no-repeat center;
    background-size: 94px 107px;
    display: flex;
    justify-content: center;
    font-weight:600;
    line-height: 123px;
    margin-top: -9px;
  }
  .homeCCR-box div:nth-child(2) p{
    width: 90px;
    height: 97px;
    background: url(../../assets/img/second.png) no-repeat center;
    background-size: 78px 91px;
    display: flex;
    justify-content: center;
    font-weight:600;
    line-height: 110px;
  }
  .homeCCR-box div:nth-child(1) span{
    font-size: 20px;
    font-weight:600;
  }
  .homeCCR-box div:nth-child(3) p{
    width: 90px;
    height: 97px;
    background: url(../../assets/img/Third.png) no-repeat center;
    background-size: 78px 91px;
    display: flex;
    justify-content: center;
    font-weight:600;
    line-height: 110px;
  }
  .homeCCR-content{
    background: #fff;
    /*padding: 52px 74px 62px;*/
  }
  .homeCCR-content div{
    height: 53px;
    display: flex;
    align-items: center;
    padding: 0 38px;
    font-size: 16px;
    font-weight:400;
    color: #333333;
  }
  .homeCCR-content p{
    width: 200px;
  }
  .homeCCR-content-span{
    display: inline-block;
    width: 34px;
  }
  .homeCCR-content-div{
    /*width: 73px;*/
    display: flex;
    align-items: center;
    padding: 0 !important;
  }
  .homeCCR-content-div span{
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url(../../assets/img/money.png) no-repeat center;
    margin-right: 10px;
  }
  /*研发首页*/
  .homeCTD-left{
    overflow: hidden;
    display: flex;
    width: 714px;
    height: 264px;
    background: #fff;
    margin-right: 20px;
    padding: 52px 74px 48px 62px;
  }
  .homeCTD-right{
    flex: 1;
    background: url(../../assets/img/devBg.png) no-repeat center;
  }
  .homeCTDLR-flex{
    margin-right: 50px;
    margin-top: 0 !important;
  }
  .homeCTDLR-flex span{
    font-size: 26px !important;
    color: #333333;
  }
  .homeCTDLR-flex i{
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #BBBBBB;
    margin-right: 10px;
  }
  .homeCTDLR-flex:last-child span{
    margin-left: 33px !important;
  }
</style>
