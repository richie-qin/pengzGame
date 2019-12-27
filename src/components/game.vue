<!--
    *404页面
-->
<template>
    <div id="pengz">
        <div id="topImage">
            <img src="../assets/image/img12.png" alt="" @load="topImgLoad">
        </div>
        <div id="box" v-show="showBox">
            <div class="pos" id="pos1"></div>
            <div class="pos" id="pos2"></div>
            <div class="pos" id="pos3"></div>
            <div class="pos" id="pos4"></div>
            <div class="pos" id="pos5"></div>
            <div class="pos" id="pos6"></div>
            <div class="pos" id="pos7"></div>
            <div class="pos" id="pos8"></div>
            <div class="pos" id="pos9"></div>

            <div v-show="listState[0].show" class="pos-span" id="span1" :style="{left:coordinate[0].left+'px',top:coordinate[0].top+'px'}" @touchstart="touchstart(1)" @touchmove="touchmove(1)" @touchend="touchend(1)"><img :src="listState[0].grade==1?require('../assets/image/img06.png'):require('../assets/image/img05.png')" alt=""></div>
            <div v-show="listState[1].show" class="pos-span" id="span2" :style="{left:coordinate[1].left+'px',top:coordinate[1].top+'px'}" @touchstart="touchstart(2)" @touchmove="touchmove(2)" @touchend="touchend(2)"><img :src="listState[1].grade==1?require('../assets/image/img06.png'):require('../assets/image/img05.png')" alt=""></div>
            <div v-show="listState[2].show" class="pos-span" id="span3" :style="{left:coordinate[2].left+'px',top:coordinate[2].top+'px'}" @touchstart="touchstart(3)" @touchmove="touchmove(3)" @touchend="touchend(3)"><img :src="listState[2].grade==1?require('../assets/image/img06.png'):require('../assets/image/img05.png')" alt=""></div>
            <div v-show="listState[3].show" class="pos-span" id="span4" :style="{left:coordinate[3].left+'px',top:coordinate[3].top+'px'}" @touchstart="touchstart(4)" @touchmove="touchmove(4)" @touchend="touchend(4)"><img :src="listState[3].grade==1?require('../assets/image/img06.png'):require('../assets/image/img05.png')" alt=""></div>
            <div v-show="listState[4].show" class="pos-span" id="span5" :style="{left:coordinate[4].left+'px',top:coordinate[4].top+'px'}" @touchstart="touchstart(5)" @touchmove="touchmove(5)" @touchend="touchend(5)"><img :src="listState[4].grade==1?require('../assets/image/img06.png'):require('../assets/image/img05.png')" alt=""></div>
            <div v-show="listState[5].show" class="pos-span" id="span6" :style="{left:coordinate[5].left+'px',top:coordinate[5].top+'px'}" @touchstart="touchstart(6)" @touchmove="touchmove(6)" @touchend="touchend(6)"><img :src="listState[5].grade==1?require('../assets/image/img06.png'):require('../assets/image/img05.png')" alt=""></div>
            <div v-show="listState[6].show" class="pos-span" id="span7" :style="{left:coordinate[6].left+'px',top:coordinate[6].top+'px'}" @touchstart="touchstart(7)" @touchmove="touchmove(7)" @touchend="touchend(7)"><img :src="listState[6].grade==1?require('../assets/image/img06.png'):require('../assets/image/img05.png')" alt=""></div>
            <div v-show="listState[7].show" class="pos-span" id="span8" :style="{left:coordinate[7].left+'px',top:coordinate[7].top+'px'}" @touchstart="touchstart(8)" @touchmove="touchmove(8)" @touchend="touchend(8)"><img :src="listState[7].grade==1?require('../assets/image/img06.png'):require('../assets/image/img05.png')" alt=""></div>
            <div v-show="listState[8].show" class="pos-span" id="span9" :style="{left:coordinate[8].left+'px',top:coordinate[8].top+'px'}" @touchstart="touchstart(9)" @touchmove="touchmove(9)" @touchend="touchend(9)"><img :src="listState[8].grade==1?require('../assets/image/img06.png'):require('../assets/image/img05.png')" alt=""></div>
        </div>
        <div id="buttonDom">
            <div id="buttonD1">
                <img src="../assets/image/img08.png" alt="" id="button08" @click="addItem">
                <img src="../assets/image/img07.png" alt="" id="button07">
            </div>
            <div id="buttonD2">
                <img src="../assets/image/img09.png" alt="">
            </div>
        </div>
        <!-- <button @click="addItem">添加</button> -->
    </div>
