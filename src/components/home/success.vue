<template>
  <div class="home-success zc_auto">
    <header>
      <div></div>
    </header>
    <div class="homeS-content">
      <p>恭喜你！</p>
      <p>需求发布成功啦~</p>
    </div>
    <div class="projectP-btn">
      <div @click='hostDetail()'>查看详情</div>
      <div @click='back'>返回首页</div>
    </div> 
  </div>
</template>

<script>
export default {
	created(){
	},
  data () {
    return {

    }
  },
  methods:{
    back(){
      this.$router.push({path:'/'})
    },
    hostDetail(){
      this.$router.push({'path':'/detail',query:{'id':this.$route.query.id}});
    },
  }
}
</script>


<style scoped>
.home-success{
  padding: 201px 264px 262px 264px;
}
.home-success header{
  width: 100%;
}
.home-success header div{
  width: 200px;
  height: 230px;
  background: url(../../assets/img/katong_big.png) no-repeat;
  margin: auto;
}
.homeS-content{
  margin: 30px 0 70px 0;
}
.homeS-content p{
  width: 100%;
  text-align: center;
  font-size: 24px;
  color: #333;
}
.projectP-btn{
    display: flex;
    justify-content: space-between;
  }
  .projectP-btn div{
    width: 254px;
    height: 66px;
    font-size: 20px;
    color: #666666;
    border-radius:6px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .projectP-btn div:last-child{
    color: #0091FF;
    border:1px solid rgba(0,145,255,1);
  }
  .projectP-btn div:first-child{
    background:rgba(0,145,255,1);
    color: #fff;
  }
</style>
