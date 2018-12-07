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

const createForwardBPRequest = () => {

    const requestJson = {
        booking:{
            surname:"MCCOWAN",
                pnr:"TASMAN1"
        },
        customers:[
            {
                customerId:"9EA53749FC9A4D6E",
                title:"Mr",
                givenName:"Lilly",
                surname:"Pierini",
                products:[
                    {
                        productId:"677691382A2248C7",
                        productType:"INTERNATIONAL",
                        flightNumber:"180",
                        departure:{
                            airportCode:"SYD",
                            airportName:"Sydney",
                            departureDate:"20190124",
                            departureTime:"0625"
                        },
                        arrival:{
                            airportCode:"CHC",
                            airportName:"Christchurch",
                            arrivalDate:"Invalid date",
                            arrivalTime:"Invalid date"
                        },
                        companyIdentifier:{
                            marketingCarrierCode:"QF",
                            operatingCarrierCode:"QF"
                        },
                        barcodeRequired:true,
                        passbookRequired:true,
                        digitalBpAccepted:true
                    }
                ],
                email:null,
                forwardEmail:false,
                forwardSMS:true,
                mobileDetails:{
                    countryCode:"+61",
                    mobileNumber:"453534545"
                }
            }
        ]
    };
    return requestJson;

}

