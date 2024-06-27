const express = require('express');
const router = express.Router();
const {upload,uploadfile} = require('../Controller/image-controller.js');
const {getAllPost,createPost,getpostByid, updatePost, deletePost, likePost, dislikePost} = require('../Controller/post-controller.js');
const {forgot_password} = require('../Controller/password-controller.js');
const {Profile,UserPost,userInfo} = require('../Controller/profile-controller.js');
const { singupUser, loginUser, logoutUser,updateuser} = require('../Controller/user-controller.js');
const {newcomment,getComments,commentDelete} = require('../Controller/comment-controller.js');
const {authenticateToken} = require('../Controller/jwt-controller.js');
require("../Models/image-details.js");


router.post('/login', loginUser);
router.post('/signup', singupUser);
router.post('/logout',logoutUser);
router.post('/file/upload', uploadfile);
router.post('/create',authenticateToken,createPost);
router.get('/getAllPost',authenticateToken,getAllPost);
router.get('/post/:id',authenticateToken, getpostByid);
router.put('/update/:id',authenticateToken,updatePost);
router.delete('/delete/:id',authenticateToken,deletePost);
router.post('/comment/new',authenticateToken,newcomment);
router.get('/comments/:id',authenticateToken,getComments);
router.delete('/commentdelete/:id',authenticateToken,commentDelete);
router.get('/postbyname/:username',UserPost);
router.get('/user/:username',authenticateToken,Profile);
router.post('/forgot-password',forgot_password);
router.put('/updateuser/:id',updateuser)
router.get('/userdata/:id',userInfo)
router.put('/like/:id', likePost);
router.put('/dislike/:id', dislikePost);

module.exports = router;