</template>

<script>
import $ from "jquery"
export default {
    data() {
        return {
            coordinate:[
                {top:0,left:0},{top:0,left:0},{top:0,left:0},{top:0,left:0},{top:0,left:0},{top:0,left:0},{top:0,left:0},{top:0,left:0},{top:0,left:0}
            ],
            bodyW:0,
            bodyH:0,
            pos1:null,
            pos2:null,
            pos3:null,
            pos4:null,
            pos5:null,
            pos6:null,
            pos7:null,
            pos8:null,
            pos9:null,
            dfdistance1:0,
            dfdistance2:0,
            dfdistance3:0,

            t1:0,l1:0,r1:0,b1:0,t2:0,l2:0,r2:0,b2:0,
            t3:0,l3:0,r3:0,b3:0,t4:0,l4:0,r4:0,b4:0,
            t5:0,l5:0,r5:0,b5:0,t6:0,l6:0,r6:0,b6:0,
            t7:0,l7:0,r7:0,b7:0,t8:0,l8:0,r8:0,b8:0,
            t9:0,l9:0,r9:0,b9:0,

            dfX1:0,dfY1:0,
            dfX2:0,dfY2:0,
            dfX3:0,dfY3:0,
            dfX4:0,dfY4:0,
            dfX5:0,dfY5:0,
            dfX6:0,dfY6:0,
            dfX7:0,dfY7:0,
            dfX8:0,dfY8:0,
            dfX9:0,dfY9:0,

            choiseIndex:10,//默认移动的
            
            listState:[//每一个位置是否有东西，等级多少
                {show:false,grade:0},
                {show:false,grade:0},
                {show:false,grade:0},
                {show:false,grade:0},
                {show:false,grade:0},
                {show:false,grade:0},
                {show:false,grade:0},
                {show:false,grade:0},
                {show:false,grade:0},
            ],
            topImgHeight:0,
            showBox:false,
        }
    },

    activated(){

    },

    created(){
        
        

    },

    mounted(){
        
    },

    computed(){

    },
    methods:{
        topImgLoad(){
            this.topImgHeight = $("#topImage").height();
            this.defaultWH();
            this.showBox = true;
        },
        // 初始化宽高度
        defaultWH(){
            this.$nextTick(()=>{
                this.bodyW = $('body').width();
                this.bodyH = $('body').height();
                this.pos1 = $('#span1');
                this.pos2 = $('#span2');
                this.pos3 = $('#span3');
                this.pos4 = $('#span4');
                this.pos5 = $('#span5');
                this.pos6 = $('#span6');
                this.pos7 = $('#span7');
                this.pos8 = $('#span8');
                this.pos9 = $('#span9');

                let boxW = this.bodyW-40;
                let posW = parseFloat(boxW/3.06);//除法有问题
                

                this.dfdistance1 = (posW-50)/2;
                this.dfdistance2 = (posW-50)/2+posW;
                this.dfdistance3 = (posW-50)/2+(posW*2);

                $("#box").width(boxW);
                $("#box").height(boxW);
                $(".pos").width(posW);
                $(".pos").height(posW);

                {//设置初始位置
                    this.coordinate[0].top = this.dfdistance1;
                    this.coordinate[0].left = this.dfdistance1;

                    this.coordinate[1].top = this.dfdistance1;
                    this.coordinate[1].left = this.dfdistance2;

                    this.coordinate[2].top = this.dfdistance1;
                    this.coordinate[2].left = this.dfdistance3;

                    this.coordinate[3].top = this.dfdistance2;
                    this.coordinate[3].left = this.dfdistance1;

                    this.coordinate[4].top = this.dfdistance2;
                    this.coordinate[4].left = this.dfdistance2;

                    this.coordinate[5].top = this.dfdistance2;
                    this.coordinate[5].left = this.dfdistance3;

                    this.coordinate[6].top = this.dfdistance3;
                    this.coordinate[6].left = this.dfdistance1;

                    this.coordinate[7].top = this.dfdistance3;
                    this.coordinate[7].left = this.dfdistance2;

                    this.coordinate[8].top = this.dfdistance3;
                    this.coordinate[8].left = this.dfdistance3;
                }

                let boxWidth = 50;//圆形的宽度
                let boxHeight = 50;//圆形的高度
                {//保存初始位置
                    this.t1 = this.dfdistance1;
                    this.l1 = this.dfdistance1;
                    this.r1 = this.dfdistance1 + boxWidth;
                    this.b1 = this.dfdistance1 + boxHeight;

                    this.t2 = this.dfdistance1;
                    this.l2 = this.dfdistance2;
                    this.r2 = this.dfdistance2 + boxWidth;
                    this.b2 = this.dfdistance1 + boxHeight;

                    this.t3 = this.dfdistance1;
                    this.l3 = this.dfdistance3;
                    this.r3 = this.dfdistance3 + boxWidth;
                    this.b3 = this.dfdistance1 + boxHeight;

                    this.t4 = this.dfdistance2;
                    this.l4 = this.dfdistance1;
                    this.r4 = this.dfdistance1 + boxWidth;
                    this.b4 = this.dfdistance2 + boxHeight;

                    this.t5 = this.dfdistance2;
                    this.l5 = this.dfdistance2;
                    this.r5 = this.dfdistance2 + boxWidth;
                    this.b5 = this.dfdistance2 + boxHeight;

                    this.t6 = this.dfdistance2;
                    this.l6 = this.dfdistance3;
                    this.r6 = this.dfdistance3 + boxWidth;
                    this.b6 = this.dfdistance2 + boxHeight;

                    this.t7 = this.dfdistance3;
                    this.l7 = this.dfdistance1;
                    this.r7 = this.dfdistance1 + boxWidth;
                    this.b7 = this.dfdistance3 + boxHeight;

                    this.t8 = this.dfdistance3;
                    this.l8 = this.dfdistance2;
                    this.r8 = this.dfdistance2 + boxWidth;
                    this.b8 = this.dfdistance3 + boxHeight;

                    this.t9 = this.dfdistance3;
                    this.l9 = this.dfdistance3;
                    this.r9 = this.dfdistance3 + boxWidth;
                    this.b9 = this.dfdistance3 + boxHeight;
                }
                
            })
        },
        touchstart(index){//index不能用做数组下标，应减一
            this.choiseIndex = index;
            let ev = event.targetTouches[0]|| window.event;
            this[`pos${index}`].css("transition","all 0s");
        },
        touchmove(index){
            this.choiseIndex = index;
            let arryIndex = index -1;
            let ev = event.targetTouches[0]|| window.event;
            let domx = this[`dfX${this.choiseIndex}`]
            let domy = this[`dfY${this.choiseIndex}`]



            this.coordinate[arryIndex].left = ev.clientX - domx - 45;
            this.coordinate[arryIndex].top = ev.clientY - domy - this.topImgHeight;

            // let newt1 = this.coordinate[arryIndex].top;
            // let newr1 = this.coordinate[arryIndex].left + 50;
            // let newb1 = this.coordinate[arryIndex].top + 50;
            // let newl1 = this.coordinate[arryIndex].left;

            // for(let i=1;i<10;i++){
            //     if(this.choiseIndex!=i){
            //         if(newb1>this[`t${i}`] && newl1<this[`r${i}`] && newt1<this[`b${i}`] && newr1>this[`l${i}`]){
            //             console.log(`第${this.choiseIndex}个碰上了第${i}个`);
            //         }
            //     }else{

            //     }
            // }

        },
        touchend(index){
            this.choiseIndex = index;
            let arryIndex = index -1;
            let TouchTF = false;//判断是否触碰
            let TouchIndex = 10;//判断触碰到哪一个
            let newt1 = this.coordinate[arryIndex].top;
            let newr1 = this.coordinate[arryIndex].left + 50;
            let newb1 = this.coordinate[arryIndex].top + 50;
            let newl1 = this.coordinate[arryIndex].left;

            for(let i=1;i<10;i++){
                if(this.choiseIndex!=i){
                    if(newb1>this[`t${i}`] && newl1<this[`r${i}`] && newt1<this[`b${i}`] && newr1>this[`l${i}`]){
                        TouchTF = true;
                        TouchIndex = i;
                        break;
                    }else{
                        // console.log("没碰到")
                    }
                }else{

                }
            }

            if(TouchTF&&TouchIndex>0&&TouchIndex<10){//有触碰，判断等级一致才合并
                console.log("碰到了第"+TouchIndex+"个");
                if(this.listState[arryIndex].grade==this.listState[TouchIndex-1].grade){
                    this.listState[arryIndex].show = false;
                    this.listState[arryIndex].grade = 0;


                    this.listState[TouchIndex-1].grade = 2;
                    // this[`pos${TouchIndex}`].css("background","red");
                }else{
                    this.recoveryDf(index);
                    this[`pos${index}`].css("transition","all 0.5s");
                }
                

            }else{//无触碰
                this.recoveryDf(index);
                this[`pos${index}`].css("transition","all 0.5s");
            }


        },

        // 恢复默认地方
        recoveryDf(index){
            switch(index){
                case 1:
                    this.coordinate[0].top = this.dfdistance1;
                    this.coordinate[0].left = this.dfdistance1;
                case 2:
                    this.coordinate[1].top = this.dfdistance1;
                    this.coordinate[1].left = this.dfdistance2;
                case 3:
                    this.coordinate[2].top = this.dfdistance1;
                    this.coordinate[2].left = this.dfdistance3;
                case 4:
                    this.coordinate[3].top = this.dfdistance2;
                    this.coordinate[3].left = this.dfdistance1;
                case 5:
                    this.coordinate[4].top = this.dfdistance2;
                    this.coordinate[4].left = this.dfdistance2;
                case 6:
                    this.coordinate[5].top = this.dfdistance2;
                    this.coordinate[5].left = this.dfdistance3;
                case 7:
                    this.coordinate[6].top = this.dfdistance3;
                    this.coordinate[6].left = this.dfdistance1;
                case 8:
                    this.coordinate[7].top = this.dfdistance3;
                    this.coordinate[7].left = this.dfdistance2;
                case 9:
                    this.coordinate[8].top = this.dfdistance3;
                    this.coordinate[8].left = this.dfdistance3;
            }
        },

        //空位填充
        addItem(){
            let newArry = JSON.parse(JSON.stringify(this.listState));
            for(let i=0;i<newArry.length;i++){
                if(!newArry[i].show){
                    this.recoveryDf(i+1);
                    newArry[i].show = true;
                    newArry[i].grade = 1;
                    
                    break;
                }
            }
            this.listState = JSON.parse(JSON.stringify(newArry));
        }
    },

    filters:{

    },

    watch:{

    },

    //离开路由，不可截停
    destroyed(){

    },

    //离开路由，可截停
    beforeRouteLeave(to, from, next){
        next();
    },
}
</script>

