<template>
  <div class="index">
    <div class="index-message" v-show='!messages' @click='mesg'>
      <img src="../assets/img/message.png" alt="">
      <div v-show='noNum>0'>{{noNum}}</div>
    </div>
    <div class="indexM-list zc-shadow animated heartBeat " v-show='messages'>
      <div class="indexM-list-top">
        <div @click='mesg'></div>
        <p v-for='(i,idx) in mesTopL' 
           :class="mesTopLIdx==idx?'indexM-list-top-active':''" 
           @click='messageCK(idx)'>{{i}}
           <span v-show='mesTopLIdx==idx'></span>
        </p>
      </div>
      <ul>
        <li v-for='i in messageList' @click='msg(i)'>
          <div><p v-show='i.status==0'></p></div>
          <div>
            <p :title='i.msg'>{{i.msg}}</p>
            <p><span>{{i.sendUserName}}</span><span>{{i.createtime}}</span></p>
          </div>
        </li>
      </ul>
      <div v-show='messageList.length<=0' class='zc-bzc'>暂无消息</div>
    </div>
    <header>
      <div class="header-main">
        <div class="headerM-left" @click='logom'>
          <span></span>
        </div>
        <div class="headerM-right">
          <ul>
            <!-- <router-link to='/home'> -->
            <li v-for='(i,idx) in cggArr' 
                v-if='user=="VISC_ADMIN"'
                @click='routerTo(i.path,idx)'
                :class="navIdx==idx?'nav-active':''"
                >
                <p>{{i.val}}</p>
                <span :class="navIdx==idx?'headerM-right-active box animated wobble':''"></span>
            </li>
            <li v-for='(i,idx) in navArr' 
                v-if='user=="USER_PUBLISH"'
                @click='routerTo(i.path,idx)'
                :class="navIdx==idx?'nav-active':''"
                >
                <p>{{i.val}}</p>
                <span :class="navIdx==idx?'headerM-right-active box animated wobble':''"></span>
            </li>
            <li v-for='(i,idx) in tPNavArr'
                v-if='user=="MONITOR_REGULATOR"||user=="CONTROL_COUNCIL"'
                @click='routerTo(i.path,idx)'
                :class="navIdx==idx?'nav-active':''"
                >
                <p>{{i.val}}</p>
                <span :class="navIdx==idx?'headerM-right-active box animated wobble':''"></span>
            </li>
            <li v-for='(i,idx) in yNavArr'
                v-if='user=="USER_CLAIM"||user=="MONITOR_TP"'
                @click='routerTo(i.path,idx)'
                :class="navIdx==idx?'nav-active':''"
                >
                <p>{{i.val}}</p>
                <span :class="navIdx==idx?'headerM-right-active box animated wobble':''"></span>
            </li>
          </ul>
          <div @click='out'>
            退出
          </div>
        </div>
      </div>
    </header>
    <div class="content">
      <router-view class='routerV'></router-view>
    </div>
    <div></div>
    <footer>
      <div class="footer-top">
        <ul>
          <li v-for='(i,idx) in cggArr' 
              @click='routerTo(i.path,idx)'
              v-if='user=="VISC_ADMIN"'>
            {{i.val}}
          </li>
          <li v-for='(i,idx) in navArr' 
              @click='routerTo(i.path,idx)'
              v-if='user=="USER_PUBLISH"'>
            {{i.val}}
          </li>
          <li v-for='(i,idx) in tPNavArr' 
              @click='routerTo(i.path,idx)'
              v-if='user=="MONITOR_REGULATOR"||user=="CONTROL_COUNCIL"'>
            {{i.val}}
          </li>
          <li v-for='(i,idx) in yNavArr' 
              @click='routerTo(i.path,idx)'
              v-if='user=="USER_CLAIM"||user=="MONITOR_TP"'>
            {{i.val}}
          </li>
          <!-- <li>首页</li>
          <li>任务中心</li>
          <li>
            <span v-show='user=="USER_PUBLISH"'>我的需求</span>
            <span v-show='user=="USER_CLAIM"'>我的任务</span>
          </li>
          <li>财务报表</li>
          <li>后台管理</li> -->
        </ul>
        <div @click='logom'></div>
      </div>
      <div class="footer-bottom">
        <p>版权所有 2019 VisionVera视联动力信息技术股份有限公司 京ICP备11007243号-1</p>
        <p><span></span>京公网安备 11010102000375号</p>
      </div>
    </footer>
    <Prompt v-if='prompt.isPrompt' @close='close' :prompt='prompt'></Prompt>
  </div>
</template>

