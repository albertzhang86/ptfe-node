export default {
  development: {
    logFile: 'application.log',
    logLevel: 'debug',
    api: {
      user: 'https://jsonplaceholder.typicode.com/users',
      post: 'https://jsonplaceholder.typicode.com/posts',
      eligibility: 'http://ptfecs.master.dev.a833-12.ams04.nonp.qcpaws.qantas.com.au/v1/eligibility';
    }
  },
  local: {
    logFile: 'application.log',
    logLevel: 'debug',
    api: {
      user: 'https://jsonplaceholder.typicode.com/users',
      post: 'https://jsonplaceholder.typicode.com/posts',
      eligibility: 'http://ptfecs.master.dev.a833-12.ams04.nonp.qcpaws.qantas.com.au/v1/eligibility';
    }
  },
  production: {
    logFile: '%LOG_FILE_LOCATION%',
    logLevel: '%LOG_LEVEL%',
    api: {
      user: 'https://jsonplaceholder.typicode.com/users',
      post: 'https://jsonplaceholder.typicode.com/posts',
      eligibility: 'http://ptfecs.master.dev.a833-12.ams04.nonp.qcpaws.qantas.com.au/v1/eligibility';
    }
  },
  common: {
    port: 3000,
    bodyLimit: '100kb',
    corsHeaders: ['Link']
  }
};
