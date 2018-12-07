import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import config from './config';
<<<<<<< HEAD
import subscribe from './api/subscribe';
=======
import autocheckin from './api/autocheckin';
>>>>>>> c6101ef2ce1bf8d9eda6d3dd14d0c0439563242a
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
  app.use('/api/subscribe', subscribe());
  app.use('/api/health', health());

<<<<<<< HEAD
=======
  app.use('/api/autocheckin', autocheckin());

>>>>>>> c6101ef2ce1bf8d9eda6d3dd14d0c0439563242a
  server.listen(process.env.PORT || config.common.port);

  return server;
}
