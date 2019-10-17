import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
const Home = resolve => require(['@/components/home/index'], resolve);
const Cgg = resolve => require(['@/components/home/cgg'], resolve);
const Task = resolve => require(['@/components/task/index'], resolve);
const Demand = resolve => require(['@/components/demand/index'], resolve);
const Submission = resolve => require(['@/components/home/submission'], resolve);
const ProjectPar = resolve => require(['@/components/home/projectPar'], resolve);
const HomeSuccess = resolve => require(['@/components/home/success'], resolve);
const Detail = resolve => require(['@/components/detail/index'], resolve);
const Finance = resolve => require(['@/components/finance/index'], resolve);
const Backstage = resolve => require(['@/components/backstage/index'], resolve);
/*csy add 20190628*/
const Bank = resolve => require(['@/components/backstage/vbank'], resolve);  //视联央行
const Distribution = resolve => require(['@/components/backstage/distribution'], resolve);  //视联币分配
const Pcenter = resolve => require(['@/components/backstage/pcenter'], resolve);  //个人中心
const Transferaccounts = resolve => require(['@/components/backstage/transferaccounts'], resolve);  //转账
const Configuration = resolve => require(['@/components/backstage/configuration'], resolve);  //支付配置
Vue.use(Router)
let user=sessionStorage.getItem('user'),
    routerName='Index',
    routerRedirect='/home';
if(user=='VISC_ADMIN'){
  routerName=Cgg,
  routerRedirect='/cgg'
}else{
  routerName=Index,
  routerRedirect='/home'
}
export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
      redirect:routerRedirect,
      children:[
        {
          path: '/backstage',
          name: 'Backstage',
          component: Backstage,
          redirect:'/backstage/distribution',
          children:[
            {
              path: '/backstage/bank',
              name: 'Bank',
              component: Bank
            },
            {
              path: '/backstage/distribution',
              name: 'Distribution',
              component: Distribution
            },
            {
              path: '/backstage/pcenter',
              name: 'Pcenter',
              component: Pcenter
            },
            {
              path: '/backstage/transferaccounts',
              name: 'Transferaccounts',
              component: Transferaccounts
            },
            {
              path: '/backstage/configuration',
              name: 'Configuration',
              component: Configuration
            }
          ]
        },
        {
          path: routerRedirect,
          component: routerName,
        },
        {
          path: '/finance',
          name: 'Finance',
          component: Finance,
        },
        {
          path: '/detail',
          name: 'Detail',
          component: Detail,
        },
        {
          path: '/home/success',
          name: 'HomeSuccess',
          component: HomeSuccess,
        },
      	{
      	  path: '/home/submission',
          name: 'Submission',
          component: Submission,
      	},
        {
          path: '/home/pubmission',
          name: 'ProjectPar',
          component: ProjectPar,
        },
      	{
      	  path: '/task',
          name: 'Task',
          component: Task,
      	},
      	{
      	  path: '/demand',
          name: 'Demand',
          component: Demand,
        }
      ]
    }
  ]
})

/*this.beforeEach((to,from,next)=>{
  console.log(to)
})*/