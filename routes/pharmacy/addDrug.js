/* 
    :: Add drug_types and branded_drugs
    URL : localhost:3000/pharmacy/addDrug
*/ 

const express = require('express');
const router = express.Router();
const Pharmacy = require('../../models/Pharmacy');
const { getDrugTypes, getBrandedDrugs, putPharmacyDrugTypes,putPharmacyBrandedDrugs,getPharmacyDrugTypes,getPharmacyBrandedDrugs} = require('../../models/Pharmacy');
const isAPharmacy = require('../../middleware/isAPharmacy');

//Get drug_types and branded_drugs from the database
// localhost:3000/pharmacy/addDrug
router.get('/', isAPharmacy, function(request, response) {

    async function getData(){
        try{
            const pharmacy_id = request.session.user.id;
            const drug= await getDrugTypes(pharmacy_id);
            const brand = await getBrandedDrugs(pharmacy_id);
            
            response.render('pharmacy/addDrugPage',{drug_types: drug, branded_drugs: brand});
        }
        catch(err){
            console.log(err);
        }        
    }
    getData();
    
});


//Insert submitted data into pharmacy_drug_types and pharmacy_branded_drugs tables
router.post('/', isAPharmacy, function (request, response) {
    const pharmacy_id = request.session.user.id;
    
    const result= Object.keys(request.body);
    const drug_type_data=[];
    const branded_drug_data= [];

    for(var i=0; i<result.length;i++){
        if(result[i][0]==="4"){
            drug_type_data.push(result[i]);
        }else{
            branded_drug_data.push(result[i]);
        }
    }
    

    //Insert submitted data into pharmacy_drug_types table
    async function insertPharmacyDrugTypes(){
        try{
            const drug= await putPharmacyDrugTypes(pharmacy_id, drug_type_data);
        }
        catch(err){
            console.log(err);
        }      
    }
    insertPharmacyDrugTypes();  

    //Insert submitted data into pharmacy_drug_types and pharmacy_branded_drugs table
    async function insertPharmacyBrandedDrugs(){
        try{
            const brand = await putPharmacyBrandedDrugs(pharmacy_id, branded_drug_data);
        }
        catch(err){
            console.log(err);
        }       
    }
    insertPharmacyBrandedDrugs();

    async function getData(){
        try{
            const drug= await getDrugTypes();
            const brand = await getBrandedDrugs();
            
            response.render('pharmacy/addDrugPage',{drug_types: drug, branded_drugs: brand});
        }
        catch(err){
            console.log(err);
        }        
    }
    getData();
    
    
    
});


module.exports = router;