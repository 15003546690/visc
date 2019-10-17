<template>
    <div class="vbank_container">
      <div class="card_box">
          <div class="card_box_title">
            <p>
                <label>用户名</label>
                <strong>{{info.userName}}</strong>
            </p>
            <p>
                <label>卡号名称</label>
                <strong>{{info.userNumber}}</strong>
            </p>  
            <p>
                <label>角色</label>
                <strong>
                  <span v-show="user=='USER_CLAIM'">研发方</span>
                  <span v-show="user=='USER_PUBLISH'">需求方</span>
                  <span v-show="user=='MONITOR_TP'">需求统筹组</span>
                  <span v-show="user=='MONITOR_REGULATOR'">运营监管组</span>
                  <span v-show="user=='CONTROL_COUNCIL'">发行调控委员会</span>
                </strong>
            </p> 
          </div>
          <ul class="card_box_ul">
              <li>
                  <h3>账户余额</h3>
                  <p><strong>{{Number(info.yue).toLocaleString()}}</strong>视联币</p>
              </li>
              <li>
                  <h3>本月应收</h3>
                  <p><strong>{{Number(info.userCoinByMonth).toLocaleString()}}</strong>视联币</p>
              </li>
              <li>
                  <h3>累计收入</h3>
                  <p><strong>{{Number(info.userCoinByTotal).toLocaleString()}}</strong>视联币</p>
              </li>
              <li>
                  <!-- <el-button type='primary' @click='transfer()'>转账</el-button> -->
              </li>
          </ul>
      </div>
      <div class="sobox">
        <div style="width: 124px;margin-right: 75px;">
            <el-select v-model='selectName'  filterable clearable>
              <el-option
                v-for="item in selectArr"
                :key="item.val"
                :label="item.key"
                :value="item.val">
              </el-option>
            </el-select>
        </div>
         <div class="sobox_input">
             <label style="cursor: pointer;" @click='searchL("s")'>查询</label>
             <el-date-picker
                v-model="search.time"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
         </div>
         <!-- <div class="sobox_input">
             <el-input
                  placeholder="请输入内容"
                  prefix-icon="el-icon-search">
             </el-input>
         </div> -->
         <!-- <div class="sobox_input">
             <el-button type="primary" @click="send()">新增发行</el-button>
         </div> -->
      </div>
      <div class="listbox">
        <div class="distribution-header">
            <p v-for='i in titleArr'>{{i}}</p>
        </div>
        <div class="distribution-main">
            <div v-for='i in tableArr' class="distributionM-box">
                <p>{{i.userNumber}}</p>
                <p>{{i.coin}}</p>
                <p>{{i.beforeCoin}}</p>
                <p>{{i.createtime}}</p>
                <p>{{i.comments}}</p>
                <p>{{i.fromName}}</p>
            </div>
        </div>
      </div>
      <!-- <div class="subm-release" v-show='isRelease'>
          <div class="submR-main">
              <div class="submR-content">
                  <div class="subm-title">新增额度</div>
                  <ul class="submR-content-ul">
                      <li><label>发行额度</label></li>
                      <li><el-input></el-input></li>
                      <li><label>备注</label></li>
                      <li><el-input></el-input></li>
                  </ul>
                  <div class="submR-btn">
                      <el-button type="primary">确定</el-button>
                      <el-button>取消</el-button>
                  </div>
              </div>
              <div class="submR-close" @click='close'></div>
          </div>
      </div> -->
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
    this.currentD();
    this.searchL();
  },
  data() {
    return {
      user:sessionStorage.getItem('user'),
      info:{},//抬头信息
      titleArr:['卡号名称','变动金额','余额','交易时间','说明','付款方'],
      tableArr:[],
      selectName:'',
      selectArr:[
        {key:'分配',val:'distribution'},
        {key:'转账转出',val:'transfer_out'},
        {key:'转账收入',val:'transfer_in'},
        {key:'项目支出',val:'project_out'},
        {key:'项目收入',val:'project_in'},
        {key:'回收',val:'recycle'},
        {key:'项目返还',val:'project_fh'}
      ],
      page:{
        current:1,
        pageSize:10,
        total:0
      },
      search:{
        time:''
      },
       // isRelease:false,
    }
  },
  methods:{
    transfer(){
      this.$router.push({path:'transferaccounts'})
    },
    currentD(){
      const loading = this.$loading(this.$store.state.loading);
      if(this.user=='USER_CLAIM'){
        this.$CPOST('/project/findHomepageEeCoinView',{
        },(res)=>{
          loading.close();
          let data=res.data;
          this.info=data;
        })
      }else if(this.user!='USER_CLAIM'){
        this.$CPOST('/project/findHomepageErCoinView',{
        },(res)=>{
          loading.close();
          let data=res.data;
          this.info=data;
        })
      }
    },
    searchL(val){
      const loading = this.$loading(this.$store.state.loading);
      if(val=='s'){
        this.page.current=1;
      }
      this.$CPOST('/transferAccount/findDetailed',{
        pageNum:this.page.current,
        pageSize:this.page.pageSize,
        startTime:this.search.time[0],
        endTime:this.search.time[1],
        fromType:this.selectName
      },(res)=>{
        loading.close();
        let data=res.data.list;
        this.tableArr=data;
        this.page.total=res.data.total;
      })
    },
    //下一页
    nextPage(_d){
      this.page.current=_d;
      this.searchL();
    },
    /*close(){
      this.isRelease=false;
    },*/
    //发布需求
    /*send(){
      this.isRelease=true;
    },*/
  }
}
</script>

