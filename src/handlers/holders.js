/* eslint strict:"off" */
"use strict";

const Meta = require("html-metadata-parser");
const { get } = require("lodash");

module.exports = async (request, reply) => {
  const defaultWallet = "0x4bd70556ae3f8a6ec6c4080a0c327b24325438f3";
  const { wallet = defaultWallet } = request.query;
  const url = `https://etherscan.io/token/${wallet}`;
  try {
    Meta.parser(url, function (error, result) {
      if (error || !result) {
        console.error(error || "retrieval failed.");
        reply
          .status(400)
          // .header("Content-Type", "application/json; charset=utf-8")
          .send(error || "retrieval failed.");
      }
      const description = get(result, "og.description");
      if (!description || !description.includes("holders ")) {
        console.error("no description found.");
        reply
          .status(400)
          // .header("Content-Type", "application/json; charset=utf-8")
          .send("no description found.");
      }
      const string2 = get(description.split("holders "), "1");
      const holders = get(string2.split(" "), "0");
      console.log("zzz holders:", holders);
      reply
        .status(200)
        // .header("Content-Type", "application/json; charset=utf-8")
        .send({ holders });
    });
  } catch (error) {
    console.error(error || "parser failed.");
    reply.status(400).send("parser failed.");
  }
};
