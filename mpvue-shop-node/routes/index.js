const router = require('koa-router')({
  prefix: '/lm'
  // 路由前缀
})
const controllers = require('../controllers/index')

router.get('/index/index',controllers.home.index)

// 搜索相关的接口
router.get('/search/indexaction', controllers.search.index.indexAction)
router.post('/search/addHistoryAction', controllers.search.index.addHistoryAction)
router.post('/search/clearhistoryAction', controllers.search.index.clearHistoryAction) // 清除搜索历史
router.get('/search/helperaction', controllers.search.index.helperAction) // 搜索提示
// 商品详情页相关
router.get('/goods/detailaction', controllers.goods.index.detailaction)
router.get('/goods/goodsList',controllers.goods.index.goodsList)
//收藏相关
router.post('/collect/addcollect',controllers.collect.index.addcollect)
//订单相关
router.post('/order/submitAction',controllers.order.index.submitAction)
router.get('/order/detailAction',controllers.order.index.detailAction)
//购物车
router.post('/cart/addCart',controllers.cart.index.addCart)
router.get('/cart/cartList',controllers.cart.index.cartList)
//地址相关
router.get('/address/getListAction',controllers.address.index.getListAction)
router.get('/address/detailAction',controllers.address.index.detailAction)
router.post('/address/saveAction',controllers.address.index.saveAction)
// 类别相关
router.get('/category/categoryNav',controllers.category.index.categoryNav)
router.get('/category/indexaction', controllers.category.index.indexAction)
router.get('/category/currentaction', controllers.category.index.currentAction)
// 专题接口
router.get('/topic/listaction', controllers.topic.index.listAction)
router.get('/topic/detailaction', controllers.topic.index.detailAction)
module.exports = router