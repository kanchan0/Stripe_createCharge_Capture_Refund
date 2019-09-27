const express=require('express');
const stripe=require('stripe')('sk_test_eQ5ANV9O16cFiPLLVGnqpXKG00szItjLaG');
const app=express();
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/add-customer-with-card",create_token)
app.post("/create-charges/:id",create_charges)
app.post("/capture-id/:charge_id",capture_charge)
app.post("/refund/:id",refund)

async function create_token(req,res){

    let body1 = {};
    body1.number = req.body.number;
    body1.exp_month= req.body.exp_month;
    body1.exp_year=req.body.exp_year;
    body1.cvc= req.body.cvc;
    body1.name= req.body.name;
    body1.address_line1= req.body.address_line1;
    body1.address_line2= req.body.address_line2;
    body1.address_city=req.body.address_city;
    body1.address_zip=req.body.address_zip;
    body1.address_state=req.body.address_state;
    body1.address_country=req.body.address_country;

    let customer_name = req.body.name;
    let descripion = req.body.description;
    let phone = req.body.phone;
    let email= req.body.email;

    try{
    var result = await stripe.tokens.create({card:body1})
            console.log("token_id >>>>",result.id)
            
           let output = await stripe.customers.create({ 
            source:result.id,
            description:descripion,
            name:customer_name,
            phone:phone,
            email:email,
           })
            
           console.log("customer_id >>>>>>>>>>>>>>>>>>>>>>>",output.id);
            res.send({status:true,message:"customer created successfully",data:output})
    }
    catch(err){
        res.send({status:false,message:"some error occurred",eror:err})
    }
}
   

async function create_charges(req,res){
   
    let currency = req.body.currency;
    let amount = req.body.amount;
    let description = req.body.description;

    let id = req.params.id;
//console.log("currency"+currency,"amount"+amount,"desc"+description);
      try{      
           let charge = await stripe.charges.create({
                amount: amount,
                currency: currency,
                customer:id, 
                description: description,
                capture:false
           })
           console.log("charge_id >>>>>",charge.id)
           res.send({status:true,data:charge})
        }
        catch(err){
            console.log("error occurred")
            res.send({status:false,message:"error occured",err:err})
        }

}

async function capture_charge(req,res){
    let charge_id=req.params.charge_id;
    try{
    var captured=await stripe.charges.capture(charge_id)
        if(captured){
            res.send({status:true,message:"captured",data:captured})
        }
    }
    catch(err){
        console.log("error occured while capturing the charge")
        res.send({status:false,error:err})
    }              
}


async function refund(req,res){
    
    let charge_id = req.params.id;
    let amount = req.body.amount;
    
    if(amount==null){
        
        let charge = await stripe.charges.retrieve(charge_id)
         amount=charge.amount;
    }
    try{
        let refund=await stripe.refunds.create({ 
            
            charge:charge_id,
            amount:amount 
        })
           
        if(refund){
            res.send({status:true,message:"refund done",data:refund})
        }
    }
    catch(err){
        console.log("error occured during refund")
        res.send({status:false,message:"some error occured during the refund",error_object:err})
    }      
}

const PORT=3000;
app.listen(PORT,console.log(`Server is up on port ${PORT}...`));