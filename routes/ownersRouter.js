const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const {generateToken} = require("../utils/generateToken");
const ownerModel = require("../models/owner-model"); 

if(process.env.NODE_ENV === "development"){
    router.post("/create", async function(req,res){
            let owners = await ownerModel.find();
            if(owners.length >0) {
                    req.flash("error","User Already Existing, Please Login.");
                    return res.redirect("/create");
            }

            let{fullname,email,password}= req.body;

            let createdOwner = await ownerModel.create({
                fullname,
                email,
                password,
            });
            res.status(201).send(createdOwner);
        });
    }

router.get("/admin",function(req,res){
    let success = req.flash("success");
    res.render("createproducts",{success});
});

module.exports = router;