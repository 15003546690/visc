<template>
  <div class="bg_container zc_auto">
      <div class="bg_leftnav">
        <div class="bg_leftnav_img">
            <p><img :src="userImg"></p>
        </div>
        <ul class="bg_leftnav_nav">
            <li v-for='(i,idx) in navArr' 
              @click='routerTo(i.path,idx)'
              :class="navIdx==idx?'active':''"
              v-if='user=="MONITOR_REGULATOR"'
              >
              {{i.val}}
            </li>
            <li v-for='(i,idx) in navsArr' 
              @click='routerTo(i.path,idx)'
              :class="navIdx==idx?'active':''"
              v-if='user!="MONITOR_REGULATOR"&&user!="CONTROL_COUNCIL"&&user!="VISC_ADMIN"'
              >
              {{i.val}}
            </li>
            <li v-for='(i,idx) in moneyArr' 
              @click='routerTo(i.path,idx)'
              :class="navIdx==idx?'active':''"
              v-if='user=="CONTROL_COUNCIL"||user=="VISC_ADMIN"'
              >
              {{i.val}}
            </li>
        </ul>
      </div>
      <div class="bg_content">
         <router-view></router-view>
      </div>
  </div>
</template>

<script>
export default {
	created(){
    this.refresh();
    this.currentD();
	},
  data () {
    return {
      userImg:'',
      user:sessionStorage.getItem('user'),
      navIdx:0,
      moneyArr:[//发行调控委员会
        {
          val:'视联央行',
          path:'bank'
        },
        {
          val:'个人中心',
          path:'pcenter'
        },
        {
          val:'转账',
          path:'transferaccounts'
        }
      ],
      navArr:[//检查小组
        /*{
          val:'视联央行',
          path:'bank'
        },*/
        {
          val:'视联币分配',
          path:'distribution'
        },
        {
          val:'支付配置',
          path:'configuration'
        },
        {
          val:'个人中心',
          path:'pcenter'
        },
        {
          val:'转账',
          path:'transferaccounts'
        }
      ],
      navsArr:[//贫民//统筹小组
        {
          val:'个人中心',
          path:'pcenter'
        },
        {
          val:'转账',
          path:'transferaccounts'
        }
      ]
    }
  },
  methods:{
    currentD(){
      this.$UPOST('/api/umc/user/findUserByUserId',{
        userId:this.$Id,
      },(res)=>{
        this.userImg=res.data.pictureBase64;
      })
    },
    refresh(){
      let hash=window.location.hash;
      if(this.user=='MONITOR_REGULATOR'){
        if(hash=='#/backstage/transferaccounts'){
          this.navIdx=3;
        }else if(hash=='#/backstage/pcenter'){
          this.navIdx=2;
        }else if(hash=='#/backstage/configuration'){
          this.navIdx=1;
        }else if(hash=='#/backstage/distribution'){
          this.navIdx=0;
        }
      }else{
        if(hash=='#/backstage/transferaccounts'){
          this.navIdx=1;
        }else if(hash=='#/backstage/pcenter'){
          this.navIdx=0;
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


<style scoped>
.bg_container{
  display: flex;
  padding: 99px 0 70px 0;
}
.bg_leftnav{
   width:282px;
   margin-right: 24px;
   background: #fff;
   height: 1002px;
   max-height: 1002px;
}
.bg_leftnav_img{
  height: 235px;
  margin-bottom:1px;
  background: #fff;
}
.bg_leftnav_img > p{
  width: 124px;
  height: 124px;
  margin:0 auto;
  background: #eee;
  border-radius: 50%;
  position:relative;
  top:50%;
  transform: translateY(-50%);
  overflow: hidden;
}
.bg_leftnav_img p img{
  width: 100%;
}
.bg_leftnav_nav{
  background: #fff;
  height: 720px;
}
.bg_leftnav_nav li{
  text-align: center;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  cursor: pointer;
}
.bg_leftnav_nav li.active{
   background:#0091FF;
   color:#fff;
}
.bg_content{
  flex: 1;
}
</style>
