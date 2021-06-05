import axios from 'axios';

const api = axios.create({
  baseURL: 'http://ec2-3-80-207-31.compute-1.amazonaws.com:3333',
});

const getIp = axios.create({
  baseURL: 'https://api.ipify.org?format=json',
});

export { api, getIp };
