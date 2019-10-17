<template>
  <div class="projectPar zc_auto">
    <header>
      <span></span>
      项目合伙人
    </header>
    <div class="projectP-main">
      <div class="projectP-content">
        <div class="projectP-box" v-for='(i,idx) in person'>
          <div class="projectPB-left">
            <!-- <img src="" alt="123"> -->
            <p>{{i.label}}</p>
          </div>
          <div class="projectPB-right">
            <p>添加视联币配比</p>
            <div>
              <input type="text" @input='inputC(idx)' v-model='i.ipt'><span>%</span>
            </div>
          </div>
        </div>
      </div>
      <div class="projectP-btn">
        <div @click='prev'>取消</div>
        <div @click='send'>发送邀请</div>
      </div> 
    </div>
    <Prompt v-if='isPrompt' @close='close' :prompt='prompt'></Prompt>
  </div>
</template>

<script>
import Prompt from '../common/prompt.vue';
export default {
  components:{
    Prompt
  },
	created(){
    let person=JSON.parse(sessionStorage.getItem('person'));
    for(let i=0;i<person.length;i++){
      this.person.push({
        key:person[i].key,
        label:person[i].label,
        ipt:''
      })
    }
    this.prompt.arr=this.person;
	},
  data () {
    return {
      person:[],
      isPrompt:false,
      prompt:{
        status:0,
        arr:[]
      }
    }
  },
  methods:{
    prev(){
      this.$router.push({'path':'/'})
    },
    //弹窗关闭
    close(){
      this.isPrompt=false;
    },
    //发送
    send(){
      for(let i=0;i<this.prompt.arr.length;i++){
        if(this.prompt.arr[i].ipt==''){
          this.$message.error('请添加视联币配比');
          break
        }else{
          this.isPrompt=true;
        }
      }
    },
    //input发生改变时
    inputC(idx){
      this.person[idx].ipt=this.person[idx].ipt.toString().replace(/[^0-9]/g,'');
      if(this.person[idx].ipt>100){
        this.person[idx].ipt=100;
      }else if(this.person[idx].ipt<=0){
        this.person[idx].ipt=1;
      }
    }
  }
}
</script>


<style scoped>
  .projectPar{
    padding: 24px 0;
  }
  .projectPar header{
    height: 90px;
    display: flex;
    align-items: center;
    color: #333333;
    font-size: 24px;
  }
  .projectPar header span{
    width:8px;
    height:23px;
    background:rgba(0,104,189,1);
    margin-right: 12px;
  }
  .projectP-main{
    padding: 20px 76px;
    background: #fff;
  }
  .projectP-box{
    padding: 40px 0;
    display: flex;
    align-items: center;
  }
  .projectP-content{
    border-bottom: solid 1px #D9D9D9;
  }
  .projectPB-left{
    width: 649px;
    display: flex;
    align-items: center;
  }
  .projectPB-left img{
    display: inline-block;
    width: 102px;
    height: 102px;
    border-radius: 50%;
  }
  .projectPB-left p,.projectPB-right p{
    font-size: 24px;
    color: #333333;
  }
  .projectPB-right{
    flex: 1;
    display: flex;
    align-items: center;
    position: relative;
  }
  .projectPB-right input{
    width: 206px;
    height: 54px;
    margin-left: 25px;
    background:rgba(247,250,252,1);
    border:1px solid rgba(217,217,217,1);
    font-size: 24px;
    color: rgba(0,104,189,1);
    padding:0 30px 0 10px;
  }
  .projectPB-right span{
    position: absolute;
    top: 12px;
    right: 8px;
    color: rgba(0,104,189,1);
    font-size:24px;
  }
  .projectP-btn{
    display: flex;
    justify-content: space-between;
    padding: 36px 204px;
  }
  .projectP-btn div{
    width: 282px;
    height: 66px;
    font-size: 20px;
    color: #666666;
    border-radius:6px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .projectP-btn div:first-child{
    border: 1px solid rgba(151,151,151,1);
  }
  .projectP-btn div:last-child{
    background:rgba(0,145,255,1);
    color: #fff;
  }
</style>
