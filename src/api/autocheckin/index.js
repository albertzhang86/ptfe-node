import { Router } from 'express';
import { validationResult } from 'express-validator/check';
import { matchedData } from 'express-validator/filter';
import { getUser, getUserList, createUser } from '../../service/users';
import errorHandler from '../../util/errorHandler';

export default () => {
  const router = Router();
  router
  .get('/', async (req, res) =>  {
    try {

      const body = matchedData(req);
      const user = await createUser(body);
      res.json({ data: user });
    } catch (e) {
      errorHandler(res, e);
    }
  });
  return router;
}
