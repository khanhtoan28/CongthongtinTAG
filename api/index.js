// Vercel Serverless Function entrypoint. The shared handler keeps local and
// production API behavior identical without starting a long-lived HTTP server.
module.exports = require('../server');
