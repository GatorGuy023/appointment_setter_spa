import axios, { AxiosResponse } from "axios";
import {IUser} from "../Model/User";

axios.defaults.baseURL = 'http://localhost:8000';

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) =>
    axios
      .get(url)
      .then(responseBody),
  post: (url: string, body: {}) =>
    axios
      .post(url, body)
      .then(responseBody),
  put: (url: string, body: {}) =>
    axios
      .put(url, body)
      .then(responseBody),
  del: (url: string) =>
    axios
      .delete(url)
      .then(responseBody)
};

const User = {
  login: (body: {}) => axios.post('/login', body),
  getUser: (url: string): Promise<IUser> => requests.get(url)
};

export default {
  User
};