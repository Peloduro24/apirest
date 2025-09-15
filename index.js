var AWS = require("aws-sdk");
export const handler = async (event) => {
  let dt;
  // TODO implement
  console.log("event", AWS);
  AWS.config.update({ region: "us-east-1" });

  const docClient = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: "TEST",
  };

docClient.get(params, (err, data) => {
  if (err) {
    console.error("Error al obtener item:", err);
  } else {
    console.log("Item:", data.Item);
    dt = {
      statusCode: 200,
      body: data.Item,
    };
  }
});
  return dt;
};
