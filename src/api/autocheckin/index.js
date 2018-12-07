import { Router } from 'express';
import errorHandler from '../../util/errorHandler';
import { read } from "../../service/db";

export default () => {
  const router = Router();
  router
  .get('/', async (req, res) =>  {
    try {
      const items = await read();
      res.json({ items });
    } catch (e) {
      errorHandler(res, e);
    }
  });
  return router;
}
