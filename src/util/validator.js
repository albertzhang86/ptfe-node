import { checkSchema } from 'express-validator/check';
import { omit } from 'lodash';

export default (schema, newEntity, customisedFileds = {}) =>
  checkSchema(newEntity ? omit({ ...schema, ...customisedFileds }, 'id') : { ...schema, ...customisedFileds }); 
