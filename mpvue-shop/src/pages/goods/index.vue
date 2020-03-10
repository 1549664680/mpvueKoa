<template>
  <div class="goods">
    <div class="swiper">
      <swiper class="swiper-container" indicator-dots="true" autoplay="true" interval="3000" duration="1000">
        <blok v-for="(item, index) in gallery" :key="index">
          <swiper-item class="swiper-item">
            <img :src="item.img_url" alt="" class="slide-image">
          </swiper-item>
        </blok>
      </swiper>
      <button class="share" hover-class="none" open-type="share" value="">分享商品</button>
    </div>
    <div class="swiper-b">
      <div class="item">30天无忧退货</div>
      <div class="item">48小时快速退款</div>
      <div class="item">满88元免邮费</div>
    </div>
    <div class="goods-info">
      <div class="c">
        <p>{{info.name}}</p>
        <p>{{info.goods_brief}}</p>
        <p>￥{{info.retail_price}}</p>
        <div class="brand" v-if="brand.name">
          <p>{{brand.name}}</p>
        </div>
      </div>
    </div>
    <div class="section-nav" @click="showType">
      <div>请选择规格数量</div>
      <div></div>
    </div>
    <!-- 商品参数 -->
    <div class="attribute">
      <div class="head">商品参数</div>
      <div class="item" v-for="(item, index) in attribute" :key="index">
        <div>{{item.name}}</div>
        <div>{{item.value}}</div>
      </div>
    </div>
    <!-- 图片展示 -->
    <div class="detail">
      <wxParse :content="goods_desc"/>
    </div>
    <!-- 常见问题 -->
    <div class="common-problem">
      <div class="h">
        <text class="title">常见问题</text>
      </div>
      <div class="b">
        <div class="item" v-for="(item, index) in issueList" :key="index">
          <div class="question-box">
            <text class="spot"></text>
            <div class="question">{{item.question}}</div>
          </div>
          <div class="answer">
           {{item.answer}}
          </div>
        </div>
      </div>
    </div>
    <!-- 大家都在看 -->
    <div class="common-problem">
      <div class="h">
        <text class="title">大家都在看</text>
      </div>
      <div class="sublist">
        <div v-for="(subitem, index) in productList" :key="index">
          <img :src="subitem.list_pic_url" alt="">
          <p>{{subitem.name}}</p>
          <p>{{subitem.retail_price}}</p>
        </div>
      </div>
    </div>
    <!-- footer -->
    <!-- footer -->
    <div class="bottom-fixed">
      <div class="collect-box" @click="collect">
        <div class="collect" :class="[collectFlag ? 'active' : '']"></div>
      </div>
      <div class="car-box" @click="toCart">
        <div class="car" >
          <span>{{allnumber}}</span>
          <img src="/static/images/ic_menu_shoping_nor.png" alt="">
        </div>
      </div>
      <div @click="buy">立即购买</div>
      <div @click="addCart">加入购物车</div>
    </div>
    <!-- 选择规格的弹出层 -->
  <div class="pop" v-show="showpop" @click="showType"></div>
    <div class="attr-pop" :class="[showpop ? 'fadeup' : 'fadedown']">
      <div class="top">
        <div class="left">
          <img :src="info.primary_pic_url" alt="">
        </div>
        <div class="right">
          <div>
            <p>价格¥{{info.retail_price}}</p>
            <p>请选择数量</p> 
          </div>
        </div>
        <div class="close" @click="showType">✖️</div>
      </div>
      <div class="b">
        <p>数量</p> 
        <div class="count">
          <div class="cut" @click="reduce">-</div>
          <input type="text" class="number" v-model="number" disabled="false">
          <div class="add" @click="add">+</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get,post} from '../../utils'
import wxParse from 'mpvue-wxparse'
export default {
  data(){
    return {
      gallery:[] ,//banner
      goodsId:1009024,
      openId:'',
      info:{},
      brand:{},
      showpop:false,
      number:0,
      attribute:[],
      goods_desc:'',
      issueList:[], //常见问题
      productList:[],
      collectFlag:false,
      allnumber:0,
      allprice:0,
    }
  },
 onLoad (option) {
    this.goodsId = option.id || 1009024
  },
  components:{
    wxParse
  },
  // 商品分享
  onShareAppMessage(){
    // console.log(this.info.name)
    return {
      title:this.info.name,
      path:'/pages/goods/main?id'+  this.info.id,
      imageUrl:this.gallery[0].img_url
    }
  },
  methods:{
    async buy(){
      if(this.showpop){
        if(this.number == 0){
          wx.showToast({
            title:'请选择商品数量',
            duration:2000,
            icon:'none',
            mask:true,
            success:res => {}
          })
          return false
        }
        const data = await post('/order/submitAction',{
          goodsId:this.goodsId,
          openId:this.openId,
          allprice:Number(this.allprice * this.number)
        })
        if(data){
          wx.navigateTo({
            url:'/pages/order/main'
          })
        }
      }else{
        this.showpop = true
      }
    },
    async addCart(){
      if(this.showpop){
        this.allnumber = this.allnumber + this.number
        if(this.number == 0){
          wx.showToast({
            title:'请选择商品数量',
            duration:2000,
            icon:'none',
            mask:true,
            success:res => {}
          })
          return false
        }
        const data = await post('/cart/addCart',{
          openId:this.openId,
          goodsId:this.goodsId,
          number:this.number
        })
      }else{
        this.showpop = true
      }
    },
    toCart(){
      wx.switchTab({
        url:'/pages/cart/main'
      })
    },
    async collect(){
      this.collectFlag = !this.collectFlag
      const data = await post('/collect/addcollect',{
        openId:this.openId,
        goodsId:this.goodsId
      })
      console.log(data)
    },
    reduce(){
      if(this.number>1){
        this.number -= 1
      }else{
        return false
      }
    },
    add(){
      this.number += 1
    },
    showType(){
      this.showpop = !this.showpop
    },
    async goodsDetail(){
      const data = await get('/goods/detailaction',{
        goodsId:this.goodsId,
        openId:this.openId
      })
      this.gallery = data.gallery
      this.info = data.info
      this.attribute = data.attribute
      this.goods_desc = data.info.goods_desc
      this.issueList = data.issueList
      this.productList = data.productList
      this.collectFlag = data.collectFlag
      this.allnumber = data.allnumber,
      this.allprice = data.info.retail_price
      console.log(data)
    }
  },
  mounted(){
    this.openId = wx.getStorageSync('openId') || 'wx21b80689ffbaa708';
    this.goodsDetail()
  }
}
</script>

<style lang="less" scoped>
@import './style.less';
</style>