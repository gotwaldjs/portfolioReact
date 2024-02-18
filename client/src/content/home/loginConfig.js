let loginConfig;
try {
  // Only try to load the config file if in a non-production environment
  if (process.env.NODE_ENV !== 'production') {
    loginConfig = require('../../config.json');
  }
} catch (error) {
  // If the config file is missing or it's a production environment, use environment variables
  loginConfig = {
    clientId: process.env.CLIENT_ID,
    discoveryEndpoint: process.env.DISCOVERY_ENDPOINT
  };
}

export { loginConfig };


// Use loginConfig where needed
