import { Router } from 'express';
import { searchBooking } from '../../service/subscribe';
import { write } from '../../service/db';
import errorHandler from '../../util/errorHandler';

export default () => {
  const router = Router();
  router
  .post('/', async (req, res) =>  {
    try {
      const { pnr, surname, departurePort, mobile } = req.body;
      const response = await searchBooking(pnr, surname, departurePort);
      const item = {
        request: {
          customers: response.data.customers,
          carryingDangerousGoods: false,
          booking: {
            pnr, surname, departurePort
          }
        },
        checkedIn: false,
        pnr,
        mobile
      }
     const info = await write(item);
     res.json({ data: info });
    } catch (e) {
      errorHandler(res, e);
    }
  });
  return router;
}
