<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
  	/*let time=setInterval(()=>{
      history.go(0);
    },500);
    setTimeout(()=>{
    	clearInterval(time);
    },600)*/
  },
  methods:{

  }
}
</script>

<style>
 #app{
 	min-width: 1200px;
 }
</style>
