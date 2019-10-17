<template>
    <div class="config_container">
        <ul class="config_list">
           <li>
               <p>认领支付百分比：</p>
               <el-input v-model='claimPercent' @input='inputNum(claimPercent,"claimPercent")'></el-input>
            </li> 
           <li></li> 
           <li>
               <p>可行性分析金币百分比：</p>
               <el-input v-model='analysePercent' @input='inputNum(analysePercent,"analysePercent")'></el-input>
            </li> 
           <li><el-button type="primary" @click='save()'>保存</el-button></li>
        </ul>
    </div>
</template>

<script>
    export default {
      created(){
        this.currentD();
      },
        data() {
            return {
              claimPercent:'',//认领
              analysePercent:''//分析
            }
        },
        methods:{
          save(){
            const loading = this.$loading(this.$store.state.loading);
            this.$CPOST('/payConf/addPayConf',{
              claimPercent:this.claimPercent,
              analysePercent:this.analysePercent
            },(res)=>{
              loading.close();
              if(res.code==200){
                this.$message.success(res.msg);
              }else{
                thsi.$message.error(res.msg);
              }
            })
          },
          currentD(){
            const loading = this.$loading(this.$store.state.loading);
            this.$CPOST('/payConf/findPayConf',{
            },(res)=>{
              loading.close();
              let data=res.data;
              this.claimPercent=data.claimPercent;
              this.analysePercent=data.analysePercent;
            })
          },
          inputNum(val,key){
            if(this.claimPercent>=100){
              this.claimPercent=100;
            }
            if(this.analysePercent>=100){
              this.analysePercent=100;
            }
            if(key=='claimPercent'){
              this.claimPercent=this.$Num(this.claimPercent.toString());
            }else{
              this.analysePercent=this.$Num(this.analysePercent.toString());
            }
          }
        }
    }
</script>

<style scoped>
.config_container{
    font-family:'PingFangSC-Semibold';
    background: #fff;
    height: 1002px;
}
.config_list{
    padding:20px;
}
.config_list li{
    font-size:18px;
    margin:20px 0;
    color:#333333;
}
.config_list li p{
    margin-bottom: 10px;
}

</style>