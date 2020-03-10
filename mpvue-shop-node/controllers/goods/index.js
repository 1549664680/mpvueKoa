const { mysql } = require('../../mysql')
//商品详情页数据
async function detailaction(ctx){
  const goodsId = ctx.query.goodsId
  const openId = ctx.query.openId
  // 商品信息获取
  const info =await mysql('nideshop_goods').where({
   'id':goodsId
  }).select()
  // 获取商品的图片
  const gallery = await mysql('nideshop_goods_gallery').where({
    'goods_id':goodsId
  }).select()
  // 商品参数
  // 关联查询leftJoin
  const attribute = await mysql('nideshop_goods_attribute').column('nideshop_goods_attribute.value', 'nideshop_attribute.name').leftJoin('nideshop_attribute', 'nideshop_goods_attribute.attribute_id', 'nideshop_attribute.id').where({
    'nideshop_goods_attribute.goods_id': goodsId
  }).select()
  // 常见问题
  const issueList = await mysql('nideshop_goods_issue').select()
  // 大家都在看
  const productList = await mysql('nideshop_goods').where({
    'category_id': info[0].category_id
  }).select()
   // 是否收藏
   const collected = await mysql('nideshop_collect').where({
    'user_id':openId,
    'value_id':goodsId
  }).select()
    let collectFlag = false
  if(collected.length > 0){
    collectFlag = true
  }
   // 用户购物车是否有此商品
  const oldnumber = await mysql('nideshop_cart').where({
    'user_id':openId
  }).column('number').select()
  let allnumber = 0
  if(oldnumber.length > 0){
    for(let i=0;i<oldnumber.length;i++){
      const element = oldnumber[i]
      allnumber += element.number
    }
  }
  ctx.body ={
    info:info[0],
    gallery:gallery,
    attribute:attribute,
    issueList:issueList,
    productList:productList,
    collectFlag:collectFlag,
    allnumber:allnumber 
  }
}

module.exports = {
  detailaction
}
