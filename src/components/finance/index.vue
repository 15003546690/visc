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
      <div class="taskH-right">
        <div @click='searchL'
            v-show='tabIdx==0||tabIdx==2'>查询</div><!-- 查询 -->
        <el-date-picker
            v-show='tabIdx==0||tabIdx==2'
            v-model="datePicker"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
        <div class="taskHR-btn" @click='exportE'>导出</div>
      </div>
    </header>
    <div class="task-table">
      <!-- 资金流水 -->
      <div v-show='tabIdx==0' class="animated lightSpeedIn">
        <div class="notReceived">
          <p v-for='i in notReceived.title'>{{i}}</p>
        </div>
        <div class="taskT-main">
          <div v-for='i in notReceived.content' class="taskTM-box">
            <p>{{i.createtime}}</p>
            <p>{{i.received}}</p>
            <p>{{i.var2}}</p>
            <p>{{i.payCoin}}</p>
            <p>{{i.pay}}</p>
            <p>{{i.var1}}</p>
            <p>{{i.payCoin}}</p>
            <p>{{i.type}}</p>
            <p :title='i.remark'>{{i.remark}}</p>
            <!-- <p v-show='Number(i.beforeCoin).toLocaleString()!=NaN'>{{Number(i.beforeCoin).toLocaleString()}}</p> -->
          </div>
        </div>
      </div>
      <!-- 央行资产负债 -->
      <div v-show='tabIdx==1' class="animated lightSpeedIn">
        <div class="zc_tableA">
          <div class="notReceived">
            <p>项目</p>
            <p>金额</p>
            <p>项目</p>
            <p>金额</p>
          </div>
          <div class="taskTM-box">
            <p>储备视联币</p>
            <p>{{Number(liabilities.cbVisc).toLocaleString()}}</p>
            <p>视联币发行</p>
            <p>{{Number(liabilities.fsVisc).toLocaleString()}}</p>
          </div>
          <div class="taskTM-box">
            <p>员工持有视联币</p>
            <p>{{Number(liabilities.chiyouVisc).toLocaleString()}}</p>
            <p>视联币托管</p>
            <p>{{Number(liabilities.trustVisc).toLocaleString()}}</p>
          </div>
          <div class="taskTM-box">
            <p>研发成果</p>
            <p>{{Number(liabilities.yanfaVisc).toLocaleString()}}</p>
            <p>研发投入</p>
            <p>{{Number(liabilities.touruVisc).toLocaleString()}}</p>
          </div>
          <div class="taskTM-box">
            <p>总资产</p>
            <p>{{Number(liabilitiesNum.totalAssets).toLocaleString()}}</p>
            <p>总负债</p>
            <p>{{Number(liabilitiesNum.totalLiabilities).toLocaleString()}}</p>
          </div>
        </div>
        <!-- <div class="zc_tableB" style="margin-top: 40px;">
          <div class="notReceived">
            <p>发生事项及账务处理</p>
            <p>金额</p>
            <p>备注</p>
          </div>
          <div class="notReceived_bar">
            视联币发行
          </div>
          <div class="taskTM-box">
            <p>借：储备视联币</p>
            <p>{{Number(liabilities.cbVisc).toLocaleString()}}</p>
            <p></p>
          </div>
          <div class="taskTM-box">
            <p>贷：视联币发行</p>
            <p>{{Number(liabilities.fsVisc).toLocaleString()}}</p>
            <p></p>
          </div>
          <div class="notReceived_bar">
            视联币发配
          </div>
          <div class="taskTM-box">
            <p>借：员工持有视联币</p>
            <p>{{Number(liabilities.chiyouVisc).toLocaleString()}}</p>
            <p></p>
          </div>
          <div class="taskTM-box">
            <p>贷：储备视联币</p>
            <p>{{Number(liabilities.cbVisc).toLocaleString()}}</p>
            <p></p>
          </div>
          <div class="notReceived_bar">
            交易形成的视联币交易（交易金额托管）
          </div>
          <div class="taskTM-box">
            <p>借：储备视联币</p>
            <p>{{Number(liabilities.cbVisc).toLocaleString()}}</p>
            <p>金额30万元，30%预算</p>
          </div>
          <div class="taskTM-box">
            <p>贷：视联币托管-**员工（委托方）</p>
            <p>{{Number(liabilities.trustVisc).toLocaleString()}}</p>
            <p></p>
          </div>
          <div class="notReceived_bar">
            交易形成的视联币交易（根据指令支付尾款）
          </div>
          <div class="taskTM-box">
            <p>借：视联币托管-**员工</p>
            <p>{{Number(liabilities.trustVisc).toLocaleString()}}</p>
            <p></p>
          </div>
          <div class="taskTM-box">
            <p>贷：储备视联币</p>
            <p>{{Number(liabilities.cbVisc).toLocaleString()}}</p>
            <p></p>
          </div>
          <div class="notReceived_bar">
            研发产品交付
          </div>
          <div class="taskTM-box">
            <p>研发成果</p>
            <p>{{Number(liabilities.yanfaVisc).toLocaleString()}}</p>
            <p></p>
          </div>
          <div class="taskTM-box">
            <p>员工持有视联币</p>
            <p>{{Number(liabilities.chiyouVisc).toLocaleString()}}</p>
            <p></p>
          </div>
          <div class="notReceived_bar">
            委托方视联币消费
          </div>
          <div class="taskTM-box">
            <p>借：储备视联币</p>
            <p>{{Number(liabilities.cbVisc).toLocaleString()}}</p>
            <p>受委托方持视联币置换</p>
          </div>
          <div class="taskTM-box">
            <p>贷：研发投入</p>
            <p>{{Number(liabilities.touruVisc).toLocaleString()}}</p>
            <p></p>
          </div>
          <div class="notReceived_bar">
            未完成视联币收回
          </div>
          <div class="taskTM-box">
            <p>借：储备视联币</p>
            <p>{{Number(liabilities.cbVisc).toLocaleString()}}</p>
            <p>受委托方持视联币置换</p>
          </div>
          <div class="taskTM-box">
            <p>贷：员工持有视联币</p>
            <p>{{Number(liabilities.chiyouVisc).toLocaleString()}}</p>
            <p></p>
          </div>
        </div> -->

        <!-- <div class="taskT-title">
          <div :class='received.tabIdx==1?"taskT-title-active":""' @click='receivedTab(0)'>
          发放视联币</div>
          <div :class='received.tabIdx==0?"taskT-title-active":""' @click='receivedTab(1)'>回收与未回收视联币</div>
        </div>
        <div class="taskT-title-grant"
             v-show='received.tabIdx==0'>
          <div class="taskTTG-title">
            <div v-for='i in received.children.grant.title'>{{i}}</div>
          </div>
          <div class="taskTTG-main">
            <div v-for='i in received.children.grant.content'>
              <p>{{i.createtime}}</p>
              <p>{{Number(i.grossAmount).toLocaleString()}}</p>
            </div>
          </div>
          <div class="taskTTG-total">
            <p>总计</p>
            <p>{{Number(received.children.grant.total).toLocaleString()}}</p>
          </div>
        </div>
        <div class="taskT-title-grant"
             v-show='received.tabIdx==1'>
          <div class="taskTTG-title">
            <div v-for='i in received.children.recovery.title'>{{i}}</div>
          </div>
          <div class="taskTTG-main">
            <div v-for='i in received.children.recovery.content'>
              <p>{{i.createtime}}</p>
              <p>{{Number(i.coin).toLocaleString()}}</p>
              <p>--------</p>
            </div>
          </div>
          <div class="taskTTG-total">
            <p>合计</p>
            <p>{{Number(received.children.recovery.amount.recycled).toLocaleString()}}</p>
            <p>{{Number(received.children.recovery.amount.unrecovered).toLocaleString()}}</p>
          </div>
          <div class="taskTTG-total" style="margin-top: 0 !important;">
            <p>总计</p>
            <p>{{Number(received.children.grant.total).toLocaleString()}}</p>
          </div>
        </div> -->
      </div>
      <!-- 项目资金流水 -->
      <div v-show='tabIdx==2' class="animated lightSpeedIn">
        <div class="notReceived">
          <p v-for='i in approval.title'>{{i}}</p>
        </div>
        <div class="taskT-main">
          <div v-for='i in notReceived.content' class="taskTM-box">
            <p>{{i.createtime}}</p>
            <p :title="i.projectName" style="overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp:2;
                display: -webkit-box;
                -webkit-box-orient: vertical;">{{i.projectName}}</p>
            <p>{{i.var1}}</p>
            <p>{{i.areaOrg1}}</p>
            <p>{{i.employeName}}</p>
            <p>{{i.areaOrg2}}</p>
            <p>{{i.var6}}</p>
            <p>{{i.var7}}</p>
            <p v-show='Number(i.projectCoin).toLocaleString()!=NaN'>{{Number(i.projectCoin).toLocaleString()}}</p>
            <p v-show='Number(i.trust).toLocaleString()!=NaN'>{{Number(i.trust).toLocaleString()}}</p>
            <p v-show='Number(i.paid).toLocaleString()!=NaN'>{{Number(i.paid).toLocaleString()}}</p>
          </div>
        </div>
      </div>
      <!-- 总资金 -->
      <div v-show='tabIdx==3' class="animated lightSpeedIn">
        <div class="notReceived">
          <p v-for='i in complete.title'>{{i}}</p>
        </div>
        <div class="taskT-main">
          <div v-for='i in notReceived.content' class="taskTM-box">
            <p>{{i.area}}</p>
            <p>{{i.role}}</p>
            <p>{{i.userName}}</p>
            <p>{{i.beginCoin}}</p>
            <p>{{i.receive}}</p>
            <p>{{i.pay}}</p>
            <p>{{i.transfer}}</p>
            <p>{{i.recycle}}</p>
            <p>{{i.yue}}</p>
          </div>
          <div class="taskTM-box">
            <p></p>
            <p>汇总：</p>
            <p></p>
            <p>{{totalCoin.beginCoin}}</p>
            <p>{{totalCoin.receive}}</p>
            <p>{{totalCoin.pay}}</p>
            <p>{{totalCoin.transfer}}</p>
            <p>{{totalCoin.recycle}}</p>
            <p>{{totalCoin.yue}}</p>
          </div>
        </div>
      </div>
      <!-- 视联银行报表 -->
      <div v-show='tabIdx==4' class="animated lightSpeedIn">
        <div class="notReceived_bar">
          研发人员排名
        </div>
        <div class="notReceived">
          <p v-for='i in whole.title'>{{i}}</p>
        </div>
        <div class="taskT-main">
          <div v-for='i in whole.content' class="taskTM-box">
            <p>{{i.role}}</p>
            <p>{{i.userName}}</p>
            <p>{{i.chengjieNum}}</p>
            <p>{{i.finishNum}}</p>
            <p>{{i.workNum}}</p>
            <p>{{Number(i.receiveNum).toLocaleString()}}</p>
          </div>
        </div>
        <div class="notReceived_bar" style="margin-top: 20px;">
          区域情况
        </div>
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
        </div>
        <div class="notReceived_bar" style="margin-top: 20px;">
            区域结存视联币
          </div>
          <div class="notReceived">
            <p v-for='i in balance.title'>{{i}}</p>
          </div>
          <div class="taskT-main">
            <div v-for='i in balance.content' class="taskTM-box">
              <p>{{i.area}}</p>
              <p>{{Number(i.visc).toLocaleString()}}</p>
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
    <!-- <Capital></Capital> -->
  </div>
