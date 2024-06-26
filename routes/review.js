const express=require("express");
const router=express.Router({mergeParams: true});
const wrapAsync=require("../utils/wrapAsync.js");
const expresserror = require("../utils/expresserror.js");
const Review =require("../models/review.js");
const Listing = require("../models/listing.js");


//reviews
//POST ROUTE

router.post("/" ,wrapAsync( async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
  
    listing.reviews.push(newReview);
  
    await newReview.save();
    await listing.save();
  
    console.log("new review saved");
    res.send("new review saved");
  
    res.redirect(`/listings/${listing._id}`);
  
}));
  
  //Delete Review Route
  router.delete("/:reviewId",
  wrapAsync (async(req,res)=>{
    let{id,reviewId}=req.params;
  
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
  
    res.redirect(`/listings/${id}`);
  
  }));
  
  module.exports=router;
  
  
  
  
  