<style lang="less" scoped>
    #pengz{
        background: #acc824;
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
    }
    #topImage{
        width: 100%;
        height: auto;
        img{
            width: 100%;
            height: auto;
        }
    }
    #box{
        width:100%;
        height: auto;
        // background:#eee;
        box-sizing: border-box;
        // overflow: hidden;
        margin:0 auto;
        position:relative;
        // border: solid 1px;
        
    }
    .pos{
            display: inline-block;
            width:30vw;
            height: 30vw;
            box-sizing: border-box;
            overflow: hidden;
            float:left;
            // border:solid 1px;
            background: url("../assets/image/img04.png") no-repeat;
            background-size: 80%;
            background-position: bottom center;
            font-size: 0;
            
        }
        .pos-span{
            position: absolute;
            display: inline-block;
            width:50px;
            height: 50px;
            // border-radius: 25px;
            color:#fff;
            line-height: 50px;
            position:absolute;
            top:0;
            left:0;
            text-align: center;
            img{
                width: 100%;
                height: auto;
            }
        }
        #buttonDom{
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 90px;
            #buttonD1{
                height: 35px;
                width: 100%;
                img{
                    height: 100%;
                    width: auto;
                }
                #button07{
                    margin-left: 10px;
                }
                #button08{
                    margin-left: 10%;
                }
            }
            #buttonD2{
                height: 35px;
                width: 100%;
                margin: 10px 0;
                img{
                    height: 100%;
                    width: auto;
                }
            }
            
        }
</style>