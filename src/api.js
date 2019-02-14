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

export function validation() {
  return axios.get(`${AUTH_API_URL}/validate_token`, {
    headers: {
      'access-token': localStorage.getItem('access-token'),
      'token-type': localStorage.getItem('token-type'),
      uid: localStorage.getItem('uid'),
      client: localStorage.getItem('client'),
    },
  });
}
export function takeUser() {
  return axios.get(`${BASE_API_URL}/api//v1/profile/skills/user`, {
    headers: {
      'access-token': localStorage.getItem('access-token'),
      'token-type': localStorage.getItem('token-type'),
      uid: localStorage.getItem('uid'),
      client: localStorage.getItem('client'),
    },
  });
}
export function setUserSkills(skills) {
  return axios.post(
    `${BASE_API_URL}/api/v1/profile/skills`,
    {
      categories: skills,
    },
    {
      headers: {
        'access-token': localStorage.getItem('access-token'),
        'token-type': localStorage.getItem('token-type'),
        uid: localStorage.getItem('uid'),
        client: localStorage.getItem('client'),
        expiry: localStorage.getItem('expiry'),
      },
    },
  );
}

export function searchTags(query) {
  return axios.get(`${BASE_API_URL}/api//v1/profile/skills/search?q=${query}`, {
    headers: {
      'access-token': localStorage.getItem('access-token'),
      'token-type': localStorage.getItem('token-type'),
      uid: localStorage.getItem('uid'),
      client: localStorage.getItem('client'),
    },
  });
}

export function logOut() {
  return axios.delete(`${AUTH_API_URL}/sign_out`, {
    headers: {
      'access-token': localStorage.getItem('access-token'),
      'token-type': localStorage.getItem('token-type'),
      uid: localStorage.getItem('uid'),
      client: localStorage.getItem('client'),
    },
  });
}
