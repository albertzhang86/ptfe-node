import { Router } from 'express';
import errorHandler from '../../util/errorHandler';
import { read, write } from "../../service/db";
import {generateBoardingPass, sendForwardBP} from "../../service/boardingPass";

export default () => {
  const router = Router();
  router
  .get('/', async (req, res) =>  {
    try {
      const items = await read();
      
      Promise.all(
        
          items.map(async item => {
            console.log('generate BP', item);
            await generateBoardingPass(item);
            console.log('forward bp');
            await sendForwardBP(item);
            item.checkedIn = true;
            console.log('update item ', item);
            await write(item);
            console.log('finish update '); 
          })
      ); 
            
      res.json({ items });
    } catch (e) {
      console.log('error', e);
      errorHandler(res, e);
    }
  });
  return router;
}
