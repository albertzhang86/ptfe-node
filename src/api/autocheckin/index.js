import { Router } from 'express';
import { validationResult } from 'express-validator/check';
import { matchedData } from 'express-validator/filter';
import { getUser, getUserList, createUser } from '../../service/users';
import errorHandler from '../../util/errorHandler';
import {readAutocheckin} from "../../service/autocheckin";

export default () => {
  const router = Router();
  router
  .get('/', async (req, res) =>  {xx
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
