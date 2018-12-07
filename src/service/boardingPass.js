import axios from 'axios';
import uuid from 'uuid';
const generateBPAPI = config.api.generateBoardingPass;
const forwardBPAPI = config.api.forwardBoardingPass;

export const generateBoardingPass = async (generateBoardingPassRequest) => {
    const config = {
        headers:{
            Accept: 'application/vnd.checkin.boardingpass.v2+json',
            'Content-Type': 'application/vnd.checkin.boardingpass.v2+json',
            Channel: 'OLCI',
            userSessionID: uuid.v4()
        }
    };
    return await axios.post(generateBPAPI, generateBoardingPassRequest, config);
}


export const sendForwardBP = async (generateBoardingPassRequest) => {
    
    const forwardBoardingPassRequest = createForwardBPRequest();
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Channel: 'OLCI',
            userSessionID: uuid.v4()
        }
        
    };
    return await  axios.post(forwardBPAPI, forwardBoardingPassRequest, config);
}

const createForwardBPRequest = (generateBPRequestBody) => {

    const  customers = getCustomers(generateBPRequestBody.customers);
    
    const requestJson = {
        booking: {
            surname: generateBPRequestBody.booking.surname,
            pnr: generateBPRequestBody.booking.pnr
        },
        customers: customers,
        email:null,
        forwardSMS: true,
        mobileDetails: {
            countryCode: "+61",
            mobileNumber: generateBPRequestBody.mobile
        }
    };
    return requestJson;

};

const getCustomers = (generateBPCustomers) => {
    
    const customers = generateBPCustomers.map(customer => {
        return {
            customerId: customer.customerId,
            title: customer.title,
            givenName: customer.givenName,
            surname: customer.surname,
            products: getProducts(customer.products)
        };
    });
    return customers;
    
};

const getProducts = (generateBPProducts) => {
    const products  = generateBPProducts.map(product => {
       return {
           productId: product.productId,
           productType: "INTERNATIONAL",
           flightNumber: product.flightNumber,
           departure: {
               airportCode: product.departure.airportCode,
               airportName: product.departure.airportName,
               departureDate: product.departure.departureDate,
               departureTime: product.departure.departureTime
           },
           arrival:{
               airportCode: product.arrival.airportCode,
               airportName: product.arrival.airportName,
               departureDate: product.arrival.departureDate,
               departureTime: product.arrival.departureTime
           },
           companyIdentifier:{
               marketingCarrierCode: product.companyIdentifier.marketingCarrierCode,
               operatingCarrierCode: product.companyIdentifier.operatingCarrierCode
           },
           barcodeRequired: true,
           passbookRequired: product.passbookRequired,
           digitalBpAccepted: product.digitalBpAccepted
       }  
    });
    return products;
};
