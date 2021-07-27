const router = require('express').Router()
const {login, signUp} = require('../controllers/auth.controller')

router.get('/', (req,res) => {
  res.status(200).json({success:true, message:"Auth check ok"})
})
router.route('/login')
  .post(login)

router.route('/sign-up')
  .post(signUp)
module.exports = router