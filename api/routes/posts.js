var express = require('express');
var router = express.Router();
var User = require('../../model/User');
var Post = require('../../model/Post');
var bcrypt = require('bcryptjs');
var checkAuth = require('../middleware/check-auth');

router.get('/list',checkAuth,function (req,res) {
  Post.find({}).populate('author').exec(function (err,rtn) {
    if(err){
      res.status(500).json({
        message: "Internal Server Error",
        error : err
      })
    }else {
      res.status(200).json({
        posts:rtn
      });
    }
  })
})



router.post('/add',checkAuth,function (req,res) {
  var post = new Post();
  post.title = req.body.title;
  post.content = req.body.content;
  post.author = req.body.author;
  post.save(function (err,rtn) {
    if(err){
      res.status(500).json({
        message : "Internal Server Error",
        error :err
      })
      }else {
        res.status(201).json({
          message:"Post Account Created!!",
          posts : rtn
        })
    }
  })
})

router.get('/:id',checkAuth,function (req,res) {
  Post.findById(req.params.id).populate('author').exec(function (err,rtn) {
    if(err){
      res.status(500).json({
        message : "Internal Server Error",
        error :err
      })
    }else {
      res.status(200).json({
        message : "User Detail",
        user : rtn
      })
    }
  })
})

router.patch('/:id',checkAuth,function (req,res) {
  var update = {};
  for(var opt of req.body){
    update[opt.proName] = opt.proValue
  }
  Post.findByIdAndUpdate(req.params.id,{$set:update},function (err,rtn) {
    if(err){
      res.status(500).json({
        message : "Internal Server Error",
        error :err
      })
    }else {
      res.status(200).json({
        message:"User Account Updated"
      })
    }
  })
})



router.delete('/:id',checkAuth,function (req,res) {
  Post.findByIdAndRemove(req.params.id,function (err,rtn) {
    if(err){
      res.status(500).json({
        message :"Internal Server Error",
        error : err
      })
    }else {
      res.status(200).json({
        message : "User Account Deleted!!"
      })
    }
  })
})



module.exports = router;
