import AWS from "aws-sdk";

export const write = async (item) => {

    AWS.config.update({
         region: "ap-southeast-2"
    });

    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
        TableName: "auto_checkin",
        Item: item
    };
    return await docClient.put(params).promise();
}

export const read = async () => {
  AWS.config.update({
       region: "ap-southeast-2"
  });

  const docClient = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName : "auto_checkin"
  }
  return await docClient.scan(params).promise().then(data => data.Items.filter(i => !i.checkedIn));
}