<style scoped>
.distribution-main{
        background: #fff;
        margin-top: 4px;
    }
.vbank_container{
    font-family:'PingFangSC-Semibold';
}
.card_box{
    height: 210px;
    background: #fff;
}
.card_box_title{
    height: 80px;
    padding:0 20px;
}
.card_box_title label,.card_box_title strong{
    display:block;
    float: left;
    margin-right: 30px;
    line-height: 80px;
}
.card_box_title label{
    font-size: 14px;
    color:#909090;
}
.card_box_title strong{
    font-size: 18px;
}
.card_box_ul{
    height: 104px;
    display: flex;
    margin:0 20px;
    background:linear-gradient(180deg,rgba(252,253,254,1) 0%,rgba(247,250,252,1) 100%);
}
.card_box_ul li{
    padding:10px 20px;
    flex: 1;
    line-height: 40px;
    color: #333333;
}
.card_box_ul li h3{
    font-weight: 500;
    color:#909090;
    font-size: 14px;
}
.card_box_ul li p{
    font-size: 18px;
    color:#333;
}
.card_box_ul li p strong{
    margin-right: 10px;
}
.card_box_ul li .el-button{
    width: 104px;
    height: 44px;
    margin-top: 20px;
}
.sobox{
    height: 75px;
    line-height: 75px;
    margin:20px 0;
    display: flex;
}
.sobox_input{
    margin-right: 20px;
    font-size: 16px;
    color:#666666;
}
.table_header{
    display: flex;
    background: #fff;
    text-align: center;
    margin-bottom: 5px;
    height: 66px;
    padding:20px;
}
.table_header li{
    flex: 1;
    height: 20px;
    border-right: 1px solid #D9D9D9;
    font-size: 14px;
}
.table_header li:last-child{
    border-right: 0px;
}
.table_body{
    height: 640px;
}
.table_body li{
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    display: flex;
    background: #fff;
    margin-bottom:1px;
    color:#333;
}
.table_body li span{
    flex: 1;
    text-align: center;
}
.list_box{
    height: 800px;
}
.block{
    float: right;
}
</style>
<style scoped>
  .subm{
    padding: 34px 0 54px 0;
    position: relative;
  }
  .submC-input .el-select{
    width: 100%;
  }
  .subm-main{
    padding: 42px 56px;
    background: #fff;
  }
  .subm-progress{
    display: flex;
    align-items: center;
    padding: 0 45px;
    height: 120px;
    background:linear-gradient(270deg,rgba(49,197,255,1) 0%,rgba(40,149,251,1) 100%);
    box-shadow:0px 6px 25px -8px rgba(8,113,193,0.5);
  }
  .subP-bar{
    height: 96px;
    width: 72px;
  }
  .subP-bar div:first-child{
    width: 64px;
    height: 64px;
    border: solid 1px #FFFFFF;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
  }
  .subP-bar div:first-child div{
    width: 58px;
    height: 58px;
    background: #fff;
  }
  .subP-left div:first-child div span{
    background: url(../../assets/img/sendA.png) no-repeat;
    display: inline-block;
    width: 33px;
    height: 28px;
  }
  .subP-right div:first-child div span{
    background: url(../../assets/img/success.png) no-repeat;
    display: inline-block;
    width: 29px;
    height: 29px;
  }
  .subP-bar div:last-child{
    text-align: center;
    font-size: 18px;
    color: #fff;
  }
  .subP-center{
    width: 790px;
    height: 8px;
    border-radius:8px;
    background:#79d8ff;
    margin: 0 31px;
    position: relative;
  }
  .subP-opcity{
    opacity: 0.6
  }
  .subP-center-bar{
    background: #fff;
    height: 8px;
    border-radius: 8px;
  }
  .subP-center div:first-child{
    position: absolute;
    width: 40px;
    height: 36px;
    line-height: 32px;
    background: url(../../assets/img/subP_center.png) no-repeat;
    text-align: center;
    color: #0091FF;
    font-size: 14px;
    top: -45px;
  }
  .subm-content{
    width: 996px;
    margin: auto;
    margin-top: 35px;
  }
  .submC-input{
    margin-bottom: 30px;
    /*height: 50px;*/
  }
  .submC-input p{
    display: flex;
    align-items: center;
    height: 46px;
    line-height: 46px;
    font-size: 18px;
    color: #333333;
  }
  .submC-input p span{
    margin-right: 20px;
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #E02020;
  }
  .subm-bottom{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 70px;
  }
  .subm-bottom div{
    width:282px;
    height:66px;
    background:rgba(0,145,255,1);
    box-shadow:0px 6px 25px -8px rgba(8,113,193,0.5);
    border-radius:6px;
    font-size: 22px;
    font-weight: 500;
    color: #fff;
    text-align: center;
    line-height: 66px;
    cursor: pointer;
  }
  .subm-release{
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    background:rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .submR-main{
    width: 588px;
    height: 501px;
    background: url(../../assets/img/release.png) no-repeat;
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .submR-content{
    justify-content: space-between;
    margin-top: 208px;
    margin:138px 0;
    padding:0 50px;
    position: relative;
    height:431px;
    background:#fff;
  }
  .subm-title{
    position:absolute;
    width:588px;
    top:0px;
    left: 0px;
    height: 70px;
    line-height:70px;
    text-align:center;
    background:linear-gradient(270deg,rgba(49,197,255,1) 0%,rgba(40,149,251,1) 100%);
    color:#fff;
    font-size:24px;
  }
  .submR-close{
    width: 29px;
    height: 29px;
    background: url(../../assets/img/close.png) no-repeat;
    position: absolute;
    top: 145px;
    right: -6px;
    cursor: pointer;
  }
  .submR-content-ul{
    position:absolute;
    top:100px;
    width:488px;
  }
   .submR-content-ul li{
       margin:10px 0;
       width:100%;
       color:#333333;
       font-size:18px;
   }
   .submR-btn{
       position: absolute;
       top:300px;
       display:flex;
   }
  .submR-btn .el-button{
      width:201px;
      height: 66px;
      margin:0 20px;
      font-size:20px;
   }
   .card_box_title{
        display: flex;
        justify-content: space-between;
   }
   .card_box_title p{
    flex: 1;
   }
   .distribution-header p:nth-child(1),.distributionM-box p:nth-child(1){
        width:112px;
    }
    .distribution-header p:nth-child(2),.distributionM-box p:nth-child(2){
        width: 116px;
    }
    .distribution-header p:nth-child(3),.distributionM-box p:nth-child(3){
        width: 102px;
    }
    .distribution-header p:nth-child(4),.distributionM-box p:nth-child(4){
        width: 150px;
    }
    .distribution-header p:nth-child(5),.distributionM-box p:nth-child(5){
        width: 247px;
    }
    .distribution-header p:nth-child(6),.distributionM-box p:nth-child(6){
        flex: 1;
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
        text-align:center;
    }
    .distribution-header p{
        border-right: solid 1px #D9D9D9;
        border-left: solid 1px #D9D9D9;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size:14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
    }
    .distributionM-box{
        display: flex;
        height: 60px;
        align-items: center;
        border-bottom: solid 1px rgba(247,250,252,1);
        color: #333;
    }
    .distribution-header{
        height: 66px;
        margin-top: 30px;
        display: flex;
        align-items: center;
        background: #fff;
        color: #555;
    }
</style>