</template>

<script>
import Capital from '../common/capitalDetail';
export default {
  components:{
    Capital
  },
  created(){
    
    if(this.$route.query.id){
      this.tabIdx=this.$route.query.id;
      this.switchCommon('银行报表');
    }else{
      this.switchCommon('资金流水');
    }
  },
  data () {
    return {
      /*liabilities:{
        cbCoin:'',//储备
        issueCoin:'',//发行
        hold:'',//持有
        trusteeship:'',//托管
        ments:'',//成果
        investment:'',//投入
        assets:'',//资产
      },*/
      liabilities:'',//央行资产数据
      liabilitiesNum:{//央行资产计算
        totalAssets:'',//总资产
        totalLiabilities:'',//总负债
      },
      statusName:'资金流水',//tab标签
      datePicker:'',
      page:{
        current:1,
        pageSize:10,
        total:0
      },
      tabIdx:0,
      tabArr:['资金流水','央行资产负债','项目资金流水','总资金','银行报表'],
      notReceived:{//资金流水
        title:['时间','收款方','收款方部门','收款金额','付款方','付款方部门','付款金额','用途','备注'],
        content:[]
      },
      received:{//央行资产负债
        title:['发放视联币','回收与未回收视联币'],
        tabIdx:0,
        children:{
          grant:{
            title:['时间','未发放视联币'],
            content:[''],
            total:'0'
          },
          recovery:{
            title:['时间','已回收视联币','未回收视联币'],
            content:[''],
            amount:{//合计
              recycled:'100,000',//已回收
              unrecovered:'200,000',//未回收
            },
            total:'200,000'
          }
        }
      },
      approval:{//项目资金流水
        title:['时间','项目名称','需求方','需求方所在区域','承接方','承接方所在区域','接单时间','完成时间','赏金','托管视联币','已付视联币'],
        content:[]
      },
      complete:{//总资金
        title:['区域','账号类别','主体账号','期初视联币金额','收入','支出','视联币内部交易','消费','期末视联币金额'],
        content:[]
      },
      whole:{
        title:['账号类别','主体账号','已接受项目','已完成项目','研发中项目','已获视联币'],
        content:[]
      },//总资金变动
      regional:{//区域情况
        title:['区域','已申请','未领取','已领取','研发中','已完成','项目视联币','托管视联币','已付视联币'],
        content:[]
      },
      balance:{//结存
        title:['区域','结存视联币'],
        content:[]
      },
      totalCoin:{
        beginCoin:0,//期初视联币
        receive:0,//收入
        pay:0,//支出
        transfer:0,//视联币内部
        recycle:0,//消费
        yue:0,//期末视联币
      }//总资金
    }
  },
  methods:{
    switchCommon(_d){
      switch(_d){
        case '资金流水': case '项目资金流水': case '总资金':
          this.mNotReceived();
          break;
        case '央行资产负债':
          this.mReceived();
          break;
        case '总资金变动':
          break;
        case '银行报表':
          this.mWhole();
          break;
      }
    },
    //导出
    exportE(){
      /*var url=this.$http+'/noAuth/exportExcelAllProject?projectStatus='+this.statusName;
      window.location.href=url;*/
      let url='';
      if(this.statusName=='央行资产负债'){
        if(this.received.tabIdx==0){
          url='/noAuth/exportExcelAllCtBank';
        }else if(this.received.tabIdx==1){
          url='/noAuth/exportExcelRecycle';
        }
      }else{
        switch(this.statusName){
          case '资金流水':
          url='/noAuth/exportExcelDetailed';
          break;
          case '项目资金流水':
          url='/noAuth/exportExcelProjectTrust';
          break;
          case '总资金':
          url='/noAuth/exportExcelUserCoin';
          break;
        }
      }
      window.location.href=this.$http+url;
    },
    //搜索
    searchL(){
      this.mNotReceived();
    },
    mWhole(){
      this.$CPOST('/particulars/findAreaVisc',{},
        (res)=>{
          this.page.total=0;
          this.whole.content=res.data.empolyerFinishDtos;
          this.regional.content=res.data.areaDoneDtos;
          this.balance.content=res.data.areaViscDtos;
        })
    },
    //资金流水
    mNotReceived(){
      let data,url;
      if(this.datePicker!=null){
        data={
          userId:1,
          startTime:this.datePicker[0],
          endTime:this.datePicker[1],
          pageSize:this.page.pageSize,
          pageNum:this.page.current
        }
      }else{
        data={
          userId:1,
          pageSize:this.page.pageSize,
          pageNum:this.page.current
        }
      }
      switch(this.statusName){
        case '资金流水':
        url='/particulars/findAllParticular';
        break;
        case '项目资金流水':
        url='/project/findAllProjectTrust';
        break;
        case '总资金':
        url='/particulars/findViscDeal';
        break;
      }
      this.$CPOST(url,data,(res)=>{
        let data=res.data;
        this.page.total=data.total;
        this.notReceived.content=data.list;
        if(this.statusName=='总资金'){
          for(let i=0;i<data.list.length;i++){
            this.totalCoin.beginCoin+=data.list[i].beginCoin;
            this.totalCoin.receive+=data.list[i].receive;
            this.totalCoin.pay+=data.list[i].pay;
            this.totalCoin.transfer+=data.list[i].transfer;
            this.totalCoin.recycle+=data.list[i].recycle;
            this.totalCoin.yue+=data.list[i].yue;
            // this.totalCoin+=data.list[i].beginCoin+data.list[i].pay+data.list[i].receive+data.list[i].recycle+data.list[i].transfer+data.list[i].yue;
          }
        }
      })
    },
    //央行资产负债TAB
    receivedTab(idx){
      this.received.tabIdx=idx;
      this.mReceived();
    },
    //央行资产负债
    mReceived(){
      this.$CPOST('/particulars/findLiabilit',{

      },(res)=>{
        this.page.total=1;
        let _d=res.data;
        this.liabilities=_d;
        this.liabilitiesNum.totalAssets=Number(_d.cbVisc)+Number(_d.chiyouVisc)+Number(_d.yanfaVisc);
        this.liabilitiesNum.totalLiabilities=Number(_d.fsVisc)+Number(_d.trustVisc)+Number(_d.touruVisc);
      })
      /*let data,url;
      if(this.datePicker!=null){
        data={
          userId:1,
          startTime:this.datePicker[0],
          endTime:this.datePicker[1],
          pageSize:this.page.pageSize,
          pageNum:this.page.current
        }
      }else{
        data={
          userId:1,
          pageSize:this.page.pageSize,
          pageNum:this.page.current
        }
      }
      if(this.received.tabIdx==0){
        url='/ctbank/findAllCtBank';
        this.$CPOST(url,data,(res)=>{
          let data=res.data;
          this.received.children.grant.content=data.list;
          this.page.total=data.total;
        })
      }else{
        url='/transferAccount/findRecycle';
        data['fromType']='recycle';
        this.$CPOST(url,data,(res)=>{
          let data=res.data;
          this.received.children.recovery.content=data.recycles.list;
          this.received.children.recovery.amount.recycled=data.totalRecycle;
          this.received.children.recovery.amount.unrecovered=data.onRecycle;
          this.received.children.recovery.total=data.zongji;
          this.page.total=data.recycles.total;
        })
      }
      this.$CPOST('/ctbank/findCtBankAccount',{},(res)=>{
        this.received.children.grant.total=res.data.grossAmount;
      })*/
    },
    //导出
    expo(){
      console.log(this.datePicker)
    },
    //tab切换处理函数
    tabCk(idx,_d){
      this.tabIdx=idx;
      this.page.current=1;
      this.statusName=_d;
      this.switchCommon(_d);
    },
    //下一页
    nextPage(_d){
      this.page.current=_d;
      this.switchCommon(this.statusName);
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
    width: 640px;
    margin-right: 40px;
    height: 91px;
    line-height: 91px;
    text-align: center;
  }
  .homeCCLT-title div{
    padding: 0 20px;
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
  }
  .taskH-right div:first-child{
    width: 40px;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
  }
  .taskHR-btn{
    margin-left: 10px;
    height: 40px;
    line-height: 40px;
  }
  .homeCTR-content{
    width: 202px;
    height: 98px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 50px;
    top: -30px;
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

  /*资金流水*/
  /* .notReceived p:nth-child(3),.notReceived p:nth-child(4),.notReceived p:nth-child(1),.notReceived p:nth-child(2),.notReceived p:nth-child(5),.taskTM-box p:nth-child(1),.taskTM-box p:nth-child(2),.whole-box p:nth-child(1),.whole-box p:nth-child(2),.whole-box p:nth-child(3),.whole-box p:nth-child(4),.whole-box p:nth-child(5),.whole p:nth-child(1),.whole p:nth-child(2),.whole p:nth-child(3),.whole p:nth-child(4),.whole p:nth-child(5),.taskTM-box p:nth-child(3),.taskTM-box p:nth-child(4){
    width: 204px;
  }
  .notReceived p:nth-child(5),.taskTM-box p:nth-child(5),.approval p:nth-child(6),.approval-box p:nth-child(6){
    width: 102px;
  }
  .notReceived p:nth-child(6),.taskTM-box p:nth-child(6),.received p:nth-child(1),.received-box p:nth-child(1){
    width: 282px;
  } */
  .notReceived{
    display: flex;
  }
  .notReceived p{
    flex: 1;
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
  /*央行资产负债*/
  .received p:nth-child(2),.received p:nth-child(4),.received-box p:nth-child(2),.received-box p:nth-child(4){
    width: 307px;
  }
  .received p:nth-child(3),.received-box p:nth-child(3),.approval p:nth-child(2),.approval-box p:nth-child(2){
    width: 306px;
  }
  /*资金流水*/
  .approval p:nth-child(1),.approval p:nth-child(4),.approval p:nth-child(7),.approval-box p:nth-child(1),.approval-box p:nth-child(4),.approval-box p:nth-child(7),.whole p:nth-child(6),.whole-box p:nth-child(6){
    width: 180px;
  }
  .approval p:nth-child(3),.approval p:nth-child(5),.approval-box p:nth-child(3),.approval-box p:nth-child(5){
    width: 126px;
  }
  /*总资金*/
  .complete p:nth-child(1),.complete p:nth-child(2),.complete-box p:nth-child(1),.complete-box p:nth-child(2){
    width: 408px;
  }
  .complete p:nth-child(3),.complete-box p:nth-child(3){
    width: 384px;
  }
  /*总资金变动*/

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
  /*央行资产与负债*/
  .taskT-title{
    display: flex;
  }
  .taskT-title div{
    flex: 1;
    height: 44px;
    border: solid 1px #0091FF;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 16px;
    background: #0091FF;
  }
  .taskT-title-active{
    color: #0091FF !important;
    background: #fff !important;
  }
  .taskTTG-title{
    display: flex;
    height: 66px;
    background:rgba(250,253,255,1);
    font-size: 14px;
    color: #555555;
  }
  .taskTTG-title div{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .taskTTG-title div:first-child{
    /*margin-right: 2px;*/
    border-right: solid 1px rgba(247,250,252,1);
  }
  .taskTTG-main{
    background: #fff;
  }
  .taskTTG-main div{
    display: flex;
    height: 60px;
    border-top: solid 1px rgba(247,250,252,1);
    font-size: 16px;
    color: #333;
  }
  .taskTTG-total{
    display: flex;
    height: 66px;
    background:rgba(250,253,255,1);
    margin-top: 4px;
  }
  .taskTTG-main div p,.taskTTG-total p{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .taskTTG-total p{
    font-size: 16px;
    font-weight: 600;
  }
  .taskTTG-total p:first-child{
    color: #666666;
  }
  .taskTTG-total p:last-child,.taskTTG-total p:nth-child(2){
    color: #0091FF;
  }
  .taskTTG-total:last-child{
    margin-top: 4px !important;
  }
  .notReceived_bar{
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
    font-size: 16px;
    text-align: center;
    font-weight: bold;
    background: #fff;
    border-bottom: solid 1px rgba(247,250,252,1);
  }
</style>
