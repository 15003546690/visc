<!-- readme
    propArr.status==0;联合发起
    propArr.status==1;详情页添加人
 -->
<template>
  <div class="partner zc_layer">
    <div class="partner-main" v-loading="loading">
      <!-- <div>
        <el-tree-select v-model="info.selected"
            :selectParams="selectParams"
            :treeParams="treeParams"
            @searchFun="handleOrgSearchClick"
            @check='nodeCk'
            ref="treeSelect">
        </el-tree-select>
      </div> -->
      <div>
        <el-transfer 
          v-model="info.userName" 
          :data="jobData" 
          filterable 
          :titles="['未选择', '已选择']">
        </el-transfer>
      </div>
      <div class="partnerM-btn">
        <div @click='prevBtn'>上一步</div>
        <div @click='nextBtn'>下一步</div>
      </div>
    </div>
  </div>
</template>

<script>
import elTreeSelect from 'el-tree-select';
export default {
  props:['propArr'],
  components:{
    elTreeSelect
  },
	created(){
    // this.curData();
    this.nodeCk();
	},
  data () {
    return {
      loading:false,
      info:{
        selected:[],//树形筛选值
        userName:[],//穿梭框选取的人
      },
      jobData:[],//穿梭框渲染
      selectParams: {
          multiple: true,
          clearable: true,
          placeholder: '请选择所属部门'
      },
      treeParams: {
          clickParent: false,
          filterable: true,
          'check-strictly': false,//就是那个多选
          'default-expand-all': true,
          'expand-on-click-node': false,
          'render-content': this._renderFun,
          // 'default-checked-keys': [],
          data: [],
          props: {
          children: 'children',
          label: 'orgName',
          disabled: 'disabled',
          value: 'orgId'
          }
      }
    }
  },
  methods:{
    nodeCk(){
      this.jobData=[];
      let _d={};
      if(this.propArr!=undefined){
        if(this.propArr.status==0){
          _d={
            var1:'9450f408395e44558af031ecfb509a4d'
          }
        }else{
          _d={
            var1:'0b13e6f83fb940f6902cfd40ee2941c2'
          }
        }
      }
      this.$CPOST('/userCoin/findAllUserCoin',_d,(res)=>{
          let data=res.data.list;
          for(let i=0;i<data.length;i++){
              this.jobData.push({
                  key:data[i].userId,
                  label:data[i].userName
              })
          }
          for(let i=0;i<this.tableData.length;i++){
            this.info.userName.push(this.tableData[i].userId);
          }
          loading.close();
      })
    },
    handleOrgSearchClick (value) {
        this.$refs.treeSelect.$refs.tree.filter(value);
    },
    curData(){
      this.loading=true;
      this.$UPOST('/api/umc/orignization/findOrgTree',{
      },(res)=>{
          this.loading=false;
          let data = res.data;
          this.info.options = data;
          this.treeParams.data = data;
          this.$refs.treeSelect.treeDataUpdateFun(data);
      })
    },
    //上一步
    prevBtn(){
      this.$emit('prevBtn');
    },
    //下一步
    nextBtn(){
      let arr=[];
      for(let i=0;i<this.jobData.length;i++){
        for(let j=0;j<this.info.userName.length;j++){
          if(this.jobData[i].key==this.info.userName[j]){
            arr.push(this.jobData[i]);
          }
        }
      }
      if(arr.length<=0){
        this.$message.error('请选择人员')
      }else{
        if(this.propArr!=undefined){
          if(this.propArr.status==0){
            sessionStorage.setItem("data", JSON.stringify(this.propArr));
            sessionStorage.setItem("person",JSON.stringify(arr));
            if(this.$route.query.id){
              this.$router.push({'path':'/home/pubmission',query:{id:this.$route.query.id}});
            }else{
              this.$router.push({'path':'/home/pubmission'});
            }
          }else{
            this.$emit('nextBtn',arr);
          }
        }else{
          this.$emit('nextBtn',arr);
        }
      }
    }
  }
}
</script>

<style>
  .partner .el-checkbox{
    display:block !important;
  }
</style>
<style scoped>
  .partner-main{
    background: #fff;
    padding: 50px 30px;
  }
  .partner-main div:first-child{
    margin-bottom: 20px;
  }
  .partnerM-btn{
    display: flex;
    justify-content: space-between;
  }
  .partnerM-btn div{
    width: 200px;
    height: 45px;
    border-radius:6px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 16px;
  }
  .partnerM-btn div:last-child{
    background:rgba(0,145,255,1);
    color: #fff;
  }
  .partnerM-btn div:first-child{
    border:1px solid rgba(151,151,151,1);
    color: #666666;
  }
</style>
