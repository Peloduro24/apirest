'use strict';
let AWS = require("aws-sdk");
const mysql = require('mysql2/promise');

module.exports.hello = async (event) => {
  AWS.config.update({ region: "us-east-1" });

  const docClient = new AWS.DynamoDB.DocumentClient();

  const params = {
    TableName: "TEST",
  };

  const connection = await mysql.createPool({
    host: "bareq14istuf7vmjke0a-mysql.services.clever-cloud.com",
    user: "uiexpfrazy0okyo1",
    password: "EOqbRUqzoWE0EtbnDiTY",
    database: "bareq14istuf7vmjke0a",
  });
  console.log("CONEXION MYSQL CREADA", connection)

  try {
    const [rows] = await connection.execute('SELECT * FROM Usuario');

    console.log("DATOS DE MYSQL CREADAS", rows);
    const data = await docClient.scan(params).promise();

    console.log("Items encontrados:", data.Items);

    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Scan ejecutado correctamente',
          items: data.Items,
          respuestaMysql: JSON.stringify(rows)
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
  finally {
    await connection.end(); // cerrar conexión
  }
};