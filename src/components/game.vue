<!--
    *404页面
-->
<template>
    <div id="pengz">
        <div style="display:none">
            <img src="../assets/image/img01.png" alt="">
            <img src="../assets/image/img02.png" alt="">
            <img src="../assets/image/img03.png" alt="">
            <img src="../assets/image/img04.png" alt="">
            <img src="../assets/image/img05.png" alt="">
            <img src="../assets/image/img06.png" alt="">
            <img src="../assets/image/img07.png" alt="">
            <img src="../assets/image/img08.png" alt="">
            <img src="../assets/image/img09.png" alt="">
            <img src="../assets/image/img10.png" alt="">
            <img src="../assets/image/img11.png" alt="">
        </div>

        <div id="topImage">
            <img src="../assets/image/img12.png" alt="" @load="topImgLoad">
        </div>
        <div id="box" v-show="showBox">
            <div v-for="(item,index) in 9" :key="index" class="pos" :id="'pos'+(index+1)"></div>
     
            <div v-for="(item,index) in 9" :key="index" v-show="listState[index].show" class="pos-span" :id="'span'+(index+1)" :style="{left:listState[index].grade==1?coordinate[index].left+'px':coordinate[index].left-12+'px',top:coordinate[index].top+'px'}" @touchstart="touchstart(index+1)" @touchmove="touchmove(index+1)" @touchend="touchend(index+1)"><img :src="listState[index].grade==1?require('../assets/image/img06.png'):require('../assets/image/img05.png')" alt=""></div>

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

            dfdistanceTop1:0,
            dfdistanceTop2:0,
            dfdistanceTop3:0,
            dfdistanceLeft1:0,
            dfdistanceLeft2:0,
            dfdistanceLeft3:0,

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
            tophongbaoHeight:0,
            showBox:false,
            hongbaoW:0,
            hongbaoH:0,
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
        getDom(){
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
        },
        topImgLoad(){
            this.tophongbaoHeight = $("#topImage").height();
            this.defaultWH();
            this.showBox = true;
        },
        // 初始化宽高度
        defaultWH(){
            this.$nextTick(()=>{
                this.getDom();
                let boxH = this.bodyH - this.tophongbaoHeight - 90;
                let boxW =  this.bodyW;
                let posH = 0;
                let posW = 0;
                let posSpanW = 0;
                let tudiT = 0;
                
                posW = parseFloat(boxW/3);//除法有问题
                posH = parseFloat(boxH/3);
                if(posH>posW){
                    posH = posW
                }
                posSpanW = 0.6*posW
                this.hongbaoH = posSpanW/1.057
                this.hongbaoW = posSpanW;
                tudiT = 0.8*posH

                this.dfdistanceTop1 = (tudiT - this.hongbaoH)+2;
                this.dfdistanceTop2 = (tudiT - this.hongbaoH)+posH+2;
                this.dfdistanceTop3 = (tudiT - this.hongbaoH)+(posH*2)+2;

                this.dfdistanceLeft1 = (posW-posSpanW)/2 + 10;
                this.dfdistanceLeft2 = (posW-posSpanW)/2+posW+ 10;
                this.dfdistanceLeft3 = (posW-posSpanW)/2+(posW*2)+ 10;


                $(".pos").width(posW);
                $(".pos").height(posH);
                $(".pos-span").width(posSpanW);

                {//设置初始位置
                    this.coordinate[0].top = this.dfdistanceTop1;
                    this.coordinate[0].left = this.dfdistanceLeft1;

                    this.coordinate[1].top = this.dfdistanceTop1;
                    this.coordinate[1].left = this.dfdistanceLeft2;

                    this.coordinate[2].top = this.dfdistanceTop1;
                    this.coordinate[2].left = this.dfdistanceLeft3;

                    this.coordinate[3].top = this.dfdistanceTop2;
                    this.coordinate[3].left = this.dfdistanceLeft1;

                    this.coordinate[4].top = this.dfdistanceTop2;
                    this.coordinate[4].left = this.dfdistanceLeft2;

                    this.coordinate[5].top = this.dfdistanceTop2;
                    this.coordinate[5].left = this.dfdistanceLeft3;

                    this.coordinate[6].top = this.dfdistanceTop3;
                    this.coordinate[6].left = this.dfdistanceLeft1;

                    this.coordinate[7].top = this.dfdistanceTop3;
                    this.coordinate[7].left = this.dfdistanceLeft2;

                    this.coordinate[8].top = this.dfdistanceTop3;
                    this.coordinate[8].left = this.dfdistanceLeft3;
                }

                let boxWidth = 50;//圆形的宽度
                let boxHeight = 50;//圆形的高度
                {//保存初始位置
                    this.t1 = this.dfdistanceTop1;
                    this.l1 = this.dfdistanceLeft1;
                    this.r1 = this.dfdistanceLeft1 + boxWidth;
                    this.b1 = this.dfdistanceTop1 + boxHeight;

                    this.t2 = this.dfdistanceTop1;
                    this.l2 = this.dfdistanceLeft2;
                    this.r2 = this.dfdistanceLeft2 + boxWidth;
                    this.b2 = this.dfdistanceTop1 + boxHeight;

                    this.t3 = this.dfdistanceTop1;
                    this.l3 = this.dfdistanceLeft3;
                    this.r3 = this.dfdistanceLeft3 + boxWidth;
                    this.b3 = this.dfdistanceTop1 + boxHeight;

                    this.t4 = this.dfdistanceTop2;
                    this.l4 = this.dfdistanceLeft1;
                    this.r4 = this.dfdistanceLeft1 + boxWidth;
                    this.b4 = this.dfdistanceTop2 + boxHeight;

                    this.t5 = this.dfdistanceTop2;
                    this.l5 = this.dfdistanceLeft2;
                    this.r5 = this.dfdistanceLeft2 + boxWidth;
                    this.b5 = this.dfdistanceTop2 + boxHeight;

                    this.t6 = this.dfdistanceTop2;
                    this.l6 = this.dfdistanceLeft3;
                    this.r6 = this.dfdistanceLeft3 + boxWidth;
                    this.b6 = this.dfdistanceTop2 + boxHeight;

                    this.t7 = this.dfdistanceTop3;
                    this.l7 = this.dfdistanceLeft1;
                    this.r7 = this.dfdistanceLeft1 + boxWidth;
                    this.b7 = this.dfdistanceTop3 + boxHeight;

                    this.t8 = this.dfdistanceTop3;
                    this.l8 = this.dfdistanceLeft2;
                    this.r8 = this.dfdistanceLeft2 + boxWidth;
                    this.b8 = this.dfdistanceTop3 + boxHeight;

                    this.t9 = this.dfdistanceTop3;
                    this.l9 = this.dfdistanceLeft3;
                    this.r9 = this.dfdistanceLeft3 + boxWidth;
                    this.b9 = this.dfdistanceTop3 + boxHeight;
                }
                
            })
        },
        touchstart(index){//index不能用做数组下标，应减一
            this.getDom();
            this.choiseIndex = index;
            let ev = event.targetTouches[0]|| window.event;
            this[`pos${index}`].css("transition","all 0s");
            this[`pos${index}`].css("z-index","100");
        },
        touchmove(index){
            this.choiseIndex = index;
            let arryIndex = index -1;
            let ev = event.targetTouches[0]|| window.event;
            let domx = this[`dfX${this.choiseIndex}`]
            let domy = this[`dfY${this.choiseIndex}`]



            this.coordinate[arryIndex].left = ev.clientX - domx - (this.hongbaoW/2);
            this.coordinate[arryIndex].top = ev.clientY - domy - this.tophongbaoHeight - (this.hongbaoH/2);

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
                console.log("第"+index+"个"+"碰到了第"+TouchIndex+"个");
                if(this.listState[arryIndex].grade==1&&this.listState[TouchIndex-1].grade==1){
                    this.listState[arryIndex].show = false;
                    this.listState[arryIndex].grade = 0;
                    this.listState[TouchIndex-1].grade = 2;
                }else if(this.listState[arryIndex].grade==2&&this.listState[TouchIndex-1].grade==2){
                    console.log("此处应该弹出中奖页面");
                    this.listState[arryIndex].show = false;

                }else{
                    this.recoveryDf(index);
                }
                this[`pos${index}`].css("transition","all 0.5s");
                this[`pos${index}`].css("z-index","0");

            }else{//无触碰
                this.recoveryDf(index);
                this[`pos${index}`].css("transition","all 0.5s");
                this[`pos${index}`].css("z-index","0");
            }
        },

        // 恢复默认地方
        recoveryDf(index){
            switch(index){
                case 1:
                    this.coordinate[0].top = this.dfdistanceTop1;
                    this.coordinate[0].left = this.dfdistanceLeft1;
                case 2:
                    this.coordinate[1].top = this.dfdistanceTop1;
                    this.coordinate[1].left = this.dfdistanceLeft2;
                case 3:
                    this.coordinate[2].top = this.dfdistanceTop1;
                    this.coordinate[2].left = this.dfdistanceLeft3;
                case 4:
                    this.coordinate[3].top = this.dfdistanceTop2;
                    this.coordinate[3].left = this.dfdistanceLeft1;
                case 5:
                    this.coordinate[4].top = this.dfdistanceTop2;
                    this.coordinate[4].left = this.dfdistanceLeft2;
                case 6:
                    this.coordinate[5].top = this.dfdistanceTop2;
                    this.coordinate[5].left = this.dfdistanceLeft3;
                case 7:
                    this.coordinate[6].top = this.dfdistanceTop3;
                    this.coordinate[6].left = this.dfdistanceLeft1;
                case 8:
                    this.coordinate[7].top = this.dfdistanceTop3;
                    this.coordinate[7].left = this.dfdistanceLeft2;
                case 9:
                    this.coordinate[8].top = this.dfdistanceTop3;
                    this.coordinate[8].left = this.dfdistanceLeft3;
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
        display: table;

        width:100%;
        height: auto;
        // background:#eee;
        box-sizing: border-box;
        margin:0 auto;
        position:relative;
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
            background-size: 75%;
            background-position: 50% 80%;
            font-size: 0;
            
        }
        .pos-span{
            position: absolute;
            display: inline-block;
            width:50px;
            height: auto;
            // border-radius: 25px;
            color:#fff;
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