<template>
    <div>
        <div id="button" @click="clickBtn"> 
            测试按钮
        </div>
        <div id="button2">
            测试按钮2
        </div>
    </div>
  
</template>

<script>

export default {
    mounted(){
        $("#button2").click(function(e){
             var event = e||window.event;//兼容

           event.stopPropagation();//阻止冒泡

           event.preventDefault();//阻止默认行为
        })
    },
    methods:{
        clickBtn(e){
             var event = e||window.event;//兼容

           event.stopPropagation();//阻止冒泡

           event.preventDefault();//阻止默认行为
        }
    }
}
</script>

<style scoped>
#button{
    width: 70%;
    height: 45px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: blue;
    color: aliceblue;
    line-height: 45px;
}
</style>