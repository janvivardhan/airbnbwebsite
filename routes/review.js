const express= require("express");
const router= express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const {isLoggedIn,validateReview,isAuthor}=require("../middleware.js");
const reviewControllers = require("../controllers/reviews.js");



//reviews
//post  route

router.post("/",isLoggedIn,validateReview,wrapAsync(reviewControllers.createReview));
  
  
  //delete review route
  
  router.delete("/:reviewId",isLoggedIn,isAuthor,wrapAsync(reviewControllers.destroyReview));

  module.exports = router;