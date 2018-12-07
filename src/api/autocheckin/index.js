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
      const generateBoardingPassRequest = await readAutocheckin(body);
      
      const resultGenBP = await generateBoardingPass(generateBoardingPassRequest);
      console.log('result', resultGenBP);
      
      const resultFBP = await sendForwardBP();
      
      
      res.json({ data: generateBoardingPassRequest });
    } catch (e) {
      errorHandler(res, e);
    }
  });
  return router;
}
