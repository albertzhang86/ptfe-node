export default {
  development: {
    logFile: 'application.log',
    logLevel: 'debug',
    api: {
      user: 'https://jsonplaceholder.typicode.com/users',
      post: 'https://jsonplaceholder.typicode.com/posts',
      eligibility: 'http://ptfecs.master.dev.a833-12.ams04.nonp.qcpaws.qantas.com.au/v1/eligibility',
      generateBoardingPass: 'http://checkin.master.acp.a833-01.ams04.nonp.qcpaws.qantas.com.au/checkin/api/boardingpass/generate',
      forwardBoardingPass: 'http://checkin.master.acp.a833-01.ams04.nonp.qcpaws.qantas.com.au/checkin/fwdbp/v1/forwardbp'  
    }
  },
  local: {
    logFile: 'application.log',
    logLevel: 'debug',
    api: {
      user: 'https://jsonplaceholder.typicode.com/users',
      post: 'https://jsonplaceholder.typicode.com/posts',
      eligibility: 'http://ptfecs.master.dev.a833-12.ams04.nonp.qcpaws.qantas.com.au/v1/eligibility',
      generateBoardingPass: 'http://checkin.master.acp.a833-01.ams04.nonp.qcpaws.qantas.com.au/checkin/api/boardingpass/generate',
      forwardBoardingPass: 'http://checkin.master.acp.a833-01.ams04.nonp.qcpaws.qantas.com.au/checkin/fwdbp/v1/forwardbp'

    }
  },
  production: {
    logFile: '%LOG_FILE_LOCATION%',
    logLevel: '%LOG_LEVEL%',
    api: {
      user: 'https://jsonplaceholder.typicode.com/users',
      post: 'https://jsonplaceholder.typicode.com/posts',
      eligibility: 'http://ptfecs.master.dev.a833-12.ams04.nonp.qcpaws.qantas.com.au/v1/eligibility',
      generateBoardingPass: 'http://checkin.master.acp.a833-01.ams04.nonp.qcpaws.qantas.com.au/checkin/api/boardingpass/generate',
      forwardBoardingPass: 'http://checkin.master.acp.a833-01.ams04.nonp.qcpaws.qantas.com.au/checkin/fwdbp/v1/forwardbp'

    }
  },
  common: {
    port: 3000,
    bodyLimit: '100kb',
    corsHeaders: ['Link']
  }
};
