import { Router } from 'express';
import { matchedData } from 'express-validator/filter';
import errorHandler from '../../util/errorHandler';
import {readAutocheckin} from "../../service/autocheckin";

export default () => {
  const router = Router();
  router
  .get('/', async (req, res) =>  {
    try {

      const body = matchedData(req);
      const user = await readAutocheckin(body);
      res.json({ data: user });
    } catch (e) {
      errorHandler(res, e);
    }
  });
  return router;
}
