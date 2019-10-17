<template>
  <div class="detail zc_auto">
    <div :class="openState==0?'state':''">
      <div v-show='openState==0' class="detail-layer"></div>
      <div class="detail-main">
        <div class="detailM-left">
          <div class="detail-title">
            <span></span>
            项目详情
          </div>
          <div class="detailML-content zc-shadow">
            <h2><span>项目名称</span>{{projectDetail.projectName}}</h2>
            <div class="detailMLC">
              <div>
                <span>合伙承接人</span>
                <div class="detailMLC-IchangeP" v-show='edit.accept'><p class="suorArr" v-for='i in projectDetail.emplyeeProjects'>{{i.var1}}</p><div @click='editAccept("bj")' v-if='projectDetail.ismeToo'><i></i>编辑</div></div>
                <div class="detailMLC-changeP" v-show='!edit.accept'><p v-for='(i,idx) in projectDetail.emplyeeProjects'>{{i.var1}}<span @click.stop='deletePeople(idx)'>×</span></p><p style="color: #0091FF;cursor: pointer;font-weight:600;" @click='addPeople'>修改</p><div @click='editAccept("wc")'>完成</div></div>
              </div>
              <div>
                <span>承接人</span>
                <p><i>{{projectDetail.employeName}}</i></p>
              </div>
              <div>
                <span>发起人</span>
                <p><i>{{projectDetail.var1}}</i></p>
              </div>
              <div>
                <span>合伙人</span>
                <p><i v-for='i in projectDetail.emplyerProjects'>{{i.var1}}</i></p>
              </div>
              <div>
                <span>项目所属部门</span>
                <p>{{projectDetail.orgName}}</p>
              </div>
              <div>
                <span>需求/项目验收评估人</span>
                <p>{{projectDetail.projectAccepter}}</p>
              </div>
              <div>
                <span>分类</span>
                <p>{{projectDetail.projectClass}}</p>
              </div>
              <div>
                <span>项目优先级</span>
                <div class="detailMLC-IchangeP" v-show='edit.level.isEdit'><p>{{projectDetail.priorityName}}</p><div v-if='user=="MONITOR_TP"' @click='editLevel("bj")'><i></i>编辑</div></div>
                <div class="detailMLC-changeP" v-show='!edit.level.isEdit'>
                  <p v-for='(i,idx) in edit.level.arr' 
                     @click='editLeve(idx,i)'
                     :class="edit.level.idx==idx?'detailMLC-changeP-level':'detailMLC-changeP-levels'">{{i.key}}</p>
                  <div @click='editLevel("wc")'>完成</div>
                </div>
              </div>
              <div>
                <span>项目描述</span>
                <p v-html='projectDetail.projectDescribe' class="detailMLC-text"></p>
              </div>
              <div v-if='projectDetail.whetherAnalyse'>
                <span>可行性分析文档</span>
                <p class="detailMLC-labelA" @click='analyHref()'>{{analysisData.var1}}</p>
              </div>
            </div>
          </div>
          <div class="detailML-plan zc-shadow" v-if="projectDetail.ismeToo&&projectDetail.projectStatus=='working'">
            <div class="detailMLP-box" v-for='i in planArr'>
              <div class="detailMLPB-top">
                <p><span></span>{{i.projectPlanTitle}}</p>
                <p @click='detailBtn(2,i)'><span></span>删除</p>
              </div>
              <div style="margin-top: 35px;padding-left: 15px;display: flex;">
                <slider :min=0 :max=100 v-model = "i.progress" @upProgres='upProgres' :d=i></slider>
              </div>
              <div style="padding-left: 17px"><span>{{i.var1}}</span> — {{i.var2}}</div>
            </div>
            <div class="detailMLP-plan-ipt" v-if='!plan'>
              <el-date-picker
                  style='margin-bottom: 10px;'
                  v-model="addTime"
                  type="datetimerange"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
              </el-date-picker>
              <el-input placeholder='输入项目计划' v-model='planName'></el-input>
              <div class="detailMLPPI">
                <div @click='planAdd'>添加</div>
                <div @click='cancelPlan'>取消</div>
              </div>
            </div>
            <div class="detailMLP-btn" @click='addPlan' v-show='plan'>+ 项目计划</div>
          </div>
          <div class="detailML-comment zc-shadow" id='zcTop' v-loading="loading">
            <el-input
              type="textarea"
              placeholder="请发表评论"
              v-model="myMsg"
              maxlength="200"
              show-word-limit
              resize='none'
              :rows="4"
            >
            </el-input>
            <div class="detailMLC-btn">
              <div @click='release(0)'>发布</div>
            </div>
            <div class="detailMLC-content">
              <div class="detailMLCC-title">
                全部评论（{{commentAll}}）
              </div>
              <div class="detailMLCC-content">
                <div v-for='i in commentArr' style="margin-bottom: 20px;">
                  <div class="comment-parent">
                    <dl>
                      <dt><img :src="i.var1!=null?i.var1:parentImg" alt=""></dt>
                      <dd>
                        <p><span>{{i.frompeople}}</span><span>{{i.createTime}}</span></p>
                        <p>{{i.content}}<span class="zcRevrew" @click='reply(i)'>回复</span><span class="dele" @click='dele(i)' v-if='i.isme'>删除</span></p>
                      </dd>
                    </dl>
                  </div>
                  <div class="comment-child" v-for='j in i.subComment'>
                    <dl>
                      <dt><img :src="j.var1!=null?j.var1:parentImg" alt=""></dt>
                      <dd>
                        <p><span>{{j.frompeople}}</span><span>{{j.createTime}}</span></p>
                        <p>回复 <span style="color: #333;font-weight: 600">{{j.topeople}}</span>：{{j.content}}<span class="zcRevrew" @click='reply(j)'>回复</span><span class="dele" @click='dele(j)' v-if='j.isme'>删除</span></p>
                      </dd>
                    </dl>
                  </div>
                </div> 
              </div>
              <div class="detailMLCC-none" style="display: none;">
                <p>暂无相关评论</p>
              </div>
            </div>
          </div>
        </div>
        <div class="detailM-right">
          <div class="detail-title">
            <span></span>
            赏金
          </div>
          <div class="detailMR-chart zc-shadow">
            <div class="detailMRC-top">
              <div id="mountNode"></div>
            </div>
            <div class="detailMRC-bottom">
              <div class="detailMRC-bottom-bar">
                <div>
                  <p><span style="background: #3AA0ED"></span>全部赏金</p>
                  <p>{{mChart.projectCoin}}</p>
                </div>
                <div>
                  <p><span style="background:#F7B500"></span>尾款</p>
                  <p>{{mChart.mentCoin}}</p>
                </div>
              </div>
              <div class="detailMRC-bottom-bar">
                <div>
                  <p><span style="background:#1ECFBE"></span>预付款</p>
                  <p>{{mChart.yufuCoin}}</p>
                </div>
                <div>
                  <p><span style="background: #E65A5A"></span>可行性分析</p>
                  <p>{{mChart.analysisCoin}}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="detail-title">
            <span></span>
            项目进度
          </div>
          <div class="detailMR-progress zc-shadow" v-if='progressData!=null'>
            <h2>{{Math.round(progressData.progress)}}<span>%</span><label for="" class="zc-label-detail" v-show="projectDetail.projectStatus=='newbuilt'||projectDetail.projectStatus=='releasing'">尚未承接</label></h2>
            <el-progress 
              :text-inside="true" 
              :stroke-width="10" 
              :percentage="Math.round(progressData.progress)" 
              status="warning" 
              :show-text='false' 
              :color="customColor"></el-progress>
            <div class="detailMRP-content">
              <div class="detailMRPC-bar"></div>
              <div class="detailMRPC-left detailMRPC-div ">
                <p><span v-show='progressData.starttime!=null'>{{progressData.starttime}}</span>
                   <span v-show='progressData.starttime==null'>--/--/--</span>
                </p>
                <p>开始时间</p>
              </div>
              <div class="detailMRPC-right detailMRPC-div ">
                <p><span v-show='progressData.endtime!=null'>{{progressData.endtime}}</span>
                   <span v-show='progressData.endtime==null'>--/--/--</span>
                </p>
                <p>结束时间</p>
              </div>
            </div>
            <div class="detailMR-btn">
              <div class="detailMRB-left" v-show="projectDetail.projectStatus=='done'" style="background: rgba(247,250,252,1) !important;color: #0091FF !important">
                项目评分：{{projectDetail.var8}}分
              </div>
              <!-- <div class="detailMRB-left">已承接项目</div> -->
              <!-- <div class="detailMRB-left" @click='detailBtn(1)'>承接项目</div> -->
              <!-- <div class="detailMRB-left" @click='cancelBtn(1)'>可行性分析</div> -->
              <!-- 需求方 -->
              <div class="detailMRB-left" 
                   @click='cancelBtn(0)'
                   v-show="user=='USER_PUBLISH'&&projectDetail.projectStatus=='newbuilt'&&projectDetail.isupdate||user=='USER_PUBLISH'&&projectDetail.projectStatus=='releasing'&&projectDetail.isupdate">
                    取消需求
                   </div>
              <div class="detailMRB-left" 
                   @click='cancelBtn(2)'
                   v-show="user=='USER_PUBLISH'&&projectDetail.projectStatus!='done'&&projectDetail.isupdate&&Math.round(progressData.progress)==100">
                    确认完成
                   </div>
              <!-- 研发方 -->
              <div class="detailMRB-left" 
                   @click='detailBtn(1)'
                   v-show="user=='USER_CLAIM'&&projectDetail.projectStatus=='newbuilt'">
                    承接项目
                   </div>
              <div class="detailMRB-left" 
                   @click='cancelBtn(1)'
                   v-show="user=='USER_CLAIM'&&projectDetail.projectStatus=='confirming'&&!projectDetail.whetherAnalyse&&projectDetail.ismeToo&&projectDetail.var5=='0'">
                    可行性分析
                   </div>
              <!-- 监察小组 -->
              <div class="detailMRB-left" 
                   @click='detailBtn(5)'
                   v-show="user=='MONITOR_REGULATOR'&&projectDetail.projectStatus=='working'&&!projectDetail.earlypay">
                    前期支付
                   </div>
              <div class="detailMRB-left" 
                   @click='detailBtn(6)'
                   v-show="user=='MONITOR_REGULATOR'&&projectDetail.projectStatus=='done'&&!projectDetail.finish">
                    支付尾款
                   </div>
              <!-- 统筹小组 -->
              <div class="detailMRB-left" 
                   @click='detailBtn(7)'
                   v-show="user=='MONITOR_TP'&&projectDetail.projectStatus=='confirming'">
                    确认立项
                   </div>
            </div>
          </div>
          <div v-if='projectDetail.whetherAnalyse'>
            <div class="detail-title">
              <span></span>
              可行性分析结果
            </div>
            <div class="detailMR-result zc-shadow">
              <p><span>分析人</span><span>{{analysisData.var2}}</span></p>
              <p><span>支付视联币</span><span>{{analysisData.projectCoin}}</span></p>
              <p><span>分析备注</span><span>{{analysisData.comments}}</span></p>
            </div>
          </div>
          <div v-if="projectDetail.projectStatus=='cancel'">
            <div class="detail-title">
              <span></span>
              项目已取消
            </div>
            <div class="detailMR-result zc-shadow">
              <p><span>取消时间</span><span>{{projectDetail.var4}}</span></p>
              <p><span>取消原因</span><span></span></p>
              <p style="padding: 14px;background: #F7FAFC">{{projectDetail.cancelComments}}</p>
            </div>
          </div>
        </div>
      </div>
      <Prompt v-if='prompt.isPrompt' @close='close' :prompt='prompt'></Prompt>
      <Cancel v-if='cancel.isCancel' @close='cancelClose' :cancel='cancel' @yes='yes'></Cancel>
      <Partner @prevBtn='prevBtn' v-if='isPartner' :propArr='propArr' @nextBtn='nextBtn'></Partner>
    </div>
  </div>
