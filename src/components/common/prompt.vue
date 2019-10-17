<!-- prompt:{//弹框
  isPrompt:true,
  status:1,//0.邀请**参加项目，1.确认承接，2.删除此项目计划,3.转账,4.视联币分配,5.前期支付,6.支付尾款，7.确认立项，8.是否接受来自***的邀请
}, -->
<template>
  <div class="prompt zc_layer">
    <div class="zc_layer_box prompt-main">
      <div class="promptM-top"></div>
      <div class="promptM-content">
        <p class="promptM-close" @click='close'></p>
        <div class="promptMC-top">
          提示
          <span></span>
          <span></span>
        </div>
        <div v-if='prompt.status==8'>
          <div class="promptMC-center">
            {{prompt.arr.msg}}
          </div>
          <div class="projectP-btn">
            <div @click='yq(true)'>接受</div>
            <div @click='yq(false)'>拒绝</div>
          </div> 
        </div>
        <div v-if='prompt.status==0'>
          <div class="promptMC-center">
            确认邀请 <span v-for='i in prompt.arr'>"{{i.label}}"、</span> 参加项目吗？
          </div>
          <div class="projectP-btn">
            <div @click='commit()'>发送</div>
            <div @click='close'>取消</div>
          </div> 
        </div>
        <div v-if='prompt.status==7'>
          <div class="promptMC-center">
            确认立项吗？
          </div>
          <div class="projectP-radio">
            <el-radio v-model="radio" label="0">是</el-radio>
            <el-radio v-model="radio" label="1">否</el-radio>
          </div>
          <div class="projectP-btn">
            
            <div @click='commit(7)'>确认</div>
            <div @click='close'>取消</div>
          </div> 
        </div>
        <div v-if='prompt.status==6'>
          <div class="promptMC-center">
            确认支付尾款吗？
          </div>
          <div class="projectP-btn">
            <div @click='commit(6)'>确认</div>
            <div @click='close'>取消</div>
          </div> 
        </div>
        <div v-if='prompt.status==5'>
          <div class="promptMC-center">
            确认支付预付款吗？
          </div>
          <div class="projectP-btn">
            <div @click='commit(5)'>确认</div>
            <div @click='close'>取消</div>
          </div> 
        </div>
        <div v-if='prompt.status==1'>
          <div class="promptMC-center">
            确认承接此项目吗？
          </div>
          <div class="projectP-btn">
            <div @click='commit(1)'>确认</div>
            <div @click='close'>取消</div>
          </div> 
        </div>
        <div v-if='prompt.status==2'>
          <div class="promptMC-center">
            确认删除此项目计划吗？
          </div>
          <div class="projectP-btn">
            <div @click='commit(2)'>确认</div>
            <div @click='close'>取消</div>
          </div> 
        </div>
        <div v-if='prompt.status==3' style="padding: 20px 50px 50px 50px">
          <div class="promptM-man">
            <span></span>
            <span>收款人</span>
            <p v-show='prompt.isCovery==2'><i v-for='i in prompt.people'>{{i.label}}</i></p>
            <p v-show='prompt.isCovery==1' style="display: flex;">视联央行</p>
          </div>
          <div class="promptM-mony">
            <span></span>
            <span>转账金额</span>
            <p>{{Number(prompt.visc).toLocaleString()}}</p>
          </div>
          <div class="promptM-explain">
            <span>说明</span>
          </div>
          <div>
            <el-input v-model='prompt.explain' :disabled="true"></el-input>
          </div>
          <div class="promptM-button">
            <div @click='commit()'>确定</div>
            <div @click='close'>取消</div>
          </div>
        </div>
        <div v-if='prompt.status==4' style="padding: 20px 50px 50px 50px">
          <div class="dBution-man">
            <span>当前视联币：</span>
            <span>{{Number(prompt.coin).toLocaleString()}}</span> 
          </div>
          <div class="promptM-explain">
            <span>分配金额</span>
          </div>
          <div>
            <el-input v-model='money' @input='backNum(money)'></el-input>
          </div>
          <div class="promptM-button">
            <div @click='commit()'>确定</div>
            <div @click='close'>取消</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	created(){
    
	},
  props:[
      'prompt'
  ],
  data () {
    return {
      radio:'0',
      money:''//==4的时候分配金额
    }
  },
  methods:{
    backNum(val){
      this.money=this.$iNum(val);
    },
    commit(status){
      if(this.prompt.status==4){
        this.$CPOST('/userCoin/addUserCoin',{
          userIds:this.prompt.userAll,
          coin:this.money,
          operatorId:1 
        },(res)=>{
          if(res.code==200){
            this.$message.success(res.msg);
            this.close();
          }else{
            this.$message.error(res.msg);
          }
        })
      }else if(this.prompt.status==3){//确认转账
        let arr=[];
        for(let i=0;i<this.prompt.people.length;i++){
          arr.push(this.prompt.people[i].key)
        }
        this.$CPOST('/transferAccount/transfer',{
          users:arr,
          visc:this.prompt.visc,
          remark:this.prompt.explain,
          transferType:this.prompt.isCovery
        },(res)=>{
          if(res.code!=200){
            this.$message.error(res.msg)
          }else{
            this.close();
            this.$message.success(res.msg)
          }
        })
      }else if(this.prompt.status==0){
        let person=JSON.parse(sessionStorage.getItem('person')),
            _d=JSON.parse(sessionStorage.getItem('data'));
        let arr=[];
        for(let i=0;i<this.prompt.arr.length;i++){
          arr.push({
            employerId:this.prompt.arr[i].key,
            payPercent:this.prompt.arr[i].ipt
          })
        }
        _d['emlyerProjectStr']=JSON.stringify(arr);
        _d['var2']=1;
        let url='';
        if(this.$route.query.id){
          url='/project/updateProject';
          _d['projectId']=this.$route.query.id;
        }else{
          url='/project/addProject';
        }
        this.$CPOST(url,_d,(res)=>{
          if(res.code==200){
            this.$router.push({path:'/home/success',query:{'id':res.data}});
          }else{
            this.$message.error(res.msg)
          }
        })
      }else if(status==2){
        this.$emit('close',2,this.prompt.projectPlanId);
      }else if(status==1){
        this.$emit('close',1);
      }else if(status==5){
        this.$emit('close',5);
      }else if(status==6){
        this.$emit('close',6);
      }else if(status==7){
        this.$emit('close',7,this.radio);
      }
    },
    close(){
      this.$emit('close');
    },
    //是否接受来自超哥哥的邀请
    yq(_d){
      this.$CPOST('/emplyerProject/updateEmplyerProject',{
          projectId:this.prompt.arr.projectId,
          status:_d,
          userMsgId:this.prompt.arr.userMsgId
        },(res)=>{
          if(res.code==200){
            this.close();
          }else{
            this.$message.error(res.msg)
          }
        })
    }
  }
}
</script>


