<template>
  <div class="capital zc_layer">
    <div class="capital-main">
      <header>
        资金详情
        <p class="promptM-close" @click='close'></p>
      </header>
    </div>
  </div>
</template>

<script>
export default {
	created(){
	},
  data () {
    return {
    }
  },
  methods:{
    close(){
      this.$emit('close');
    }
  }
}
</script>


<style scoped>
  .capital-main{
    width: 840px;
    background: red;
  }
  .capital header{
    height: 70px;
    background:linear-gradient(270deg,rgba(49,197,255,1) 0%,rgba(40,149,251,1) 100%);
    font-weight: 400;
    font-size: 24px;
    color: #fff;
    text-align: center;
    line-height: 70px;
    position: relative;
  }
  .promptM-close{
    width: 30px;
    height: 30px;
    background: url(../../assets/img/close_fff.png) no-repeat;
    position: absolute;
    right: 0;
    z-index: 99;
    top: 27px;
    cursor: pointer;
  }
</style>