</template>

<script>
import Prompt from '../common/prompt';
import Cancel from '../common/cancel';
import slider from './slide';
import G2 from '@antv/g2';
import Partner from '../common/partner.vue';
export default {
  components:{
    slider,
    Prompt,
    Cancel,
    Partner
  },
	created(){
    console.log(this.planArr)
    this.currentD();
	},
  mounted(){
    this.initChart()
  },
  data () {
    return {
      analysisData:'',//可行性分析数据
      user:sessionStorage.getItem('user'),
      progressData:null,//项目进度相关
      commentAll:'',//所有评论
      loading:false,
      commentArr:[],//评论数组
      planArr:[],//项目计划数组
      planName:'',//项目计划名称添加
      addTime:[],//添加项目时间
      mChart:'',
      propArr:[],//弹框人员传值
      isPartner:false,
      projectDetail:'',
      openState:1,//现用于是否置灰，将来有其他状态再做修改
      cancel:{//取消需求和可行性分析
        isCancel:false,
        status:'',//
      },
      prompt:{//弹框
        isPrompt:false,
        status:'',//
      },
      edit:{
        key:'',//给后台传的字段
        accept:true,//承接人编辑
        level:{
          isEdit:true,//项目优先级编辑
          idx:0,
          arr:[
          ]
        },
      },
      plan:true,//true显示添加，false显示输入框
      reviewId:'',//回复人ID
      pcommentId:'',//回复人父节点ID
      isReply:false,//是否回复
      myMsg:'',//评论内容
      myMsgDel:'',//监听删除事件
      myMsgLen:'',
      childImg:'http://58.30.9.142:48086/files/2019/04/19/20190419131639_logo2.png',
      parentImg:'http://58.30.9.142:48086/files/2019/04/19/20190419131639_logo2.png',
      //没用的
      per1:'100',
      customColor: '#F7AB00',
      
    }
  },
  methods:{
    //可行性分析路径跳转
    analyHref(){
      window.open(this.analysisData.var3);
    },
    //可行性分析渲染
    analysis(){
      this.$CPOST('/project/findAnalysis',{
        projectId:this.$route.query.id
      },(res)=>{
        if(res.code==200){
          this.analysisData=res.data;
        }
      })
    },
    //可行性分析、取消需求回调
    yes(_d,status,branch){
      const loading = this.$loading(this.$store.state.loading);
      if(status==0){//可行性分析
        _d['projectId']=this.$route.query.id;
        this.$CPOST('/project/analysis',_d,(res)=>{
          loading.close();
          if(res.code==200){
            this.cancel.isCancel=false;
            this.currentD();
            this.analysis();
          }else{
            this.$message.error(res.msg);
          }
        })
      }else if(status==1){
        this.$CPOST('/project/setToCancel',{
          projectId:this.$route.query.id,
          cancelComments:_d
        },(res)=>{
          loading.close();
          if(res.code==200){
            this.cancel.isCancel=false;
            this.openState=0;
            this.currentD();
          }else{
            this.$message.error(res.msg);
          }
        })
      }else if(status==2){
        this.$CPOST('/project/doneDo',{
          projectId:this.$route.query.id,
          score:branch,
          comments:_d
        },(res)=>{
          loading.close();
          if(res.code==200){
            this.cancel.isCancel=false;
            this.currentD();
          }else{
            this.$message.error(res.msg);
          }
        })
      }
    },
    //删除
    dele(i){
      this.$alert('确定要删除吗？', '', {
        confirmButtonText: '确定',
        callback: action => {
          if(action=='confirm'){
            this.$CPOST('/comment/delComment',{
              commentId:i.commentId
            },(res)=>{
              if(res.code==200){
                this.commont();
              }else{
                this.$message({
                   message: res.msg,
                   type: 'warning'
                });
              }
            })}
          }
      })
    },  
    //回复
    reply(_d){
      document.getElementById("zcTop").scrollIntoView();
      this.reviewId=_d.userId;
      this.pcommentId=_d.pcommentId;
      this.isReply=true;
      this.myMsg='回复'+_d.frompeople+'：';
      this.myMsgDel='回复'+_d.frompeople;
      let len='回复'+_d.frompeople+'：';
      this.myMsgLen=len.length;
    },
    //添加评论
    release(status){
      let _d='';
      let msg;
      if(!this.isReply){
        msg=this.myMsg;
      }else{
        msg=this.myMsg.slice(this.myMsgLen);
      }
      if(msg.trim()==''){
        this.$message({
           message: '评论内容不能为空',
           type: 'warning'
        });
      }else if(this.isReply){//回复
        _d={
          projectId:this.$route.query.id,
          content:msg,
          status:1,
          reviewId:this.reviewId,
          pcommentId:this.pcommentId
        }
      }else{
        _d={
          projectId:this.$route.query.id,
          content:msg,
          status:0,
        }
      }
      if(_d!=''){
        this.loading=true;
        this.$CPOST('/comment/addComment',_d,(res)=>{
          this.loading=false;
          if(res.code==200){
            this.commont();
            this.myMsg='';
            this.isReply=false;
          }else{
            this.$message.error(res.msg);
          }
        })
      }
    },  
    //拖动项目计划回调
    upProgres(val,_d){
      this.$CPOST('/projectPlan/updateProjectPlan',{
        projectId:this.$route.query.id,
        projectPlanId:_d.projectPlanId,
        progress:val,
        projectPlanTitle:_d.projectPlanTitle
      },(res)=>{
        if(res.code==200){
          this.projectGress();
        }
      })
    },
    //添加项目计划
    planAdd(){
      this.$CPOST('/projectPlan/addProjectPlan',{
        projectId:this.$route.query.id,
        projectPlanTitle:this.planName,
        var1:this.addTime[0],
        var2:this.addTime[1]
      },(res)=>{
        if(res.code==200){
          this.currentD();
          this.$message.success('添加成功');
          this.plan=!this.plan;
        }else{
          this.$message.error(res.msg);
        }
      })
    },
    nextBtn(_d){
      let arr=[];
      if(_d=='null'){
        for(let i=0;i<this.projectDetail.emplyeeProjects.length;i++){
          arr.push(this.projectDetail.emplyeeProjects[i].employeeId);
        }
      }else{
        for(let i=0;i<_d.length;i++){
          arr.push(_d[i].key);
        }
      }
        let a=arr.join(',');
        this.$CPOST('/project/emplyeeUpdate',{
          projectId:this.$route.query.id,
          emplyeeIds:a
        },(res)=>{
          if(res.code==200){
            this.isPartner=false;
            this.currentD();
            this.$message.success('添加成功');
          }else{
            this.$message.error('添加失败');
          }
        })
    },
    //emit选择人
    prevBtn(){
      this.isPartner=false;
    },
    //删除人
    deletePeople(idx){
      this.projectDetail.emplyeeProjects.splice(idx,1);
    },
    //添加人
    addPeople(){
      this.propArr['status']=1;
      this.isPartner=true;
    },
    //评论渲染
    commont(){
      //评论内容
      this.$CPOST('/comment/findAllComment',{
        projectId:this.$route.query.id,
      },(res)=>{
        let data=res.data;
        this.commentArr=data;
      })
      //评论
      this.$CPOST('/comment/findCommentNum',{
        projectId:this.$route.query.id,
      },(res)=>{
        let data=res.data;
        this.commentAll=data;
      })
    },
    currentD(){
      const loading = this.$loading(this.$store.state.loading);
      this.edit.level.arr=[];
      this.$CPOST('/project/findProject',{
        projectId:this.$route.query.id,
      },(res)=>{
        loading.close();
        this.projectDetail=res.data;
        if(res.data.projectStatus=='cancel'){
          this.openState=0;
        }
        if(res.data.whetherAnalyse){
          this.analysis();
        }
      });
      //项目优先级
      this.$CPOST('/area/findPriority',{},(res)=>{
        let data=res.data;
        for(let i=0;i<data.length;i++){
          this.edit.level.arr.push({
            key:data[i].priorityName,
            val:data[i].priorityId
          })
        }
        this.edit.key=data[0].priorityId;
      });
      //项目计划
      this.$CPOST('/projectPlan/findListByProjectId',{
        projectId:this.$route.query.id,
      },(res)=>{
        let data=res.data;
        this.planArr=data;
      });
      //评论
      this.commont();
      //项目进度
      this.projectGress();
    },
    //项目进度
    projectGress(){
      this.$CPOST('/project/findProgress',{
        projectId:this.$route.query.id,
      },(res)=>{
        let data=res.data;
        this.progressData=data;
      });
    },
    //取消需求
    cancelBtn(status){
      this.cancel.status=status;
      this.cancel.isCancel=true;
    },
    //取消需求弹框
    cancelClose(){
      this.cancel.isCancel=false;
    },
    //承接项目
    detailBtn(status,i){
      if(status==2){
        this.prompt['projectPlanId']=i.projectPlanId;
      }
      this.prompt.status=status;
      this.prompt.isPrompt=true;
    },
    //弹窗关闭
    close(_d,radio){
      if(_d==1){//确认承接此项目
        this.$CPOST('/project/takeupDo',{
          projectId:this.$route.query.id
        },(res)=>{
          if(res.code==200){
            this.currentD();
            this.prompt.isPrompt=false;
          }else{
            this.$message.error(res.msg);
          }
        })
      }else if(_d==5){//是否支付预付款
        this.$CPOST('/project/earlyPay',{
          projectId:this.$route.query.id
        },(res)=>{
          if(res.code==200){
            this.currentD();
            this.prompt.isPrompt=false;
          }else{
            this.$message.error(res.msg);
          }
        })
      }else if(_d==6){//是否支尾款
        this.$CPOST('/project/payment',{
          projectId:this.$route.query.id,
          percent:this.projectDetail.var8
        },(res)=>{
          if(res.code==200){
            this.currentD();
            this.prompt.isPrompt=false;
          }else{
            this.$message.error(res.msg);
          }
        })
      }else if(_d==7){//是否确认立项
        this.$CPOST('/project/isPass.do',{
          projectId:this.$route.query.id,
          status:radio
        },(res)=>{
          if(res.code==200){
            this.currentD();
            this.prompt.isPrompt=false;
          }else{
            this.$message.error(res.msg);
          }
        })
      }else if(_d==2){//是否删除此项目计划
        this.$CPOST('/projectPlan/delProjectPlan',{
          projectPlanId:radio,
        },(res)=>{
          if(res.code==200){
            this.currentD();
            this.prompt.isPrompt=false;
          }else{
            this.$message.error(res.msg);
          }
        })
      }else{
        this.prompt.isPrompt=false;
      }
    },
    //项目优先级编辑
    editLevel(_d){
      if(_d=='wc'){
        this.$CPOST('/project/priorityUpdate',{
          projectId:this.$route.query.id,
          priority:this.edit.key
        },(res)=>{
          if(res.code==200){
            this.currentD();
            this.$message.success('更新成功');
            this.edit.level.isEdit=!this.edit.level.isEdit;
          }else{
            this.$message.error('更新失败');
          }
        })
      }else{
        this.edit.level.isEdit=false;
      }
    },
    //项目优先级样式控制
    editLeve(idx,i){
      this.edit.level.idx=idx;
      this.edit.key=i.val;
    },
    //承接人编辑
    editAccept(_d){
      if(_d=='wc'){
        this.nextBtn('null');
      }
      this.edit.accept=!this.edit.accept;
    },
    //玉珏图
    initChart(data,sum){
      // if(!this.chart){
      var data = [{
        "question": "可行性分析",
        "percent": 150
      }, {
        "question": "尾款",
        "percent": 1950
      }, {
        "question": "预付款",
        "percent": 900
      }, {
        "question": "全部赏金",
        "percent": 2250,
      }];
      this.$CPOST('/project/findProjectCoinView',{
        projectId:this.$route.query.id,
      },(res)=>{
        let _d=res.data;
        chart.source(data, {
          'percent': {
            min: 0,
            max: Number(_d.projectCoin)
          }
        });
        data[3].percent=Number(_d.projectCoin)*0.75;
        data[2].percent=Number(_d.yufuCoin)*0.75;
        data[0].percent=Number(_d.analysisCoin)*0.75;
        data[1].percent=Number(_d.mentCoin)*0.75;
        this.mChart=_d;
        chart.render();
      })
        var chart = new G2.Chart({
          container: 'mountNode',
          // forceFit: true,
          width: 400,
          height: 400
        });
        
          chart.tooltip({
            triggerOn:'none',
            showTitle: true,
            itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'//定义标头
          });
          chart.legend(false);
          chart.coord('polar', {
            innerRadius: 0.1
          }).transpose();
          chart.interval().position('question*percent').color('question', [ '#E65A5A','#F7B500', '#1ECFBE','#3AA0ED']).tooltip('percent', function(val) {
            return {
              name: '占比',
              value: val * 100 + '%'
            };
          })
          
          data.map(function(obj) {
            chart.guide().text({
              position: [obj.question, 0],
              content: obj.question + ' ',
              style: {
                textAlign: 'right'
              }
            });
          });
          
      // }
    },
    //取消项目计划
    cancelPlan(){
      this.plan=!this.plan;
    },
    //添加项目计划
    addPlan(){
      this.addTime=[];
      this.planName='';
      this.plan=false;
    }
  }
}
</script>
<style>
  .detailMLC-text p{
    min-height: 50px;
  }
