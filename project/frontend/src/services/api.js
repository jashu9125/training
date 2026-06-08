import config from "../config";

const BASE_URL = config.BASE_URL;


// =========================
// SAFE TOKEN HELPER
// =========================
const getToken = () => {
  const token = localStorage.getItem("token");
  return token || "";
};


// =========================
// REGISTER USER
// =========================
export const registerUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: userData.name,
      email: userData.email,
      password: userData.password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.detail || "Register failed");
  }

  return data;
};


// =========================
// LOGIN USER
// =========================
export const loginUser = async (email, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      username: email,
      password: password,
    }),
  });

  const data = await response.json();

  console.log("LOGIN RESPONSE:", data);

  if (!response.ok) {
    throw new Error(data?.detail || "Login failed");
  }

  // SAVE TOKEN
  localStorage.setItem("token", data.access_token);

  return data;
};


// =========================
// GET FAVORITES
// =========================
export const getFavorites = async () => {
  const token = getToken();

  const response = await fetch(`${BASE_URL}/favorites`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  return await response.json();
};


// =========================
// ADD FAVORITE
// =========================
export const addFavorite = async (movie) => {
  const token = getToken();

  const response = await fetch(`${BASE_URL}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(movie),
  });

  return await response.json();
};


// =========================
// DELETE FAVORITE
// =========================
export const deleteFavorite = async (movie_id) => {
  const token = getToken();

  const response = await fetch(`${BASE_URL}/favorites/${movie_id}`, {
    method: "DELETE",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  return await response.json();
};

export const getRecommendations =
async () => {

  const token =
    localStorage.getItem("token");

  const response =
    await fetch(
      `${BASE_URL}/recommendations`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  return await response.json();
};