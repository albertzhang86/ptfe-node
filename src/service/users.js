import axios from 'axios';
import { pick, omit } from 'lodash';
import config from '../config';

const userAPI = config.api.user;
const postAPI = config.api.post;

export const getUser = async (id, includePost) => {
  const response = await axios.get(`${userAPI}/${id}`);
  let user = convertUser(response.data);
  if (includePost) {
    const postResponse = await axios.get(`${postAPI}?userId=${id}`);
    user = { ...user, posts: postResponse.data }
  }
  return user;
}

export const getUserList = async () => {
  const response = await axios.get(userAPI);
  return response.data.map(convertUser);
}

export const createUser = async (user) => {
  const response = await axios.post(userAPI, user);
  return convertUser(response.data);
}

const convertUser = user => ({
  ...pick(user, ['id', 'username', 'email']),
  address: Object.values(omit(user.address, 'geo')).join(' ')
});
