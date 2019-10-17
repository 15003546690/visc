import Vue from 'vue';
import axios from 'axios';
import qs from 'qs';
import token from './token.js';
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
//interceptors拦截器
axios.interceptors.request.use(
  config => {
  	// Vue.prototype.SetCookie('id',Base64.encode(1));//本地开发需打开
  	config.headers.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJXRUJBUFAiLCJpc3MiOiJTZXJ2aWNlIiwiZXhwIjoxNTY5NTc2MTU5LCJ1c2VyIjoiNjk0ZjVjZDkwOTYzNDdjMmFmYTgwYmMwNzJhYWZkNjgiLCJpYXQiOjE1Njk1NDczNTl9.usOQNGrr_wAI21gmgqwTXl-n8FJ8M08caxOmc6eCoO8';
  	/*if(token==null){
		window.location.href=Vue.prototype.$isLogo;
  	}else{
  		config.headers.token = token;
  	}*/
    return config;
  },
  err => {
    return Promise.reject(err);
});
//axiosGET请求
Vue.prototype.$CGET = (url,arg,success,error) =>{
	axios.get('/api/visc'+url,{
				params:arg
			})
	.then(res => {
	   const data = res.data;
	    	if(typeof success === 'function'){
				    success(data);
	       }
	})
	.catch(error => {
      if(typeof error === 'function'){
     	  erro(data)
      }
    })
}
//上传请求
Vue.prototype.$CZC=(url,arg,success,error)=>{
	axios.post(url,arg,{
		headers:{
	       'content-type':'multipart/form-data'
	     }
	})
	.then(res => {
	   const data = res.data;
    	if(typeof success === 'function'){
			    success(data);
       }
	})
}
//axiosPOST请求
Vue.prototype.$CPOST=(url,arg,success,error)=>{
	axios.post('/api/visc'+url,qs.stringify(arg),{
	})
	.then(res => {
	   const data = res.data;
    	if(typeof success === 'function'){
			    success(data);
       }
	})
	.catch(error => {
      if(typeof error === 'function'){
     	  erro(data)
      }
   })
}
//viscPost
Vue.prototype.$UPOST=(url,arg,success,error)=>{
	axios.post(url,qs.stringify(arg),{
	})
	.then(res => {
	   const data = res.data;
    	if(typeof success === 'function'){
			    success(data);
       }
	})
	.catch(error => {
      if(typeof error === 'function'){
     	  erro(data)
      }
   })
};