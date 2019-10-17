<template>
  <div class="subm zc_auto">
    <div class="zc-shadow subm-main">
      <div class="subm-progress">
        <div class="subP-left subP-bar">
          <div>
            <div><span></span></div>
          </div>
          <div style="margin-top: 7px;">发起需求</div>
        </div>
        <div class="subP-center">
          <div :style='style.protion'>{{style.num}}</div>
          <div class="subP-center-bar" :style='style.bar'></div>
        </div>
        <div :class="style.curNum>=100?'subP-right subP-bar':'subP-right subP-bar  subP-opcity'">
          <div>
            <div><span></span></div>
          </div>
          <div style="margin-top: 7px;">录入完成</div>
        </div>
      </div>
      <div class="subm-content">
        <div  v-for='i in submInput'>
          <div class="submC-input" v-show='i.type=="input-project"'>
            <p><span></span>{{i.label}}</p>
            <el-input 
              :placeholder='i.placeholder' 
              maxlength="20" 
              v-model='i.val'>
            </el-input>
          </div>
          <div class="submC-input" v-show='i.type=="input"'>
            <p><span></span>{{i.label}}</p>
            <el-input 
              :placeholder='i.placeholder' 
              v-model='i.val'>
            </el-input>
          </div>
          <div class="submC-input" v-show='i.type=="select"'>
            <p><span></span>{{i.label}}</p>
            <el-select v-model='i.val' :placeholder='i.placeholder' clearable>
              <el-option
                v-for="item in i.arr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div class="submC-input" v-show='i.type=="number"'>
            <p><span></span>{{i.label}}</p>
            <el-input 
              type='number'
              :placeholder='i.placeholder'
              v-model='i.val'>
            </el-input>
          </div>
          <div class="submC-input" v-show='i.type=="radio"'>
            <p><span></span>{{i.label}}</p>
            <el-radio 
              v-for='(j,idx) in i.arr'
              :key=idx
              v-model="i.val" 
              :label="j.val">{{j.key}}</el-radio>
          </div>
          <div class="submC-input" v-show='i.type=="date"'>
            <p><span></span>{{i.label}}</p>
            <!-- <el-date-picker
              v-model="abc"
              type="date"
              :placeholder='i.placeholder'>
            </el-date-picker> -->
            <el-date-picker
              v-model="i.val"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
          <div class="submC-input" v-if='i.type=="textarea"'>
            <p><span></span>{{i.label}}</p>
            <quill-editor 
              v-model="i.val"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="handleEditorBlur($event)"
              @focus="handleEditorFocus($event)"
              @change="handleInputChange($event)">
            </quill-editor>
          </div>
        </div>
        <div class="submC-input">
          <p>上传文件</p>
          <el-upload
            class="setting-upload"
            style='margin-right: 0'
            action="http://192.168.112.168:8087/file/upload"
            :data='fileUpload'
            accept=".xlsx,.jpg,.zip,.doc,.docx,.xls,.png,.gif,.txt"
            :before-upload="fileBefore"
            :on-remove="handleRemove"
            :on-success='fileSuccess'
            :file-list="fileUpload.fileList">
            <!-- <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div> -->
            <el-button>选取文件</el-button>
          </el-upload>
        </div>
      </div>
      <div class="subm-bottom">
        <div @click='send()'>发布需求</div>
      </div>
    </div>
    <div class="subm-release" v-show='isRelease'>
      <div class="submR-main">
        <div class="submR-btn">
          <div @click='mPersonal'><span></span>个人发起</div>
          <div @click='unionSend'><span></span>联合发起</div>
        </div>
        <div class="submR-close" @click='close'></div>
      </div>
    </div>
    <Partner @prevBtn='prevBtn' v-if='isPartner' :propArr='propArr'></Partner>
  </div>
</template>

