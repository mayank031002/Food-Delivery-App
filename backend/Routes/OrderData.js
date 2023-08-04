const express = require('express')
const router = express.Router();
const Order=require('../models/Orders');

router.post('/orderData',async(req,res)=>{
    let data=req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})
    //if email not existing in db the create else InsertMany()
    let eId=await Order.findOne({email:req.body.email})
    console.log(eId)
    console.log(req.body.email)
    //first order of this user
    if(eId==null){
        try {                       
            await Order.create({
                email:req.body.email,
                order_data:[data]
            }).then(()=>{
                res.json({success:true})
            })
        } catch (error) {
            console.log(error.message)
            res.status("Server Error").send(error.message)

        }
    }
    else{
        try {
           await Order.findOneAndUpdate({email:req.body.email},
               {$push:{order_data:data}}).then(()=>{
                res.json({success:true}) 
            }) 
        } catch (error) {
            res.status("Server Error").send(error.message)
        }
    }
})
router.post('/myorderData',async(req,res)=>{
  try {
    let myData=await Order.findOne 
  } catch (error) {
    
  }


})

module.exports=router;