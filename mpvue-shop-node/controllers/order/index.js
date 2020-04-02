const { mysql } = require('../../mysql')

async function submitAction (ctx){
  const {openId ,goodsId,allprice} = ctx.request.body
  //是否存在订单
  const isorder = mysql('nideshop_order').where({
    'user_id':openId,
    'goodsId':goodsId
  }).select()
  if(isorder.length > 0){
    const data = await mysql('nideshop_order').where({
      'user_id':openId,
      'goodsId':goodsId
    }).update({
      goods_id:goodsId,
      user_id:openId,
      allprice:allprice
    })
    if(data){
      ctx.body = {
        data : true
      }
    }else{
      ctx.body = {
        data : false
      }
    }
  }else{
    const data = await mysql('nideshop_order').insert({
      goods_id:goodsId,
      user_id:openId,
      allprice:allprice
    })
    if(data){
      ctx.body = {
        data :true
      }
    }else{
      ctx.body = {
        data : false
      }
    }
  }
}
async function detailAction (ctx) {
  const  openId = ctx.query.openId
  const addressId = ctx.query.addressId || ' '
  const orderDetail = await mysql('nideshop_order').where({
    'user_id':openId
  }).select()
  var goodsIds = orderDetail[0].goods_id.split(',')
  // console.log(goodsIds)
  const list = await mysql('nideshop_cart').andWhere({
    'user_id':openId
  }).whereIn('goods_id',goodsIds).select()
  // console.log(list)
  var addressList;
  if(addressId){
    addressList = await mysql('nideshop_address').where({
      'user_id':openId,
      'id':addressId
    }).orderBy('is_default','desc').select()
  }else{
    addressList = await mysql('nideshop_address').where({
      'user_id':openId,
    }).orderBy('is_default','desc').select()
  }
  ctx.body = {
    price:orderDetail[0].allprice,
    goodsList:list,
    address:addressList[0] || {}
  }
}
module.exports = {
  submitAction,
  detailAction
}