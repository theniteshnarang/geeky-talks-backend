const router = require('express').Router()

const {getLiked, deleteLiked, getLikeModel, updateLikeModel, deleteLikeModel, getLikeItem, deleteLikeItem} = require('../controllers/like.controller')

const {findLikeModelByUserId, findLikeItemByLikeId} = require('../middlewares/like.middleware')

router.route('/')
  .get(getLiked)
  // .post(updateLiked)
  .delete(deleteLiked)

router.use(findLikeModelByUserId)

router.route('/u')
  .get(getLikeModel)
  .post(updateLikeModel)
  .delete(deleteLikeModel)

router.param('likeId', findLikeItemByLikeId)

router.route('/u/:likeId')
  .get(getLikeItem)
  .delete(deleteLikeItem)



module.exports = router