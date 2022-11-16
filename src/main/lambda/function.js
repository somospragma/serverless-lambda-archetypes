'use strict';
const auditPlugin = require('familia-audit-plugin-nodejs');


module.exports.lambdaFuntion = async (event) => {
  try {
    let message = {
      description: "Message"
    };
    let NameQueue = "hello";
    auditPlugin.sendMessage(message, NameQueue, null, null);

    return returMapping(200, 200, "succes", "ok", null, null)
  } catch (error) {
    return returMapping(500, 500, "error", "error", null, error.message)
  }
};

let returMapping = function (httpStatusCode, statusCode, devMessage, userMessage, errorCode, result) {
  return {
    statusCode: httpStatusCode,
    body: JSON.stringify({
      status: statusCode,
      developerMessage: devMessage,
      userMessage: userMessage,
      errorCode: errorCode,
      moreInfo: result
    })
  };
}
