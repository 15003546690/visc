<!-- cancel:{//弹框
  isPrompt:true,
  status:1,//0.取消需求，1.可行性分析,2.确认完成
}, -->
<template>
  <div class="prompt zc_layer">
    <div class="zc_layer_box prompt-main">
      <div class="promptM-content">
        <p class="promptM-close" @click='close'></p>
        <div class="promptMC-top">
          提示
        </div>
        <div v-show='cancel.status==2'>
          <div class="promptMC-center">
            <p>对该项目评分（0-100分）：</p>
            <el-input v-model='branch' @input='backNum(branch)'
            >
            </el-input>
          </div>
          <div class="promptMC-center">
            <p>完成情况说明</p>
            <el-input
              type="textarea"
              placeholder="请输入说明"
              v-model="textarea"
              maxlength="100"
              show-word-limit
              resize='none'
              :rows="4"
            >
            </el-input>
          </div>
          <div class="projectP-btn">
            <div @click='yes(2)'>确定</div>
            <div @click='close'>取消</div>
          </div> 
        </div>
        <div v-show='cancel.status==1'>
          <div class="promptMC-center">
            <p>分析备注：</p>
            <el-input
              type="textarea"
              placeholder="请输入说明"
              v-model="textarea"
              maxlength="100"
              show-word-limit
              resize='none'
              :rows="4"
            >
            </el-input>
          </div>
          <div class="cancel-upload">
            <el-upload
              class="setting-upload"
              style='margin-right: 0'
              action="http://192.168.112.168:8087/file/upload"
              :data='fileUpload'
              accept=".xlsx,.jpg,.zip,.doc,.docx,.xls,.png,.gif,.txt"
              :before-upload="fileBefore"
              :on-remove="handleRemove"
              :on-success='fileSuccess'
              :file-list="fileUpload.fileList"
              :limit="1"
              drag>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </div>
          <div class="projectP-btn">
            <div @click='yes(0)'>确定</div>
            <div @click='close'>取消</div>
          </div> 
        </div>
        <div v-show='cancel.status==0'>
          <div class="promptMC-center">
            <p>取消项目说明</p>
            <el-input
              type="textarea"
              placeholder="请输入说明"
              v-model="textarea"
              maxlength="100"
              show-word-limit
              resize='none'
              :rows="4"
            >
            </el-input>
          </div>
          <div class="projectP-btn">
            <div @click='yes(1)'>确定</div>
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
    this.textarea='';
  },
  props:[
      'cancel'
  ],
  data () {
    return {
      fileArr:[],
      fileUpload:{   //附件上传
        file:null,
        fileList:[]
      },
      textarea:'',
      branch:'',//分数
    }
  },
  methods:{
    backNum(val){
      this.branch=this.$Num(val);
      if(this.branch>=100){
        this.branch=100;
      }
    },
    //上传相关
    fileBefore (file) {
      this.fileUpload.file=file;
      const loading = this.$loading(this.$store.state.loading);
    },
    //附件上传成功的数量
    fileSuccess(response, file, fileList){
      this.fileArr=[];
      const loading = this.$loading(this.$store.state.loading);
      loading.close();
      if(response.code==200){
        for(let i=0;i<fileList.length;i++){
          this.fileArr.push({
            filepath:fileList[i].response.data,
            filename:fileList[i].name
          })
        }
      }else{
        this.$message.error('上传失败')
      }
    },
    handleRemove(file, fileList) {
      this.fileArr=[];
      for(let i=0;i<fileList.length;i++){
          this.fileArr.push({
            filepath:fileList[i].response.data,
            filename:fileList[i].name
          })
        }
    },
    close(){
      this.$emit('close');
    },
    yes(_d){
      if(_d==0){
        let obj={
          comments:this.textarea,
          var1:this.fileArr[0].filename,
          var3:this.fileArr[0].filepath,
        }
        this.$emit('yes',obj,0);
      }else if(_d==1){
        this.$emit('yes',this.textarea,1);
      }else if(_d==2){
        this.$emit('yes',this.textarea,2,this.branch);
      }
    }
  }
}
</script>

<style>
  .cancel-upload .setting-upload,.cancel-upload .el-upload-dragger,.cancel-upload .el-upload{
    width: 100%;
  }
</style>
<style scoped>
  .prompt-main{
    width: 588px;
    min-height: 500px;
    position: relative;
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
    padding:0 50px;
    font-size: 20px;
    color: #333333;
    
  }
  .promptMC-center p{
    text-align: left;
    margin:36px 0 8px 0;
  }
  .projectP-btn{
    margin-bottom: 44px;
    display: flex;
    justify-content: space-between;
    padding: 0 50px;
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
  .cancel-upload{
    margin: -19px 0 38px 0;
    padding: 0 50px;
  }
</style>
