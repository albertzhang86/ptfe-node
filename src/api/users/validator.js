import { user } from '../../schema';
import validator from '../../util/validator';

export default isNew => validator(user, isNew);
