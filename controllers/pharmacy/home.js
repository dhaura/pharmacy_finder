const express = require('express');
const router = express.Router();
const Pharmacy = require('../../models/Pharmacy');
const path = require('path');

const viewHome = async (request, response) => {


    try {
        const result_1 = await Pharmacy.getRequests(request.session.user.id);
        const result_2 = await Pharmacy.getPharmacyInfoByID(request.session.user.id);

        var data = {requests: result_1[1], responded_requests: result_1[0], pharmacy_info: result_2[0]};
        // return response.render('pharmacy/home', result);
        return response.status(200).send(data);

    }
    catch (error) {
        var err_msg = "Internal server error" + error.message;
        console.log(error);

        // return response.status(500).send(err_msg);

        return response.render('500', { err_data: err_msg });
    }

    

}

exports.viewHome = viewHome;