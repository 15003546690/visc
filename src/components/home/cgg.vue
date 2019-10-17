<template>
  <div class="yzpage">
    <header>
    </header>
    <div class="home-content">
      <div class="homeCT-dev">
        <div class="homeCTD-left zc-shadow">
          <div class="homeCTL-right">
            <div>
              <div style="display: flex;">
                <!-- <span></span> -->
                <p style="margin-left: 14px;">项目总支出</p>
              </div>
              <count-to :startVal='0' :endVal='Number(projectLeft.total)' :duration=2000 style='margin-left: 10px'></count-to>
            </div>
            <div style="display: flex;align-items: center;">
              <div class="homeCTDLR-flex">
                <p><i style="background: #FFC830"></i>托管视联币</p>
                <count-to :startVal='0' :endVal='Number(projectLeft.trusteeship)' :duration=2000></count-to>
              </div>
              <div class="homeCTDLR-flex">
                <p><i style="background: #F5841F"></i>研发收入</p>
                <count-to :startVal='0' :endVal='Number(projectLeft.income)' :duration=2000></count-to>
              </div>
            </div>
          </div>
          <div class="echart">
            <div id="devChart" :style="{width: '800px', height: '800px',fontSize:'12px'}"></div>
          </div>
        </div>
        <div class="homeCTD-left zc-shadow">
           <div class="homeCTL-right">
            <div>
              <div style="display: flex;">
                <!-- <span></span> -->
                <p style="margin-left: 14px;">项目总数</p>
              </div>
              <count-to :startVal='0' :endVal='Number(projectRight.total)' :duration=2000 style='margin-left: 10px'></count-to>
            </div>
            <div style="display: flex;align-items: center;">
              <div class="homeCTDLR-flex">
                <p><i style="background: #4DCBB3"></i>已完成项目</p>
                <count-to :startVal='0' :endVal='Number(projectRight.complete)' :duration=2000></count-to>
              </div>
              <div class="homeCTDLR-flex">
                <p><i style="background: #2999FB"></i>进行中项目</p>
                <count-to :startVal='0' :endVal='Number(projectRight.conduct)' :duration=2000></count-to>
              </div>
            </div>
          </div>
          <div class="echart">
            <div id="rightLine" :style="{width: '800px', height: '800px',fontSize:'12px'}"></div>
          </div>
        </div>
      </div>
      <div class="homeC-region">
        <h2><span></span>区域情况</h2>
        <div class="homeCR-echarts zc-shadow">
            <div class="homeCR-search">
              <span style="font-size: 18px;">筛选</span>
              <el-select v-model="statesId" placeholder="请选择" @change='zc'>
                <el-option
                  v-for="item in statesArr"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <span style="font-size: 14px;">(单位：个)</span>
              <div class="homeCR-state" v-show='statesId=="视联币"'>
                <p><span style="background: #FFCA36"></span>项目视联币</p>
                <p><span style="background: #F39A27"></span>已付视联币</p>
                <p><span style="background: #8FE69E"></span>托管视联币</p>
              </div>
              <div class="homeCR-state" v-show='statesId=="项目"'>
                <p><span style="background: #1875F0"></span>已申请项目</p>
                <p><span style="background: #62AEFF"></span>已完成项目</p>
                <p><span style="background: #8FE69E"></span>研发中项目</p>
              </div>
            </div>
            <div id="region" :style="{width: '1200px', height: '400px',left:'-58px'}"></div>
        </div>
        <div class="homeC-quyuTab zc-shadow">
          <div class="notReceived">
            <p v-for='i in regional.title'>{{i}}</p>
          </div>
          <div class="taskT-main">
            <div v-for='i in regional.content' class="taskTM-box">
              <p>{{i.areaName}}</p>
              <p>{{i.newbuiltNum}}</p>
              <p>{{i.confirmingNum}}</p>
              <p>{{i.shenqingNum}}</p>
              <p>{{i.workingNum}}</p>
              <p>{{i.doneNum}}</p>
              <p>{{Number(i.projectCoin).toLocaleString()}}</p>
              <p>{{Number(i.trustCion).toLocaleString()}}</p>
              <p>{{Number(i.payCoin).toLocaleString()}}</p>
            </div>
            <div class="homeCCLTC-more"  @click='lookMore("demandPool")'>
                查看更多 >
              </div>
          </div>
        </div>
      </div>
      <div class="homeC-Balance">
        <div class="homeC-Balance-left">
          <h2><span></span>区域结存视联币</h2>
          <div class="homeC-BalanceC zc-shadow">
            <div id="qyjcCoinEchart" :style="{width: '800px', height: '625px',fontSize:'12px'}"></div>
          </div>
        </div>
        <div class="homeC-Balance-right">
          <h2><span></span>财富榜</h2>
          <div class="homeC-BalanceC">
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
      <div class="homeC-Liabilities">
        <h2><span></span>区域情况</h2>
        <div class="homeCL-content">
          <div class="homeCL-content-bar">
            <div class="notReceived_bar">
              研发人员排名
            </div>
            <div class="notReceived">
              <p>项目</p>
              <p>金额</p>
            </div>
            <div class="taskTM-box">
              <p>储备视联币</p>
              <p>{{Number(liabilities.cbVisc).toLocaleString()}}</p>
            </div>
            <div class="taskTM-box">
              <p>员工持有视联币</p>
              <p>{{Number(liabilities.chiyouVisc).toLocaleString()}}</p>
            </div>
            <div class="taskTM-box">
              <p>研发成果</p>
              <p>{{Number(liabilities.yanfaVisc).toLocaleString()}}</p>
            </div>
            <div class="taskTM-box">
              <p>总资产</p>
              <p>{{Number(liabilitiesNum.totalAssets).toLocaleString()}}</p>
            </div>
          </div>
          <div class="homeCL-content-bar">
            <div class="notReceived_bar">
              研发人员排名
            </div>
            <div class="notReceived">
              <p>项目</p>
              <p>金额</p>
            </div>
            <div class="taskTM-box">
              <p>视联币发行</p>
              <p>{{Number(liabilities.fsVisc).toLocaleString()}}</p>
            </div>
            <div class="taskTM-box">
              <p>视联币托管</p>
              <p>{{Number(liabilities.trustVisc).toLocaleString()}}</p>
            </div>
            <div class="taskTM-box">
              <p>研发投入</p>
              <p>{{Number(liabilities.touruVisc).toLocaleString()}}</p>
            </div>
            <div class="taskTM-box">
              <p>总负债</p>
              <p>{{Number(liabilitiesNum.totalLiabilities).toLocaleString()}}</p>
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
  mounted(){
    setTimeout(()=>{
      this.rightLine();
      this.leftLine();
      this.region();
      this.qyjcCoinEchart();
      // this.coninEchart();
    },1000);
  },
  created(){
    this.regionD();
    this.mWealth('project_out');
    this.mReceived();
  },
  data () {
    return {
      liabilities:'',//央行资产数据
      liabilitiesNum:{//央行资产计算
        totalAssets:'',//总资产
        totalLiabilities:'',//总负债
      },
      wealth:{
        tabArr:['累计支出','累计收入'],
        tabIdx:0,
        topThree:[],
        all:[],//所有的
      },
      regional:{//区域情况
        title:['区域','已申请','未领取','已领取','研发中','已完成','项目视联币','托管视联币','已付视联币'],
        content:[]
      },
      statesArr:[
        {
          value:'视联币',
          label:'视联币'
        },
        {
          value:'项目',
          label:'项目'
        }
      ],
      statesId:'项目',
      projectLeft:{
        total:9878,
        trusteeship:7646,
        income:2232
      },
      projectRight:{
        total:203,
        complete:87,
        conduct:116
      },
      areaData:{
        xD:[],//X坐标默认数据
        shenqingNum:[],//已申请
        doneNum:[],//已完成
        workingNum:[],//工作中
        projectCoin:[],//项目视联币
        payCoin:[],//已付视联币
        trustCion:[],//托管
      },
      areaViscDtos:{//区域结存视联币
        yD:[],//Y坐标默认数据
        visc:[]
      }
    }
  },
  methods:{
    mReceived(){
      this.$CPOST('/particulars/findLiabilit',{
      },(res)=>{
        let _d=res.data;
        this.liabilities=_d;
        this.liabilitiesNum.totalAssets=Number(_d.cbVisc)+Number(_d.chiyouVisc)+Number(_d.yanfaVisc);
        this.liabilitiesNum.totalLiabilities=Number(_d.fsVisc)+Number(_d.trustVisc)+Number(_d.touruVisc);
      })
      //上面两个echarts
      this.$CPOST('/particulars/findAdminHomePage',{

      },(res)=>{
        let _d=res.data;
        this.projectLeft.total=_d.zhichu;
        this.projectLeft.trusteeship=_d.trust;
        this.projectLeft.income=_d.shouru;
        this.projectRight.total=_d.totalNum;
        this.projectRight.complete=_d.doneNum;
        this.projectRight.conduct=_d.working;
      })
    },
    //我的需求、需求池tab切换
    tabCk(idx,_d,data){
        this.wealth.tabIdx=idx;
        switch(data){
          case '累计收入':
            this.mWealth('project_in');
            break;
          case '累计支出':
            this.mWealth('project_out');
            break;
        }
    },
    //财富榜
    mWealth(_d){
      this.wealth.topThree=[];
      this.wealth.all=[];
      this.$CPOST('/project/userCoinTop',{
        pageSize:10,
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
    //查看更多
    lookMore(key){
      this.$router.push({path:'finance',query:{id:4}});
    },
    zc(){
      if(this.statesId=='项目'){
        this.region();
      }else{
        this.coninEchart();
      }
    },
    //项目总支出
    leftLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('devChart'));
        // 绘制图表
        myChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            position: ['10%', '59.5%'],
            color:['#FFC830','#F5841F'],
            legend: {
                orient: 'vertical',
                x: 'left',
                data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            },
            series: [
                {
                    name:'项目总支出：'+this.projectLeft.total,
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
                        {value:this.projectLeft.trusteeship, name:'托管视联币'},
                        {value:this.projectLeft.income, name:'研发收入'},
                    ]
                }
            ]
        });
    },
    //项目总数
    rightLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('rightLine'));
        // 绘制图表
        myChart.setOption({
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            position: ['10%', '59.5%'],
            color:['#2999FB','#4DCBB3'],
            legend: {
                orient: 'vertical',
                x: 'left',
                data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            },
            series: [
                {
                    name:'项目总数：'+this.projectRight.total,
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
                        {value:this.projectRight.conduct, name:'进行中项目'},
                        {value:this.projectRight.complete, name:'已完成项目'},
                    ]
                }
            ]
        });
    },
    //区域折现数据
    regionD(){
      this.$CPOST('/particulars/findAreaVisc',{},
        (res)=>{
          let _d=res.data.areaDoneDtos;
          this.regional.content=_d.filter((row,index)=>index<5)
          /*for(let i=0;i<_d.length;i++){
            if(i<5){
              this.regional.content.push(_d[i]);
            }
          }*/
          for(let i=0;i<_d.length;i++){
            this.areaData.xD.push(_d[i].areaName);
            this.areaData.shenqingNum.push(_d[i].shenqingNum);
            this.areaData.doneNum.push(_d[i].doneNum);
            this.areaData.workingNum.push(_d[i].workingNum);
            //视联币
            this.areaData.projectCoin.push(_d[i].projectCoin);//项目视联币
            this.areaData.payCoin.push(_d[i].payCoin);//已付视联币
            this.areaData.trustCion.push(_d[i].trustCion);//托管
          }
          let _D=res.data.areaViscDtos;
          for(let i=_D.length-1;i>=0;i--){
            this.areaViscDtos.yD.push(_D[i].area);
            this.areaViscDtos.visc.push(_D[i].visc);
          }
      })
    },
    //区域情况
    region(){
      let myChart = this.$echarts.init(document.getElementById('region'));
      // 绘制图表
      myChart.setOption({
          color: ['#1875F0', '#62AEFF',  '#e5323e'],
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'shadow'
              }
          },
          /*legend: {
              data: ['Forest', 'Steppe', 'Desert', 'Wetland']
          },*/
          calculable: true,
          xAxis: [
              {
                  type: 'category',
                  axisTick: {show: false},
                  data: this.areaData.xD,
                  axisTick:{
                      show:false
                  },
                  axisLine:{
                      show:false
                  },
              }
          ],
          yAxis: [
              {
                  type: 'value',
                  axisTick:{
                      show:false
                  },
                  axisLine:{
                      show:false
                  },
              }
          ],
          series: [
              {
                  name: '已申请',
                  type: 'bar',
                  barWidth:'16px',
                  barGap: '10%',
                  data: this.areaData.shenqingNum
              },
              {
                  name: '已完成',
                  type: 'bar',
                  barWidth:'16px',
                  data: this.areaData.doneNum,
              },
              {
                  name: '研发中',
                  data: this.areaData.workingNum,
                  type: 'line',
                  areaStyle: {
                      color:'#C1F5CD',
                      opacity:'0.3'
                  },
                  lineStyle:{ 
                  color:'#C1F5CD' //改变折线颜色
                  },
                  color:'#C1F5CD', //改变折线点的颜色
                  symbol: "none",
              }
          ]
      });
    },
    //区域结存视联币
    qyjcCoinEchart(){
      let myChart = this.$echarts.init(document.getElementById('qyjcCoinEchart'));
      myChart.setOption({
        color: ['#2562FF'],
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'shadow'
              }
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          xAxis: {
              type: 'value',
              boundaryGap: [0, 0.01],
              show:true,
              axisTick:{
                  show:false
              },
              axisLine:{
                  show:false
              },
              axisLabel:{
                  show:false
              },
          },
          yAxis: {
              type: 'category',
              data: this.areaViscDtos.yD,
              show:true,
              axisTick:{
                      show:false
                  },
                  axisLine:{
                      show:false
                  },
          },
          series: [
              {
                  type: 'bar',
                  data: this.areaViscDtos.visc,
                  barWidth:'16px',
                  label: {
                      normal: {
                          show: true,
                          position: 'right',
                          color:'#333333'
                      }
                  },
              }
          ]
      });
    },
    //视联币情况
    coninEchart(){
      let myChart = this.$echarts.init(document.getElementById('region'));
      // 绘制图表
      myChart.setOption({
          color: ['#FFCA36', '#F39A27',  '#e5323e'],
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'shadow'
              }
          },
          /*legend: {
              data: ['Forest', 'Steppe', 'Desert', 'Wetland']
          },*/
          calculable: true,
          xAxis: [
              {
                  type: 'category',
                  axisTick: {show: false},
                  data: this.areaData.xD
              }
          ],
          yAxis: [
              {
                  type: 'value'
              }
          ],
          series: [
              {
                  name: '项目视联币',
                  type: 'bar',
                  barGap: '10%',
                  data: this.areaData.projectCoin
              },
              {
                  name: '已付视联币',
                  type: 'bar',
                  data: this.areaData.payCoin,
              },
              {
                  name: '托管',
                  data: this.areaData.trustCion,
                  type: 'line',
                  areaStyle: {
                      color:'#C1F5CD',
                      opacity:'0.3'
                  },
                  lineStyle:{ 
                  color:'#C1F5CD' //改变折线颜色
                  },
                  color:'#C1F5CD', //改变折线点的颜色
                  symbol: "none",
              }
          ]
      });
    },
  }
}
</script>

