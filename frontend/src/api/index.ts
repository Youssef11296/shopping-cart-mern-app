import axios from "axios";

const baseUrl = "http://localhost:4000/api";
const baseUrlv1 = "http://localhost:4000/api/v1";

export const AUTH_API = {
  registerUser: ({ username, email, password }: User) =>
    axios.post(`${baseUrlv1}/auth/register`, { username, email, password }),

  loginUser: ({ email, password }: User) =>
    axios.post(`${baseUrlv1}/auth/register`, { email, password }),
};