</style>
<style scoped>
  .detail-layer{
    position: fixed;
    width: 100%;
    height: 100%;
    /*top: 92px;*/
    z-index: 9999;
  }
  .state {
     -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
    filter: grayscale(100%);
    filter: gray;
    filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1); 
  } 
  .detail{
    padding: 38px 0 108px 0;
  }
  .detail-main{
    display: flex;
  }
  .detailM-left{
    width: 792px;
    margin-right: 24px;
  }
  .detailM-right{
    width:384px;
  }
  .detail-title{
    height: 81px;
    color: #555555;
    display: flex;
    align-items: center;
    font-size: 24px;
  }
  .detail-title span{
    display: inline-block;
    width:8px;
    height:23px;
    background:rgba(0,145,255,1);
    margin-right: 12px;
  }
  .detailML-content{
    padding: 30px 20px 45px 20px;
    background: #fff;
  }
  .detailML-content h2 span{
    display: inline-block;
    width:60px;
    height:20px;
    background:rgba(250,155,0,1);
    border-radius:2px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    line-height: 20px;
    margin-right: 12px;
  }
  .detailML-content h2{
    display: flex;
    align-items: center;
    font-size: 20px;
    color: #333;
    font-weight:600;
  }
  .detailMLC{
    margin-top: 27px;
  }
  .detailMLC div{
    min-height: 50px;
    display: flex;
    /*align-items: center;*/
    font-size: 14px;
    color: #909090;
  }
  .detailMLC div p i{
    margin-right: 40px;
    font-style: normal;
  }
  .detailMLC-text{
    flex: 1;
  }
  .detailMLC span:first-child{
    display: inline-block;
    width: 135px;
    min-width: 135px;
    text-align: right;
    margin-right: 64px;
  }
  .detailML-comment{
    padding: 20px;
    background: #fff;
    margin-top: 24px;
  }
  .detailMLC-btn{
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
  }
  .detailMLC-btn div{
    width: 104px;
    height: 38px;
    background: #0091ff;
    border-radius:2px;
    text-align: center;
    line-height: 38px;
    font-size: 16px;
    color: #fff;
    cursor: pointer;
  }
  .detailMLCC-title{
    color: #333;
    font-size: 16px;
    font-weight:500;
    margin-bottom: 20px;
  }
  .detailMLCC-none{
    position: relative;
    min-height: 250px;
    background: url(../../assets/img/katong.png) no-repeat center;
    background-size: 87px 100px;
  }
  .detailMLCC-none p{
    width: 100%;
    color: #555;
    font-size: 16px;
    text-align: center;
    position: absolute;
    top: 195px;
  }
  .detailMR-progress{
    padding: 20px;
    background: #fff;
  }
  .detailMR-progress h2{
    height:48px;
    font-size:34px;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height:48px;
    margin-bottom: 10px;
  }
  .detailMR-progress h2 span{
    font-size: 20px;
  }
  .detailMRP-content{
    position: relative;
    padding-left: 60px;
    margin-top: 32px;
  }
  .detailMRPC-div p:first-child{
    color: #333333;
    font-size: 22px;
    font-weight:500;
  }
  .detailMRPC-div p:last-child{
    margin-top: 7px;
    height:20px;
    font-size:14px;
    font-weight:400;
    color:rgba(144,144,144,1);
    line-height:20px;
  }
  .detailMRPC-left{
    margin-bottom: 40px;
  }
  .detailMRPC-bar{
    width: 14px;
    height: 111px;
    position: absolute;
    background: url(../../assets/img/shu.png);
    left: 5px;
    top: 7px;
  }
  .detailMR-btn{
    display: flex;
    justify-content: space-between;
    margin-top: 32px;
  }
  .detailMR-btn div{
    cursor: pointer;
    width: 147px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(247,250,252,1);
    font-size: 16px;
    font-weight: 500;
  }
  .detailMRB-left{
    width: 100% !important;
    color: #fff;
    background: #0091FF !important;
  }
  .detailMRB-right{
    color: #0091FF;
  }
  .detailMR-result{
    background: #fff;
    padding: 10px 20px;
  }
  .detailMR-result p{
    line-height: 40px;
    font-size: 14px;
  }
  .detailMR-result p span:first-child{
    display: inline-block;
    width: 100px;
    color: #909090;
  }
  .detailMR-result p span:last-child{
    color: #333333;
  }
  .detailMR-result p:nth-child(2) span:last-child{
    color: #FA9B00;
  }
  .detailML-plan{
    padding: 18px 20px 24px 20px;
    background: #fff;
    margin-top: 24px;
  }
  .detailMLPB-top{
    height: 30px;
    display: flex;
    align-items: center;
  }
  .detailMLPB-top p{
    display: flex;
    align-items: center;
  }
  .detailMLPB-top p:first-child{
    color: #333;
    font-size: 16px;
  }
  .detailMLPB-top p:first-child span{
    display: inline-block;
    width: 7px;
    height: 7px;
    background: #F7B500;
    border-radius: 50%;
    margin-right: 8px;
  }
  .detailMLPB-top p:last-child span{
    display: inline-block;
    width:12px;
    height:13px;
    background: url(../../assets/img/delete.png) no-repeat;
    margin-right: 6px;
  }
  .detailMLPB-top p:last-child{
    cursor: pointer;
    flex: 1;
    justify-content: flex-end;
    display: flex;
    align-items: center;
    color: #909090;
    font-size: 14px;
  }
  .detailMLP-btn{
    height: 52px;
    background: #F7FAFC;
    color: #0091FF;
    font-size: 16px;
    text-align: center;
    line-height: 52px;
    margin-top: 10px;
    font-weight:bold;
    cursor: pointer;
  }
  .detailMLPPI{
    display: flex;
    margin-top: 20px;
  }
  .detailMLPPI div{
    cursor: pointer;
    width: 104px;
    height: 38px;
    font-size: 16px;
    border-radius: 2px;
    text-align: center;
    line-height: 38px;
  }
  .detailMLPPI div:first-child{
    background:rgba(0,145,255,1);
    color: #fff;
    margin-right: 20px;
  }
  .detailMLPPI div:last-child{
    background:rgba(247,250,252,1);
    color: #0091FF;
  }
  .detailMLP-plan-ipt{
    margin-top: 40px;
  }
  .detailMR-chart{
    background: #fff;
    height: 465px;
    overflow: hidden;
  }
  .detailMRC-top{
    height: 240px;
    margin-left: -40px;
  }
  .detailMRC-bottom{
    width: 200px;
    margin: auto;
    margin-top: 100px;
  }
  .detailMRC-bottom-bar{
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }
  .detailMRC-bottom-bar div{
    min-width: 130px;
  }
  .detailMRC-bottom-bar div p span{
    width: 4px;
    height: 4px;
    display: inline-block;
    border-radius: 50%;
    margin-right: 7px;
    
  }
  .detailMRC-bottom-bar div p:first-child{
    display: flex;
    align-items: center;
    height: 20px;
    font-size: 12px;
    color: #909090;
  }
  .detailMRC-bottom-bar div p:last-child{
    font-size: 20px;
    color: #333333;
    margin-left: 10px;
    font-weight: bold;
  }
  .comment-parent dl,.comment-child dl{
    display: flex;
    align-items: center;
  }
  .comment-parent dl dt img,.comment-child dl dt img{
    display: inline-block;
    width: 40px;
    height: 40px;
  }
  .comment-parent dl dt,.comment-child dl dt{
    width: 40px;
    height: 40px;
    min-width: 40px;
    border-radius: 50%;
    border: solid 1px #f2f2f2;
    margin-right: 13px;
    overflow: hidden;
  }
  .comment-parent dl dd p:first-child,.comment-child dl dd p:first-child{
    font-size: 14px;
    font-weight:600;
    color:rgba(51,51,51,1);
    line-height:27px;
    display: flex;
  }
  .comment-parent dl dd,.comment-child dl dd{
    flex: 1;
  }
  .comment-parent dl dd p:first-child span:last-child,.comment-child dl dd p:first-child span:last-child{
    flex: 1;
    display: flex;
    justify-content: flex-end;
    font-size: 12px;
    color: #909090;
  }
  .comment-parent dl dd p:last-child,.comment-child dl dd p:last-child{
    font-size: 14px;
    font-weight:400;
    color:rgba(102,102,102,1);
    line-height:27px;
  }
  .comment-child dl{
    margin-left: 52px;
    background: #F7FAFC;
    margin-top: 10px;
    padding: 16px 20px;
  }
  .detailMLC-changeP,.detailMLC-IchangeP{
    flex-wrap: wrap;
    padding-right: 43px;
    position: relative;
    flex: 1;
  }
  .detailMLC-changeP p{
    display: flex;
    align-items: center;
    color: #333;
    font-weight:600;
    padding: 6px 22px;
    height:32px;
    background:rgba(247,250,252,1);
    border-radius:16px;
    margin: -6px 10px 15px 0;
  }
  .detailMLC-changeP p span,.detailMLC-IchangeP p span{
    width: 10px !important;
    min-width: 10px !important;
    margin-right: 0 !important;
    margin-left: 10px;
    cursor: pointer;
    font-size: 16px;
  }
  .detailMLC-labelA{
    color: #0091FF;
    text-decoration:underline;
    cursor: pointer;
  }
  .detailMLC-changeP div,.detailMLC-IchangeP div{
    width: 50px;
    display: flex;
    height: 15px;
    align-items: center;
    font-size: 14px;
    color: #0091FF;
    position: absolute;
    right: -12px;
    top: -15px;
    cursor: pointer;
  }
  .detailMLC-IchangeP div i{
    background: url(../../assets/img/bianji.png) no-repeat;
    width: 14px;
    height: 14px;
    display: inline-block;
    margin-right: 3px;
  }
  .detailMLC-changeP-level{
    border-radius:16px;
    border:1px solid rgba(0,145,255,1);
    background: #fff;
    color: rgba(0,145,255,1);
    cursor: pointer;
  }
  .detailMLC-changeP-levels{
    cursor: pointer;
    color: #555555;
    border:1px solid rgba(199,199,199,1);
    background: #fff !important;
  }
  .suorArr{
    margin-right: 10px;
  }
  .zcRevrew{
    display: inline-block;
    width: 30px;
    margin: 0 10px 0 20px;
    color: #0091ff;
    cursor: pointer;
  }
  .dele{
    color: red;
  }
  .zc-font{
    font-size: 22px;
  }
  .zc-label-detail{
    float: right;
    color: #E65A5A;
    font-size: 16px;
  }
</style>
