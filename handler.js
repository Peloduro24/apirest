'use strict';
let AWS = require("aws-sdk");

module.exports.hello = async (event) => {
  AWS.config.update({ region: "us-east-1" });

  const docClient = new AWS.DynamoDB.DocumentClient();

  let bodyprubea = ""
  const params = {
    TableName: "TEST",
  };

  try {
    const data = await docClient.scan(params).promise();

    console.log("Items encontrados:", data.Items);
    if (
      event.requestContext.http.method === "POST"
    ) {
      console.log(JSON.parse(event.body), "as")
      const params1 = JSON.parse(event.body)
      const params = {
        TableName: "TEST",
        Item: {
          id: params1.payload.id,
          nombre: params1.payload.nombre
        }
      }
      await docClient.put(params).promise();
      bodyprubea = event.requestContext.http
    }

    return {
      test: "scan",
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Scan ejecutado correctamente',
          items: data.Items,
          event: event,
          bodyprubea

        },
        null,
        2
      ),
    };
  } catch (err) {
    console.error("Error en scan:", err);

    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: 'Error al ejecutar scan',
          error: err,
        },
        null,
        2
      ),
    };
  }

};