<style>
  .homeCR-search .el-select input{
    border-radius: 1px !important;
  }
</style>
<style scoped>
.yzpage{
  height: 2790px;
  position: relative;
}
.homeCR-echarts{
  background: #fff;
  height:458px;
}
.homeC-region h2,.homeC-Balance h2,.homeC-Liabilities h2{
    font-size: 24px;
    color: #555555;
    display: flex;
    align-items: center;
    font-weight: normal;
    margin-bottom: 25px;
  }
  .homeC-region h2 span,.homeC-Balance h2 span,.homeC-Liabilities h2 span{
    display: inline-block;
    width: 8px;
    height: 23px;
    background: #0091FF;
    margin-right: 12px;
  }
  .homeC-Liabilities{
    margin-top: 40px;
  }
.yzpage header{
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
  padding-top: 248px;
}
.homeCT-dev{
  display: flex;
  margin-top: -68px;
}
.homeCTD-left{
  overflow: hidden;
  display: flex;
  flex: 1;
  height: 264px;
  background: #fff;
  margin-right: 20px;
  padding: 52px 74px 48px 62px;
}
.homeCT-cg{
  flex: 1;
  background: #fff;
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
.echart{
    height: 100%;
    display: flex;
    width: 200px;
    align-items: center;
    position: relative;
    left: -65px;
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
    margin-left: 32px;
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
  .homeC-region{
    margin-top: 44px;
  }
  .homeCR-search{
    padding: 20px 40px;
    display: flex;
    align-items: center;
  }
  .homeCR-search .el-select{
    margin: 0 15px;
    width: 150px;
  }
  .homeCR-state{
    display: flex;
    justify-content: flex-end;
    flex: 1;
  }
  .homeCR-state p{
    display: flex;
    align-items: center;
    margin-right: 40px;
  }
  .homeCR-state span{
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-right: 10px;
  }
  /*就那一堆盒子*/
  .notReceived,.received,.approval,.complete,.whole{
    display: flex;
    background:#FAFDFF;
    height: 66px;
    font-size: 14px;
    color: #555;
    align-items: center;
    justify-content: space-between;
    border-bottom: solid 1px rgba(247,250,252,1);
  }
  .notReceived p,.received p,.approval p,.complete p,.whole p{
    text-align: center;
    border-left: solid 1px #D9D9D9;
    border-right: solid 1px #D9D9D9;
  }
  .notReceived p:first-child,.received p:first-child,.approval p:first-child,.complete p:first-child,.whole p:first-child{
    border-left: none;
  }
  .notReceived p:last-child,.received p:last-child,.approval p:last-child,.complete p:last-child,.whole p:last-child{
    border-right: none;
  }
  .notReceived{
    display: flex;
  }
  .notReceived p{
    flex: 1;
  }
  .taskT-main{
    background: #ffffff;
  }
  .taskTM-box,.received-box,.approval-box,.complete-box,.whole-box{
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: solid 1px rgba(247,250,252,1);
  }
  .taskTM-box:hover,.received-box:hover,.approval-box:hover,.complete-box:hover,.whole-box:hover{
    background:rgba(250,253,255,1);
  }
  .taskTM-box p,.received-box p,.approval-box p,.complete-box p,.whole-box p{
    text-align: center;
    font-size:16px;
    overflow: hidden;
    text-overflow: ellipsis;
    /*display: -webkit-box;*/
    -webkit-line-clamp:2;
    -webkit-box-orient: vertical;
  }
  .taskTM-box{
    background: #fff;
    display: flex;
  }
  .taskTM-box p{
    flex: 1;
  }
  .taskTM-box p:last-child{
    /*display: -webkit-box;*/
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    cursor: pointer;
  }
  .homeC-quyuTab{
    margin-top: 20px;
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
  .homeC-Balance{
    display: flex;
    margin-top: 40px;
  }
  .homeC-Balance-left{
    width: 794px;
  }
  .homeC-Balance-right{
    flex: 1;
    width: 100%;
    margin-left: 22px;
  }
  .homeC-BalanceC{
    background: #fff;
  }
  .homeCCR-main{
    height: 625px
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
  .homeCCLT-title-acvtive{
    color: #000000;
    font-weight: 600 !important;
    font-size: 20px !important;
    /*border-bottom: solid 4px #0091FF;*/
  }
  .homeCL-content{
    display: flex;
    justify-content: space-around;
  }
  .homeCL-content-bar{
    width: 598px;
    height: 50px;
    background: red;
  }
  .notReceived_bar{
    height: 66px;
    line-height: 66px;
    padding: 0 20px;
    font-size: 18px;
    text-align: center;
    color: #333;
    font-weight: bold;
    background: #fff;
    border-bottom: solid 1px rgba(247,250,252,1);
  }
</style>
