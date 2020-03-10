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
module.exports = {
  submitAction
}