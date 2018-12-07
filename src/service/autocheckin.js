import AWS from "aws-sdk";


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
        } else {
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
        }
    });

}    
