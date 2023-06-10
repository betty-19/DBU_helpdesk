const express= require('express')
const router= express.Router()

const {signin}= require('../controllers/auth/signin') 
router.route('/signin').post(signin)

const {signup}= require('../controllers/auth/signup')
router.route('/signup').post(signup)

module.exports= router
