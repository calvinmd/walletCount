/* eslint strict:"off" */
"use strict";

const holders = require("../src/handlers/holders");

module.exports = async (request, reply) => {
  return await holders(request, reply);
};
