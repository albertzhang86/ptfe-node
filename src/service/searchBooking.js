import axios from 'axios';
import { pick, omit } from 'lodash';
import config from '../config';

const userAPI = config.api.eligibility;

export const searchBooking = async (pnr, lastName, departurePort) => {
  const response = await axios.post
}

export const getUser = async (id, includePost) => {
  const response = await axios.get(`${userAPI}/${id}`);
  let user = convertUser(response.data);
  if (includePost) {
    const postResponse = await axios.get(`${postAPI}?userId=${id}`);
    user = { ...user, posts: postResponse.data }
  }
  return user;
}
