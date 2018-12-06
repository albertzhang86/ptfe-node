import { Router } from 'express';
import { validationResult } from 'express-validator/check';
import { matchedData } from 'express-validator/filter';
import { getUser, getUserList, createUser } from '../../service/users';
import validator from './validator';
import errorHandler from '../../util/errorHandler';

export default () => {
  const router = Router();
  router
  .post('/', async (req, res) =>  {
    try {

      const { pnr, lastName, departurePort, mobile } = req.body;
      
      // Get the validation result whenever you want; see the Validation Result API for all options!
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw { response: { status: 422, statusText: errors.mapped() } };
      }
      const body = matchedData(req);
      const user = await createUser(body);
      res.json({ data: user });
    } catch (e) {
      errorHandler(res, e);
    }
  });
  return router;
}
