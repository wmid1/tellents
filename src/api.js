import axios from 'axios';

const BASE_API_URL = 'https://floating-atoll-63112.herokuapp.com';
const AUTH_API_URL = `${BASE_API_URL}/api/auth`;

export function fetchSignIn(email, password) {
  return axios.post(`${AUTH_API_URL}/sign_in`, {
    email,
    password,
  });
}

export function fetchRegister(firstName, lastName, email, password) {
  return axios.post(AUTH_API_URL, {
    first_name: firstName,
    last_name: lastName,
    email,
    password,
    config_name: 'default',
    confirm_success_url: BASE_API_URL,
  });
}

export function validation(userData) {
  return axios.get(`${AUTH_API_URL}/validate_token`, { headers: userData });
}

export function logOut(userData) {
  return axios.delete(`${AUTH_API_URL}/sign_out`, { headers: userData });
}
