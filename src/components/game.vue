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
        <div id="userHead">
            <div id="head"><img src="../assets/image/img13.png" alt=""></div>
            <div id="userId">248797</div>
        </div>
        <div id="userGrade" :style="{top:gradeTop+'px'}">当前等级:LV{{intGrade}}</div>
        <div id="userIntegral" :style="{top:integralTop+'px'}"><img src="../assets/image/img14.png" alt=""><span>{{intIntegral}}</span></div>
        <div id="topImage">
            <img src="../assets/image/img12.png" alt="" @load="topImgLoad">
        </div>
        <div id="box" v-show="showBox">
            <div v-for="(item,index) in 9" :key="index" class="pos" :id="'pos'+(index+1)">
                <div id="ProfitDom"  :class="listState[index].show?'ProfitAnima':''"><img src="../assets/image/img14.png" alt=""><span>+{{currentNum[index]}}</span></div>
            </div>
     
            <div v-for="(item,index) in 9" :key="index" v-show="listState[index].show" class="pos-span" :id="'span'+(index+1)" :style="{left:listState[index].grade==1?coordinate[index].left+'px':coordinate[index].left-12+'px',top:coordinate[index].top+'px'}" @touchstart.prevent="touchstart(index+1)" @touchmove.prevent="touchmove(index+1)" @touchend.prevent="touchend(index+1)"><img :src="listState[index].grade==1?require('../assets/image/img06.png'):require('../assets/image/img05.png')" alt=""></div>

        </div>
        <div id="buttonDom">
            <div id="buttonD1">
                <div id="button08" @click="addItem">
                    <p id="p1">Lv.{{intGrade}}</p>
                    <p id="p2">消耗1000福气值</p>
                </div>
                <img src="../assets/image/img07.png" alt="" id="button07">
            </div>
            <div id="buttonD2">
                <img src="../assets/image/img09.png" alt="" @click="Todownload()">
                <div @click="Todownload()"><span></span></div>
            </div>
        </div>
        <!-- 中奖了 -->
        <div id="winning" v-show="showWin">
            <img src="../assets/image/img06.png" alt="" id="popupHB">
            <div id="centerBox">
                <img src="../assets/image/img02.png" alt="" id="popupImg1">
                <img src="../assets/image/img03.png" alt="" id="popupImg2" @click="closeP(1)">
                <img src="../assets/image/img01.png" alt="" id="popupImg3" @click="Todownload()">
            </div>
        </div>

        <!-- 升级了 -->
        <div id="upgraded" v-show="showUpgraded">
            <img src="../assets/image/img06.png" alt="" id="upgradedHB">
            <div id="centerBox2">
                <img src="../assets/image/img10.png" alt="" id="popupImg4">
                <div id="popupImg5">
                    <img src="../assets/image/img16.png" alt="" id="gqImg">
                    <img src="../assets/image/img05.png" alt="" id="jbImg">
                </div>
                <img src="../assets/image/img17.png" alt="" id="xzButton1" @click="closeP(2)">
                <img src="../assets/image/img18.png" alt="" id="xzButton2" @click="Todownload()">
            </div>
        </div>

        <!-- 积分不足 -->
        <div id="noIntegral" v-show="noIntegral">人气不足，请稍等~</div>
            
        <div id="guide1" v-show="showGuide">
            <div v-show="showGuide1" id="guideText1">{{guideText1}}</div>
        </div>

        <div id="guide2" v-show="showGuide2" @touchstart.prevent="hideGuide2">
            <div :style="{top:(tophongbaoHeight-25)+'px'}">滑动收获奖励</div>
            <img :style="{top:(tophongbaoHeight+hongbaoH/2)+'px'}" src="../assets/image/img15.png" alt="">
        </div>
    </div>
</template>

