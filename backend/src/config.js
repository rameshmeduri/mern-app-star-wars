import appRoot from 'app-root-path';

const env = process.env;

const config = {
  logFileName: env.LOG_FILE || `${appRoot}/server.log`,  
  secret: env.SECRET
};

export default config;
