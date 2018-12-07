import AWS from "aws-sdk";
import axios from "axios";
import config from "../config";

const generateBPAPI = config.api.g;

export const readAutocheckin = async () => {

    AWS.config.update({
         region: "ap-southeast-2"
    });
    
    const docClient = new AWS.DynamoDB.DocumentClient();

    var params = {
        TableName: "autocheckin",
        Key: {
            "customerId": "4355353535fgfgfg"
        }
    };

    docClient.get(params, function (err, data) {
        if (err) {
            console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            return {};
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            return data.Item.value;
        }
    });

}    

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

