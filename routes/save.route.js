const router = require('express').Router()

const {getSaved, addNewSaved, deleteSaved, getAllPlaylist, addNewPlaylist, removeAllPlaylist, getSinglePlaylist, updateSinglePlaylist, deleteSinglePlaylist, getSinglePlaylistVideo, deleteSinglePlaylistVideo} = require('../controllers/save.controller')

const {findPlaylistByUserId, findPlaylistById, findVideoById} = require('../middlewares/save.middleware')

router.route('/')
  .get(getSaved)
  .post(addNewSaved)
  .delete(deleteSaved)

router.use(findPlaylistByUserId)

router.route('/u')
  .get(getAllPlaylist)
  .post(addNewPlaylist)
  .delete(removeAllPlaylist)

router.param('playlistId', findPlaylistById)

router.route('/u/:playlistId')
  .get(getSinglePlaylist)
  .post(updateSinglePlaylist)
  .delete(deleteSinglePlaylist)

router.param('videoId', findVideoById)

router.route('/u/:playlistId/:videoId')
  .get(getSinglePlaylistVideo)
  .delete(deleteSinglePlaylistVideo)
module.exports = router