<script>
import toolbarOptions from '../../assets/js/edit.js';
import Partner from '../common/partner.vue';
export default {
  components:{
    Partner
  },
  watch:{
      'submInput':{
        deep: true,
        handler: function (val){
            let len=this.submInput.length;
            let average=100/len;
            let arr=[];
            for(let i=0;i<this.submInput.length;i++){
              let val=this.submInput[i].val;
              if(val!=''&&val!=null){
                arr.push(this.submInput[i]);
              }
            }
            let greater=(len)*average;
            let num=arr.length*average;
            if(num<greater){
              this.style.curNum=num.toFixed(1);
              this.style.num=num.toFixed(1)+'%'
              this.style.bar.width=num+'%';
              this.style.protion.left=num-2.5+'%';
            }else{
              this.style.curNum=100;
              this.style.num='100%';
              this.style.bar.width='100%';
              this.style.protion.left=100-2.5+'%';
            }
          }
      }
  },
	created(){
    let len=this.submInput.length;
    let average=100/len;
    this.style.num=average.toFixed(1)+'%';
    this.style.bar.width=average+'%';
    this.style.protion.left=average-2.5+'%';
    this.currentD();
	},
  mounted(){
    if(this.$route.query.id){
      this.isEcho();
    }
  },
  data () {
    return {
      pickerBeginDateBefore: {
        disabledDate: (time) => {
           let beginDateVal = this.submInput[13].val;
           if (beginDateVal) {
              return time.getTime() > beginDateVal;
           }
        }
       },
      fileArr:[],//附件列表
      propArr:[],//就是各个页面互传的那堆东西
      isPartner:false,
      isRelease:false,
      fileUpload:{   //附件上传
        file:null,
        fileList:[]
      },
      editorOption: {
        placeholder: '',
        theme: 'snow',  // or 'bubble'
        modules: {
          toolbar: {
              container: toolbarOptions,  // 工具栏
              handlers: {
                  'image': function (value) {
                  if (value) {
                    document.querySelector('.avatar-uploader input').click()
                  } else {
                    this.quill.format('image', false);
                  }
                }
              }
          }
        }
      },
      style:{//样式
        curNum:0,
        average:'',//平均值
        num:'10%',//百分比
        bar:{
          width:'30%'
        },
        protion:{
          left:'20%'
        }
      },
      submInput:[
        {//项目名称1
          label:'需求/项目名称：',
          placeholder:'请输入项目名称不超过20个字',
          type:'input-project',
          val:''
        },
        {//项目编号2
          label:'项目编号：',
          placeholder:'请输入项目编号',
          type:'input',
          val:''
        },
        {//需求类型3
          label:'需求类型：',
          placeholder:'请输入需求类型',
          type:'select',
          val:'',
          arr:[{
            label:'MVP',
            value:'MVP'
          },{
            label:'PCD',
            value:'PCD'
          },{
            label:'MD',
            value:'MD'
          },]
        },
        {//项目所在区域4
          label:'项目所在区域：',
          type:'select',
          val:'',
          arr:[]
        },
        {//项目所属部门5
          label:'项目所属部门：',
          type:'select',
          val:'',
          arr:[]
        },
        {//项目验收评估人6
          label:'需求/项目验收评估人：',
          placeholder:'请输入项目验收评估人',
          type:'input',
          val:''
        },
        {//分类7
          label:'分类：',
          type:'select',
          val:'',
          arr:[{
            label:'展示',
            value:'展示'
          },{
            label:'试点',
            value:'试点'
          },{
            label:'销售',
            value:'销售'
          },]
        },
        {//项目优先级8
          label:'项目优先级：',
          type:'select',
          val:'',
          arr:[]
        },
        {//项目总金额9
          label:'项目总金额：',
          placeholder:'请输入项目总金额',
          type:'number',
          val:''
        },
        {//问题描述10
          label:'问题描述：',
          type:'textarea',
          val:''
        },
        {//可行性分析11
          label:'是否需要可行性分析（可行性分析所需赏金数量占比：5.0%）',
          type:'radio',
          arr:[
            {key:'需要',val:'0'},
            {key:'不需要',val:'1'}
          ],
          val:'0'
        },
        {//赏金12
          label:'赏金',
          placeholder:'请输入赏金',
          type:'number',
          val:''
        },
        {//计划完成时间13
          label:'计划完成日期：',
          placeholder:'请选择计划完成日期',
          type:'date',
          val:'',
        },
      ]
    }
  },
  methods:{
    isEcho(){
      this.$CPOST('/project/findProject',{
        projectId:this.$route.query.id
      },(res)=>{
        console.log(res)
        let _d=res.data;
        this.submInput[0].val=_d.projectName;
        this.submInput[1].val=_d.projectNumber;
        this.submInput[2].val=_d.projectType;
        this.submInput[3].val=_d.projectArea;
        this.submInput[4].val=_d.orgId;
        this.submInput[5].val=_d.projectAccepter;
        this.submInput[6].val=_d.projectClass;
        this.submInput[7].val=_d.projectPriority;
        this.submInput[8].val=_d.projectTotal;
        this.submInput[9].val=_d.projectDescribe;
        this.submInput[10].val=_d.var5;
        this.submInput[11].val=_d.projectCoin;
        this.submInput[12].val=_d.var9;
        for(let i=0;i<_d.projectAttachments.length;i++){
          this.fileArr.push({
            filename:_d.projectAttachments[i].filename,
            filepath:_d.projectAttachments[i].filepath
          })
          this.fileUpload.fileList.push({
            name:_d.projectAttachments[i].filename
          })
        }
      })
    },
    mPersonal(){
      let _d=this.propArr;
      _d['var2']=0;
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
    },
    currentD(){
      this.$CPOST('/area/findArea',{},(res)=>{
        let data=res.data;
        for(let i=0;i<data.length;i++){
          this.submInput[3].arr.push({
            label:data[i].areaName,
            value:data[i].areaId
          })
        }
      });
      this.$CPOST('/area/findOrg',{},(res)=>{
        let data=res.data;
        for(let i=0;i<data.length;i++){
          this.submInput[4].arr.push({
            label:data[i].orgName,
            value:data[i].orgId
          })
        }
      })
      this.$CPOST('/area/findPriority',{},(res)=>{
        let data=res.data;
        for(let i=0;i<data.length;i++){
          this.submInput[7].arr.push({
            label:data[i].priorityName,
            value:data[i].priorityId
          })
        }
      })
    },
    unionSend(){
      this.isPartner=true;
      this.isRelease=false;
    },
    //emit
    prevBtn(){
      this.isPartner=false;
      this.isRelease=true;
    },
    close(){
      this.isRelease=false;
    },
    //发布需求
    send(){
      if(this.style.curNum>=100){
        let _d={
          projectName:this.submInput[0].val,
          projectNumber:this.submInput[1].val,
          projectType:this.submInput[2].val,
          projectArea:this.submInput[3].val,
          orgId:this.submInput[4].val,
          projectAccepter:this.submInput[5].val,
          projectPriority:this.submInput[7].val,
          projectTotal:this.submInput[8].val,
          projectCoin:this.submInput[11].val,
          var5:this.submInput[10].val,
          projectDescribe:this.submInput[9].val,
          projectClass:this.submInput[6].val,
          projectAttachmentStr:JSON.stringify(this.fileArr),
          var9:this.submInput[12].val,
        }
        this.propArr=_d;
        this.propArr['status']=0
        this.isRelease=true;
      }else{
        this.$message.error('未完成录入');
      }
    },
    //上传相关
    handleRemove(file, fileList) {
      this.fileArr=[];
      for(let i=0;i<fileList.length;i++){
          this.fileArr.push({
            filepath:fileList[i].response.data,
            filename:fileList[i].name
          })
        }
    },
    /*httpRequest(){
      let fd = new FormData();
      fd.append('file', this.fileUpload.file)
      const loading = this.$loading(this.$store.state.loading);
      this.$CZC('api/fmc/file/upload',fd,(res)=>{
        loading.close();
        if(res.code==200){
          this.fileList.push(res.data);
        }else{
        }
      })
    },*/
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
        console.log(fileList)
      }else{
        this.$message.error('上传失败')
      }
    },
    //富文本相关函数
    handleInputChange () {},
    handleEditorBlur () {},
    handleEditorFocus () {},
  }
}
</script>

