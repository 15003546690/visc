<template>
  <div class="trans">
    <div class="trans-payee">
        <div class="trans-title">收款人：</div>
        <div class="detailMLP-btn" @click='addPlan' v-show='people.length<=0'>+ 添加收款人</div>
        <div v-show='people.length>0'>
            <p v-for='(i,idx) in people'>{{i.label}}<span @click='deletePeople(idx)'>×</span></p>
            <p @click='addPeople'>添加</p>
        </div>
    </div>
    <div class="trans-money">
        <div class="trans-title">转账金额：</div>
        <el-input placeholder='请输入转账金额' v-model='prompt.visc' @input='backNum(prompt.visc)'></el-input>
    </div>                                                      
    <div class="trans-explain">
        <div class="trans-title">转账说明（选填）：</div>
        <el-input placeholder='请输入转账说明' v-model='prompt.explain' maxlength='25'></el-input>
    </div>
    <div class="trans-explain">
        <div class="trans-title">转账类型：</div>
        <el-radio v-model="prompt.isCovery" label="2">普通</el-radio>
        <el-radio v-model="prompt.isCovery" label="1">回收</el-radio>
    </div>
    <el-button type='primary' @click='accounts(3)'>确定转账</el-button>
    <Prompt v-if='prompt.isPrompt' @close='close' :prompt='prompt'></Prompt>
    <Partner  v-if='partner.isPartner' @nextBtn='nextBtn' @prevBtn='prevBtn'></Partner>
  </div>
</template>

<script>
import Prompt from '../common/prompt';
import Partner from '../common/partner'
export default {
    components:{
        Prompt,
        Partner
    },
    created(){
    },
  data () {
    return {
        prompt:{//弹框
            isPrompt:false,
            status:'',//
            isCovery:'2',//是否回收
            people:[],
            visc:'',
            explain:''
        },
        partner:{//弹框
            isPartner:false,
        },
        plan:true,
        people:[],
    }
  },
  methods:{
    //删除人
    deletePeople(idx){
        this.people.splice(idx,1);
    },
    //上一步
    prevBtn(){
        this.partner.isPartner=false;
    },
    backNum(val){
      this.prompt.visc=this.$Num(val);
    },
    //P添加人
    addPeople(){
       this.partner.isPartner=true;
    },
    //弹框选择人下一步
    nextBtn(val){
        this.people=[];
        this.partner.isPartner=false;
        this.people=val;
    },
    //确认转账
    accounts(id){
        if(this.prompt.isCovery==2&&this.people.length<=0){
            this.$message.error('请选择收款人');
        }else if(this.prompt.visc<=0){
            this.$message.error('转账金额不能小于0');
        }else if(this.prompt.explain==''){
            this.$message.error('描述不能为空')
        }else{
            this.prompt.isPrompt=true;
            this.prompt.status=id;
            this.prompt.people=this.people;
        }
    },
    //添加收款人
    addPlan(){
      this.plan=false;
      this.partner.isPartner=true;
    },
    //弹窗关闭
    close(){
      this.prompt.isPrompt=false;
    },
  }
}
</script>


<style scoped>
.detailMLP-btn{
    margin-bottom: 40px;
    height: 50px;
    background: #F7FAFC;
    color: #0091FF;
    font-size: 16px;
    text-align: center;
    line-height: 50px;
    margin-top: 10px;
    font-weight:bold;
    cursor: pointer;
  }
.trans-explain{
    margin: 40px 0;
}
.trans{
    height: 1002px;
    max-height: 1002px;
    background: #fff;
    padding: 32px 20px;
}
.trans-title{
    font-size: 18px;
    font-weight:400;
    color:rgba(51,51,51,1);
    margin-bottom: 20px;
}
.trans-payee div:last-child{
    display: flex;
    margin-bottom: 39px;
    flex-wrap: wrap;
}
.trans-payee div:last-child p{
    margin-right: 12px;
    padding: 6px 22px 6px 22px;
    background:rgba(247,250,252,1);
    border-radius:16px;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 10px;
}
.trans-payee div:last-child p span{
    margin-left: 18px;
    cursor: pointer;
}
.trans-payee div:last-child p:last-child{
    color: #0091FF;
    cursor: pointer;
}
</style>
