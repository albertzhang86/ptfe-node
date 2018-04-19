export default {
  development: {
    logFile: 'application.log',
    logLevel: 'debug',
    api: {
      user: 'https://jsonplaceholder.typicode.com/users',
      post: 'https://jsonplaceholder.typicode.com/posts'
    }
  },
  local: {
    logFile: 'application.log',
    logLevel: 'debug',
    api: {
      user: 'https://jsonplaceholder.typicode.com/users',
      post: 'https://jsonplaceholder.typicode.com/posts'
    }
  },
  production: {
    logFile: '%LOG_FILE_LOCATION%',
    logLevel: '%LOG_LEVEL%',
    api: {
      user: 'https://jsonplaceholder.typicode.com/users',
      post: 'https://jsonplaceholder.typicode.com/posts'
    }
  },
  common: {
    port: 3000,
    bodyLimit: '100kb',
    corsHeaders: ['Link']
  }
};