<style>
  .submC-input .el-date-editor{
    width: 100%;
  }
  .submC-input .ql-container{
    height: 100px !important;
  }
  .submC-input .el-radio__inner{
    display: inline-block;
    width: 34px !important;
    height: 34px !important;
  }
  .submC-input .el-radio__inner::after{
    width: 15px;
    height: 15px;
  }
  .submC-input .el-radio__label{
    font-size: 20px;
  }
  .submC-input label{
    margin-right: 92px;
    color: #333;
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
  .subm-bottom div:active{
    background: #0F7CCF;
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
    height: 423px;
    background: url(../../assets/img/release.png) no-repeat;
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .submR-btn{
    display: flex;
    padding: 0 42px;
    justify-content: space-between;
    margin-top: 258px;
  }
  .submR-btn div{
    cursor: pointer;
    width: 220px;
    height: 66px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow:0px 6px 25px -8px rgba(8,113,193,0.5);
    border-radius:2px;
    font-size: 24px;
  }
  .submR-btn div:first-child{
    background: #0091FF;
    color: #FFFFFF;
  }
  .submR-btn div:first-child:active{
    background: #0F7CCF;
  }
  .submR-btn div:last-child:active{
    background:rgba(217,217,217,1);
  }
  .submR-btn div:last-child{
    border:1px solid rgba(0,145,255,1);
    background:rgba(255,255,255,1);
    color: #0091FF;
  }
  .submR-btn div:first-child span{
    display: inline-block;
    width: 33px;
    height: 31px;
    background: url(../../assets/img/one_man.png) no-repeat;
    margin-right: 14px;
  }
  .submR-btn div:last-child span{
    display: inline-block;
    width: 45px;
    height: 27px;
    background: url(../../assets/img/three_man.png) no-repeat;
    margin-right: 14px;
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
</style>
