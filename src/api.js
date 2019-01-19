import axios from 'axios';

const AUTH_API_URL = 'https://floating-atoll-63112.herokuapp.com';

export function fetchSignIn(email, password) {
  return axios.post(`${AUTH_API_URL}/api/auth/sign_in`, {
    email,
    password,
  });
}

export function fetchRegister(firstName, lastName, email, password) {
  return axios.post(`${AUTH_API_URL}/api/auth`, {
    first_name: firstName,
    last_name: lastName,
    email,
    password,
    config_name: 'default',
    confirm_success_url: AUTH_API_URL,
  });
}

export function validation(userDate) {
  return axios.get(`${AUTH_API_URL}/api/auth/validate_token`, { headers: userDate });
}

export function logOut(userDate) {
  return axios.delete(`${AUTH_API_URL}/api/auth/sign_out`, { headers: userDate });
}