<script>
import $ from "jquery"
import Vconsole from 'vconsole'

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
            chaichu:null,

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
            t9:0,l9:0,r9:0,b9:0,ccT:0,ccL:0,ccR:0,ccB:0,



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
            showWin:false,
            showUpgraded:false,
            noIntegral:false,
            gradeTop:0,
            integralTop:0,
            intGrade:1,//当前等级
            intIntegral:7000,//当前积分
            currentNum:[171,135,198,225,315,156,119,275,310],
            numArr:[100,125,150,175,200,225,250,275,300,325,350,375,400,425,450,475,500,525,550,575],
            setInterval1:null,
            setInterval2:null,
            setInterval3:null,
            setInterval4:null,
            setInterval5:null,
            setInterval6:null,
            setInterval7:null,
            setInterval8:null,
            setInterval9:null,

            setTiemout1:null,
            setTiemout2:null,
            setTiemout3:null,
            setTiemout4:null,
            setTiemout5:null,
            setTiemout6:null,
            setTiemout7:null,
            setTiemout8:null,
            setTiemout9:null,
            noIntegralTime:null,
            addNum:0,//点击第几次
            showGuide:true,
            showGuide2:false,
            guideText1:"点击种植福袋",
            showGuide1:true,
        }
    },

    activated(){

    },

    created(){
        if(this.$route.query.open=="openvc"){
            const vConsole = new Vconsole()
            Vue.use(vConsole)
        }
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
            this.chaichu = $('#button07');
        },
        topImgLoad(){
            this.tophongbaoHeight = $("#topImage").height();
            let gradeH = $("#userGrade").height();//等级文字高度
            let gradeBGH = 0.195*this.tophongbaoHeight;//等级背景高度
            let integralH = $("#userGrade").height();//积分文字高度
            let integralBGH = 0.195*this.tophongbaoHeight;//积分背景高度

            this.gradeTop = 0.45*this.tophongbaoHeight+((gradeBGH-gradeH)/2);
            this.integralTop = 0.61 *this.tophongbaoHeight + ((integralBGH-integralH)/2);
            this.defaultWH();
            this.showBox = true;
        },
        // 初始化宽高度
        defaultWH(){
            this.$nextTick(()=>{
                this.getDom();
                let boxH = this.bodyH - this.tophongbaoHeight - 100;
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

                    this.ccT = this.chaichu.offset().top-this.tophongbaoHeight;//拆除位置
                    this.ccL = this.chaichu.offset().left;
                    this.ccR = this.ccL+this.chaichu.width();
                    this.ccB = this.ccT+this.chaichu.height();

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
                // console.log("第"+this.choiseIndex+"个"+"碰到了第"+TouchIndex+"个");
                if(this.listState[arryIndex].grade==1&&this.listState[TouchIndex-1].grade==1){
                    this.listState[arryIndex].show = false;
                    this.listState[arryIndex].grade = 0;
                    this.listState[TouchIndex-1].grade = 2;
                    clearInterval(this[`setInterval${index}`]);
                    clearTimeout(this[`setTiemout${index}`]);
                    this.showUpgraded = true;
                    this.intGrade++;
                }else if(this.listState[arryIndex].grade==2&&this.listState[TouchIndex-1].grade==2){
                    // console.log("此处应该弹出中奖页面");
                    this.listState[arryIndex].show = false;
                    this.listState[arryIndex].grade = 0;
                    this.showWin = true;
                    clearInterval(this[`setInterval${index}`]);
                    clearTimeout(this[`setTiemout${index}`]);

                }else{
                    this.recoveryDf(index);
                }
                this[`pos${index}`].css("transition","all 0.5s");
                this[`pos${index}`].css("z-index","0");

            }else{//无触碰,判断是否移除操作
                if(newb1>this.ccT&& newl1<this.ccR&& newt1<this.ccB&& newr1>this.ccL){
                    // console.log("已经移除");
                    this.listState[arryIndex].show = false;
                    this.listState[arryIndex].grade = 0;
                    this[`pos${index}`].css("transition","all 0s");
                    clearInterval(this[`setInterval${index}`]);
                    clearTimeout(this[`setTiemout${index}`]);
                    this.intIntegral +=800;
                }else{
                    // console.log("归位");
                    this.recoveryDf(index);
                    this[`pos${index}`].css("transition","all 0.5s");
                }
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

        setInter(index){
            let listIndex = index+1;
            let newArry1 = JSON.parse(JSON.stringify(this.currentNum));
            let that = this;
            this[`setInterval${listIndex}`] = setInterval(() => {
                newArry1[index] = that.randomNum();
                that.intIntegral+=newArry1[index];
                that.currentNum = JSON.parse(JSON.stringify(newArry1));
            }, 8000);

        },
        setTime(index){
            let that = this;
            clearTimeout(that[`setTiemout${index+1}`]);
            that[`setTiemout${index+1}`] = setTimeout(() => {
                that.intIntegral+=that.currentNum[index];
                that.setInter(index);
            }, 3500);
            
        },
        //空位填充
        addItem(){
            this.addNum++;
            if(this.addNum==1){
                this.guideText1 = "再次点击种植福袋"
            }else if(this.addNum==2){
                this.showGuide = false;
                this.showGuide2 = true;
            }else if(this.addNum>=3){
            }
            let newArry = JSON.parse(JSON.stringify(this.listState));
            for(let i=0;i<newArry.length;i++){
                if(!newArry[i].show){
                    if(this.intIntegral>=1000){
                        this.recoveryDf(i+1);
                        newArry[i].show = true;
                        newArry[i].grade = 1;
                        this.intIntegral-=1000;
                        this.setTime(i);
                    }else{
                        // console.log("积分不足");
                        this.noIntegral = true;
                        clearTimeout(this.noIntegralTime);
                        this.noIntegralTime = setTimeout(() => {
                            this.noIntegral = false;
                        }, 1500);
                    }
                    
                    break;
                }
            }
            this.listState = JSON.parse(JSON.stringify(newArry));
        },

        closeP(index){
            if(index==1){
                this.showWin = false;

            }else{
                this.showUpgraded = false;
            }
        },
        randomNum(minNum=100,maxNum=500){ 
            return parseInt(Math.random()*(maxNum-minNum)+minNum);
        },
        hideGuide2(){
            this.showGuide2 = false;
        },
        Todownload(){
            console.log(window.playableSDK);
            window.playableSDK.openAppStore();
        },

    },

    filters:{

    },

    watch:{
        // intIntegral(val,old){
        //     if(val>=0&&val<4999){
        //         if(this.intGrade<1){
        //             this.intGrade = 1;
        //         }
        //     }else if(val>=5000&&val<9999){
        //         if(this.intGrade<2){
        //             this.intGrade = 2;
        //         }
        //     }else if(val>=10000&&val<14999){
        //         if(this.intGrade<3){
        //             this.showUpgraded = true;
        //             this.intGrade = 3;
        //         }
        //     }else if(val>=15000&&val<19999){
        //         if(this.intGrade<4){
        //             this.showUpgraded = true;
        //             this.intGrade = 4;
        //         }
        //     }else if(val>=20000&&val<24999){
        //         if(this.intGrade<5){
        //             this.showUpgraded = true;
        //             this.intGrade = 5;
        //         }
        //     }else if(val>=25000&&val<29999){
        //         if(this.intGrade<6){
        //             this.showUpgraded = true;
        //             this.intGrade = 6;
        //         }
        //     }else if(val>=30000&&val<34999){
        //         if(this.intGrade<7){
        //             this.showUpgraded = true;
        //             this.intGrade = 7;
        //         }
        //     }else if(val>=35000&&val<39999){
        //         if(this.intGrade<8){
        //             this.showUpgraded = true;
        //             this.intGrade = 8;
        //         }
        //     }else if(val>=40000&&val<44999){
        //         if(this.intGrade<9){
        //             this.showUpgraded = true;
        //             this.intGrade = 9;
        //         }
        //     }else if(val>=45000&&val<49999){
        //         if(this.intGrade<10){
        //             this.showUpgraded = true;
        //             this.intGrade = 10;
        //         }
        //     }else if(val>=50000&&val<54999){
        //         if(this.intGrade<11){
        //             this.showUpgraded = true;
        //             this.intGrade = 11;
        //         }
        //     }
        // }
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
    #userHead{
        position:absolute;
        top: 15px;
        left: 20px;
        height: 45px;
        // width: 100%;
        font-size: 0;
        #head{
            width: 45px;
            height: 45px;
            border-radius: 45px;
            background: blue;
            display: inline-block;
            vertical-align: middle;
            z-index: 1;
            position: relative;
            border: solid 2px #fff;
            overflow: hidden;
        }
        #userId{
            width: 80px;
            height: 25px;
            border: 30px;
            background: #acc824;
            display: inline-block;
            vertical-align: middle;
            border-radius: 0 25px 25px 0;
            margin-left: -10px;
            line-height: 25px;
            color: #fff;
            font-size: 14px;
            overflow: hidden;
            border: solid 1.5px #fff;
        }
    }
    #userGrade{
        position: absolute;
        // top: 16%;
        left: calc(12vw + 10px);
        transform:rotate(-5deg);
        color: #9e1818;
        font-size: 3.7vw;
        font-weight: bold;
        text-shadow: #fff 1px 0 0,#fff 0 1px 0,#fff -1px 0 0 ,#fff 0 -1px 0;
    }
    #userIntegral{
        position: absolute;
        top: 23.5%;
        left: 23px;
        color: #9e1818;
        font-weight: bold;
        // -webkit-text-stroke: 1px #fff;
        text-shadow: #fff 1px 0 0,#fff 0 1px 0,#fff -1px 0 0 ,#fff 0 -1px 0;
        transform:rotate(5deg);
        
        img{
            width: 6vw;
            vertical-align: middle;
        }
        span{
            vertical-align: middle;
            margin-left: 2px;
            font-size: 3.7vw;
        }
    }
    #topImage{
        width: 100%;
        height: auto;
        font-size: 0;
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
            // overflow: hidden;
            float:left;
            // border:solid 1px;
            background: url("../assets/image/img04.png") no-repeat;
            background-size: 75%;
            background-position: 50% 80%;
            font-size: 0;
            position: relative;
            
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
            height: 100px;
            #buttonD1{
                height: 45px;
                width: 100%;
                img{
                    height: 100%;
                    width: auto;
                }
                #button07{
                    margin-left: 10px;
                    vertical-align: middle;
                }
                #button08{
                    margin-left: 15%;
                    height: 35px;
                    width: 37.47%;
                    display: inline-block;
                    vertical-align: middle;
                    z-index: 11;
                    position: relative;
                    background:url('../assets/image/img08.png') no-repeat;
                    background-size: 100% 100%; 
                    font-size: 0;
                    color: #fff;
                    font-weight: bold;
                    #p1{
                        display: block;
                        height: 20px;
                        line-height: 23px;
                        font-size: 15px;
                    }
                    #p2{
                        display: block;
                        height: 15px;
                        line-height: 13px;
                        font-size: 12px;
                    }
                }
            }
            #buttonD2{
                height: 35px;
                width: 100%;
                margin: 10px 0;
                font-size: 0;
                position: relative;
                img{
                    height: 100%;
                    width: auto;
                }
                div{
                    position: absolute;
                    top: 15%;
                    left: 35%;
                    height: 70%;
                    width: 30%;
                    font-size: 0;
                    overflow: hidden;
                }
                span{
                    width: 30px;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: -30px;
                    background-image: linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0.8));
                    animation-name: textAnimaiton;
                    animation-duration: 1s;
                    animation-timing-function: linear;
                    animation-iteration-count:infinite;
                    border-radius: 5px;
                }
            }
            
        }
        @keyframes textAnimaiton {
            0%{
                left: -30px;
            }
            100%{
                left: 100%;
            }
        }
