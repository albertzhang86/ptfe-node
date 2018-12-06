import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config';
import user from './api/users';
import health from './api/health';
import http from 'http';
import winstonLogger from './middleware/winstonLogger';

export default function() {
  let app = express();
  const server = http.createServer(app);

  app.use(cors({
    exposedHeaders: config.common.corsHeaders
  }));

  app.use(bodyParser.json({
    limit: config.common.bodyLimit
  }));
  // health check and info check for autoscaling
  app.use('/api/health', health());


  server.listen(process.env.PORT || config.common.port);

  return server;
}
