<template>
  <div class="cart">
    <div class="top">
      <div>30天无忧退货</div>
      <div>48小时快速退款</div>
      <div>满88元免邮费</div>
    </div>
    <div class="cartlist">
      <div class="item" v-for="(item,index) in listData" :key="index">
        <div class="con">
          <div class="left">
            <div class="icon"></div>
            <div class="img">
              <img :src="item.list_pic_url" alt="">
            </div>
            <div class="info">
              <p>{{item.goods_name}}</p>
              <p>￥{{item.retail_price}}</p>
            </div>
          </div>
          <div class="right">
            <div class="num">X {{item.number}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="fixed">
      <div class="left">
        全选(0)
      </div>
      <div class="right">
        <div>￥0</div>
        <div>下单</div>
      </div>
    </div>
  </div>
</template>

<script>
import { get,post,getStorageOpenid} from '../../utils'
export default {
  data(){
    return {
      openId:'',
      listData:[]
    }
  },
  onShow(){
    this.openId = getStorageOpenid()
    this.getlistData()
  },
  methods:{
    async getlistData (){
      const data = await get('/cart/cartList',{
        openId:this.openId
      })
      console.log(data)
      this.listData = data.data
    }
  }
}
</script>

<style lang="less" scoped>
@import './style.less';
</style>