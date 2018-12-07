import { Router } from 'express';
import { searchBooking } from '../../service/subscribe';
import errorHandler from '../../util/errorHandler';

export default () => {
  const router = Router();
  router
  .post('/', async (req, res) =>  {
    try {
      const { pnr, surname, departurePort, mobile } = req.body;
      const booking = await searchBooking(pnr, surname, departurePort);
      console.log('booking', booking)
      
      res.json({ });
    } catch (e) {
      errorHandler(res, e);
    }
  });
  return router;
}