@keyframes hbAnimaiton {
    0% {
        transform:rotate(10deg);
    }
    35%{
        transform:rotate(10deg);
    }
    50%{
        transform:rotate(-30deg);
    }
    65%{
        transform:rotate(30deg);
    }
    80%{
        transform:rotate(10deg);
    }
    100% {
        transform:rotate(10deg);
    }
    }
#winning{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: rgba(0,0,0,0.7);
    z-index: 200;
    #popupHB{
        position: absolute;
        top: 20px;
        right: 10px;
        width: 55px;
        height: auto;
        transform:rotate(10deg);
        animation-name: hbAnimaiton;
        animation-duration: 2s;
        animation-iteration-count:infinite;
    }
    #centerBox{
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 70%;
        max-width: 250px;
        #popupImg1{
            width: 100%;
            height: auto;
            display: block;
            margin: 0 auto;

        }
        #popupImg2{
            width: 25px;
            height: auto;
            display: block;
            margin: 20px auto;

        }
        #popupImg3{
            width: 100%;
            height: auto;
            display: block;
            margin: 0 auto;


        }
    }
}
#upgraded{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: rgba(0,0,0,0.7);
    z-index: 200;
    #upgradedHB{
        position: absolute;
        top: 20px;
        right: 10px;
        width: 55px;
        height: auto;
        transform:rotate(10deg);
        animation-name: hbAnimaiton;
        animation-duration: 2s;
        animation-iteration-count:infinite;
    }
    #centerBox2{
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-45%);
        width: 80%;
        max-width: 300px;
        #popupImg4{
            width: 100%;
            height: auto;
            display: block;
            margin: 0 auto;

        }
        #popupImg5{
            width:100%;
            height: auto;
            margin: 0 auto;
            position: relative;
            #gqImg{
                width:100%;
                height: auto;
                animation-name: xzAnimaiton;
                animation-duration: 7s;
                animation-iteration-count:infinite;
                animation-timing-function: linear;
            }
            #jbImg{
                position: absolute;
                top: 50%;
                left:50%;
                transform: translate(-50%,-50%);
                width: 40%;
                height: auto;
            }
        }
        #xzButton1{
            width: 90%;
            height: auto;
            margin: 10px 0;
        }
        #xzButton2{
            width: 90%;
            height: auto;
        }
    }
}
@keyframes xzAnimaiton {
    0%{
        transform:rotate(0deg);
    }
    100%{
        transform:rotate(360deg);

    }
}
.ProfitAnima{
    animation-name: myAnimaiton;
    animation-duration: 8s;
    animation-iteration-count:infinite;
}
#ProfitDom{
    position: absolute;
    left: 50%;
    top: 100%;
    opacity: 0;
    transform: translate(-50%);
    z-index: 1;
    img{
        width: 20px;
        height: auto;
        vertical-align: middle;
    }
    span{
        font-size: 14px;
        vertical-align: middle;
        color: #fff;
    }
}
@keyframes myAnimaiton {
    0% {
        top: 100%;
        opacity: 0;
    }
    40%{
        top: 50%;
        opacity: 0;
    }
    50%{
        top: 0;
        opacity: 1;
    }
    60%{
        top: 0;
        opacity: 0;
    }
    100% {
        top: 0;
        opacity: 0;
    }
}
#noIntegral{
    position: absolute;
    z-index: 200;
    font-size: 20px;
    color: #fff;
    text-shadow: #555 1px 0 0,#555 0 1px 0,#555 -1px 0 0 ,#555 0 -1px 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: rgba(0,0,0,0.5);
    padding: 5px 15px;
    display: table;
    border-radius: 5px;
    width: 60%;
    max-width: 250px;
}
#guide1{
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    top: 0;
    left: 0;
    z-index: 10;
    #guideText1{
        font-size: 6vw;
        color: #fff;
        font-weight: 500;
        position: absolute;
        bottom: 100px;
        width: 100%;
        text-align: center;
    }
}
#guide2{
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    top: 0;
    left: 0;
    z-index: 12;
    div{
        position: absolute;
        font-size: 5vw;
        color: #fff;
        font-weight: 500;
        left: 15%;
    }
    img{
        width: 45px;
        height: auto;
        position: absolute;
        left: 15%;
        animation-name: guideAnimation;
        animation-duration: 1s;
        animation-iteration-count:infinite;
    }

}
@keyframes guideAnimation {
    0% {
        left: 15%;
    }
    100% {
        left: 45%;
    }
}
</style>