<style scoped>
  .promptM-button{
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  .promptM-button div{
    width:202px;
    height:66px;
    border-radius:2px; 
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .promptM-button div:first-child{
    background: #0091FF;
    color: #fff;
  }
  .promptM-button div:last-child{
    color: #666666;
    border:1px solid rgba(151,151,151,1);
  }
    .promptM-mony,.promptM-explain,.dBution-man{
      margin-top: 20px;
      height: 34px;
      display: flex;
      align-items: center;
      font-size: 18px;
      color: #333;
    }
    .dBution-man span:first-child{
      color: #333;
    }
    .dBution-man span:last-child{
      color: #333;
      font-size: 22px;
    }
    .promptM-mony span:first-child{
      display: inline-block;
      width: 18px;
      height: 18px;
      background: url(../../assets/img/money_layer.png) no-repeat;
      margin-right: 17px;
    }
    .promptM-mony p{
      color: #E02020;
      flex: 1;
      display: flex;
      justify-content: flex-end;
    }
  .promptM-man{
    height: 34px;
    display: flex;
    align-items: center;
    font-size: 18px;
    color: #333;
  }
  .promptM-man span:first-child{
    display: inline-block;
    width: 16px;
    height: 17px;
    background: url(../../assets/img/man_layer.png) no-repeat;
    margin-right: 18px;
  }
  .promptM-man p i{
    font-style: normal;
    margin-right: 10px;
  }
  .promptM-man p{
    text-align: right;
    width: 300px;
    flex: 1;
    /*display: flex;*/
    justify-content: flex-end;
    padding-left: 80px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .prompt-main{
    width: 588px;
    min-height: 503px;
    position: relative;
  }
  .promptM-top{
    width: 200px;
    height: 230px;
    position: absolute;
    background: url(../../assets/img/katong.png) no-repeat;
    background-size: 100%;
    left: 50%;
    margin-left: -100px;
  }
  .promptM-content{
    position: absolute;
    background: #fff;
    min-height: 364px;
    width: 100%;
    bottom: 0;
  }
  .promptMC-top{
    height:70px;
    background:linear-gradient(270deg,rgba(49,197,255,1) 0%,rgba(40,149,251,1) 100%);
    font-size: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    position: relative;
  }
  .promptMC-top span{
    width: 27px;
    height: 27px;
    display: inline-block;
    background:linear-gradient(180deg,rgba(0,118,190,1) 0%,rgba(74,178,247,1) 100%);
    box-shadow:0px 2px 7px -3px rgba(0,92,161,1);
    border-radius: 50%;
    position: absolute;
    top: -12px;
  }
  .promptMC-top span:first-child{
    left: 176px;
  }
  .promptMC-top span:last-child{
    right: 176px;
  }
  .promptM-close{
    width: 30px;
    height: 30px;
    background: url(../../assets/img/close_fff.png) no-repeat;
    position: absolute;
    right: 0;
    z-index: 99;
    top: 15px;
    cursor: pointer;
  }
  .promptMC-center{
    margin-bottom: 43px;
    padding:59px 111px 47px 111px;
    font-size: 20px;
    color: #333333;
    text-align: center;
  }
  .projectP-btn{
    display: flex;
    justify-content: space-between;
   padding: 0 65px;
  }
  .projectP-btn div{
    width: 202px;
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
    border: 1px solid rgba(151,151,151,1);
  }
  .projectP-btn div:first-child{
    background:rgba(0,145,255,1);
    color: #fff;
  }
  .projectP-radio{
    width: 100%;
    display: flex;
    justify-content: center;
    margin: -50px 0 30px 0;
  }
</style>