<script>
import Prompt from './common/prompt';
export default {
  components:{
    Prompt,
  },
  watch:{
    $route(to,from){
      this.refresh();
    },
    '$store.state.websockNum': {
        deep: true,
        handler: function (val){
          this.messageD(0);
        }
    }
  },
  created(){
    let time;
    if(this.user!=null){
      clearInterval(time)
    }else{
      time=setInterval(()=>{
        history.go(0);
      })
    }
    if(this.user=='CONTROL_COUNCIL'){//如果是调控委员会
      this.tPNavArr[4].path='/backstage/bank';
    }
    this.currentD();
    // sessionStorage.setItem("user","USER_CLAIM");//研发方
    // sessionStorage.setItem("user","USER_PUBLISH");//需求方
    // sessionStorage.setItem("user","MONITOR_TP");//统筹小组
    // sessionStorage.setItem("user","MONITOR_REGULATOR");//监察小组
    this.refresh();
  },
  data () {
    return {
      noNum:'',
      mesTopLIdx:0,
      mesTopL:['未读消息','全部消息'],
      messagesNum:'29',
      prompt:{//弹框
        isPrompt:false,
        status:'',//
      },
      messageList:[],
      messages:false,
      user:sessionStorage.getItem('user'),
      num:sessionStorage.getItem('num'),
      navIdx:0,
      cggArr:[
        {
          val:'首页',
          path:'/cgg'
        },
        {
          val:'任务中心',
          path:'/task'
        },
        {
          val:'我的任务',
          path:'/demand'
        },
        {
          val:'财务报表',
          path:'/finance'
        },
        {
          val:'后台管理',
          path:'/backstage/bank'
        }
      ],
      navArr:[//需求方
        {
          val:'首页',
          path:'/home'
        },
        {
          val:'任务中心',
          path:'/task'
        },
        {
          val:'我的需求',
          path:'/demand'
        },
        {
          val:'后台管理',
          path:'/backstage/pcenter'
        }
      ],
      yNavArr:[//研发方/统筹小组
        {
          val:'首页',
          path:'/home'
        },
        {
          val:'任务中心',
          path:'/task'
        },
        {
          val:'我的任务',
          path:'/demand'
        },
        {
          val:'后台管理',
          path:'/backstage/pcenter'
        }
      ],
      tPNavArr:[//监察小组/调控委员会（CONTROL_COUNCIL）
        {
          val:'首页',
          path:'/home'
        },
        {
          val:'任务中心',
          path:'/task'
        },
        {
          val:'我的任务',
          path:'/demand'
        },
        {
          val:'财务报表',
          path:'/finance'
        },
        {
          val:'后台管理',
          path:'/backstage'
        }
      ]
    }
  },
  methods:{
    messageCK(idx){
      this.mesTopLIdx=idx;
      if(idx==0){
        this.messageD(0);
      }else if(idx==1){
        this.messageD();
      }
    },
    out(){
      this.DelCookie('id');
      this.DelCookie('token');
      window.location.href=this.$isLogo;
    },
    msg(_d){
      this.prompt.isPrompt=true;
      this.prompt.status=8;
      this.prompt['arr']=_d;
    },
    //弹窗关闭
    close(_d,radio){
      this.prompt.isPrompt=false;
      this.messageD(0);
    },
    mesg(){
      this.messages=!this.messages;
    },
    logom(){
      this.$router.push({path:'/'})
    },
    //即时通讯
    messageD(data){
      this.$CPOST('/userMsg/findNoRedMsg',{
        status:data
      },(res)=>{
        let _d=res.data.list;
        this.messageList=_d;
        if(data==0){
          this.noNum=res.data.size;
        }
      })
    },
    currentD(){
      this.$UPOST('/api/umc/user/findUserByUserId',{
        userId:this.$Id,
        menuId:this.$menuId
      },(res)=>{
        let data=res.data.roles;
        if(data.length>0){
          let _d=sessionStorage.setItem("user",data[0].roleName);
        }else{
          this.$message({
            message:'缺少角色请联系管理员',
            type:'error'
          })
          setTimeout(()=>{
            window.location.href=this.$isLogo;
          },1000);
        }
      })
      this.messageD(0);
    },
    refresh(){
      let hash=window.location.hash;
      if(this.user=='MONITOR_REGULATOR'||this.user=='CONTROL_COUNCIL'||this.user=='VISC_ADMIN'){
        if(hash.search("home")!=-1){
          this.navIdx=0;
        }else if(hash.search("task")!=-1){
          this.navIdx=1;
        }else if(hash.search("demand")!=-1){
          this.navIdx=2;
        }else if(hash.search("finance")!=-1){
          this.navIdx=3;
        }else if(hash.search("backstage")!=-1){
          this.navIdx=4;
        }
      }else{
        if(hash.search("home")!=-1){
          this.navIdx=0;
        }else if(hash.search("task")!=-1){
          this.navIdx=1;
        }else if(hash.search("demand")!=-1){
          this.navIdx=2;
        }else if(hash.search("backstage")!=-1){
          this.navIdx=3;
        }
      }
    },
    routerTo(url,idx){
      this.$router.push({path:url});
      this.navIdx=idx;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index header{
  height: 92px;
  background: url(../assets/img/banner_top.png) no-repeat;
  background-size: 100% 92px;
}
.header-main{
  display: flex;
  width: 1200px;
  margin:auto;
  height: 92px;
  line-height: 92px;
}
.headerM-left{
  width: 220px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.headerM-left span{
  background: url(../assets/img/logo.png) no-repeat;
  display: inline-block;
  width: 220px;
  height: 50px;
}
.headerM-left p{
  font-size: 29px;
  color: #F7FAFC;
}
.headerM-right{
  display: flex;
  margin-left: 200px;
  flex: 1;
  justify-content: flex-end;
}
.content{
  min-height: 680px;
}
.headerM-right ul{
  display: flex;
  justify-content: space-around;
  width: 420px;
}
.headerM-right ul li{
  text-align: center;
  color: #fff;
  font-size: 16px;
  padding: 0 5px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.headerM-right-active{
  margin-top: 0;
  display: inline-block;
  width: 50px;
  height: 4px;
  background: #fff;
  position: absolute;
  top: 70px;
  margin-left: -25px;
}
.headerM-right div{
  font-size: 16px;
  color: #fff;
  display: flex;
  margin-left: 80px;
  cursor: pointer;
}
.headerM-right div:before{
  content: url(../assets/img/out.png);
  margin-right: 4px;
  margin-top: 2px;
}
.index footer{
  height: 200px;
  background: #333333;
}
.footer-top{
  width: 825px;
  margin: auto;
  height: 83px;
  border-bottom: solid 1px #666666;
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}
.footer-top ul{
  display: flex;
  color: #fff;
  font-size: 16px;
  flex: 1;
  justify-content: space-between;
  margin-right: 114px;
}
.footer-top ul li{
  cursor: pointer;
}
.footer-top div{
  width: 110px;
  height: 29px;
  background: url(../assets/img/logo1.png) no-repeat;
  cursor: pointer;
}
.footer-bottom{
  width: 825px;
  margin: auto;
  text-align: center;
  color: #999999;
}
.footer-bottom p{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 34px;
}
.footer-bottom p:last-child span{
  display: inline-block;
  width: 20px;
  height: 20px;
  background: url(../assets/img/police.png) no-repeat;
  margin-right: 6px;
}
.nav-active{
  font-size: 20px !important;
}
.index-message{
  width: 60px;
  height: 60px;
  background-color: #0091FF;
  /*background: url(../assets/img/message.png) no-repeat center;*/
  /*background-size: 100%;*/
  position: fixed;
  right: 16px;
  bottom: 0px;
  z-index: 99;
  cursor: pointer;
  border-radius: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.index-message img{
  width: 33px;
  height: 26px;
}
.index-message div{
  color: #fff;
  background: red;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  position: absolute;
  right: 4px;
  top: 5px;
}
.indexM-list{
  width: 382px;
  height: 300px;
  position: fixed;
  right: 0px;
  bottom: 0px;
  z-index: 99;
  padding: 20px 3px 20px 20px;
  background: #fff;
}
.zc-bzc{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  font-size: 24px;
  color: #ccc;
}
.indexM-list ul{
  overflow: auto;
  overflow-y: auto;
  padding-bottom: 38px;
  height: 259px;
}
.indexM-list ul li{
  padding: 24px 0;
  width: 100%;
  height: 110px;
  cursor: pointer;
  border-bottom: solid 1px #D9D9D9;
  display: flex;
  padding-right: 20px;
  /* overflow: hidden;
  white-space: nowrap;
  text-overflow:ellipsis; */
}
.indexM-list ul li:last-child{
  border: none;
}
.indexM-list ul li div:first-child{
  width: 8px;
  margin-right: 18px;
  display: flex;
}
.indexM-list ul li div:first-child p{
  width:8px;
  height:8px;
  background:rgba(224,32,32,1);
  border-radius: 50%;
  margin-top: 10px;
}
.indexM-list ul li div:last-child{
  font-size: 14px;
}
.indexM-list ul li div:last-child p:last-child{
  display: flex;
  margin-top: 12px;
  color: #999;
}
.indexM-list ul li div:last-child p:first-child{
  width: 100%;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.indexM-list ul li div:last-child p:last-child span:last-child{
  flex:1;
  display: flex;
  justify-content: flex-end;
}
.indexM-list-top div:first-child{
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  width: 18px;
  height: 2px;
  background: #999;
  position: absolute;
  right: 30px;
    top: 28px;
  opacity: 0.7;
  cursor: pointer;
} 
.indexM-list-top{
  height: 50px;
  display: flex;
}
.indexM-list-top p{
  margin-right: 40px;
  font-size: 16px;
  color: #333;
  cursor: pointer;
}
.indexM-list-top p span{
  display: block;
  width: 54px;
  height: 4px;
  background: #0091FF;
  margin: 7px 0 0 10px;
}
.indexM-list-top-active{
  font-size: 18px !important;
  font-weight:600;
  border-bottom: 
}
</style>
