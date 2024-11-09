const express= require("express");
const router= express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const linstingController=require("../controllers/listing.js");
const multer=require("multer");
// const upload=multer({dest:'uploads/'});

const{storage}=require("../cloudConfig.js");
const upload=multer({storage});




router.route("/")
      .get(wrapAsync(linstingController.index))
       .post(isLoggedIn,upload.single("listing[image]"),validateListing,wrapAsync(linstingController.createListing));
  
router.get("/new",isLoggedIn,(linstingController.renderNewForm));


router.route("/:id")
      .get(wrapAsync(linstingController.showListing))
      .put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(linstingController.updateListing))
      .delete(isLoggedIn,isOwner,wrapAsync(linstingController.destroyListing));

//edit route
router.get("/:id/edit",isOwner,isLoggedIn, wrapAsync(linstingController.renderEditForm));


module.exports = router;
