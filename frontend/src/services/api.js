import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", 
});

export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

export async function register(form) {
  const res = await api.post("/api/auth/register", form);
  const { token } = res.data;
  localStorage.setItem("token", token);
  setAuthToken(token);
  return res.data;
}

export async function login(form) {
  const res = await api.post("/api/auth/login", form);
  const { token } = res.data;
  localStorage.setItem("token", token);
  setAuthToken(token);
  return res.data;
}

export async function getTeachers() {
  const res = await api.get("/api/teachers");
  return res.data.teachers;
}

export default api;
