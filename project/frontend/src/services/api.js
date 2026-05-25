const BASE_URL = "http://127.0.0.1:8000";


// =========================
// REGISTER USER
// =========================
export const registerUser = async (userData) => {
  try {
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
      throw new Error(
        data?.detail?.message || data?.message || "Register failed"
      );
    }

    return data;
  } catch (error) {
    throw error;
  }
};


// =========================
// LOGIN USER (FIXED)
// =========================
export const loginUser = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data?.detail?.message || data?.message || "Login failed"
      );
    }

    // SAVE TOKEN
    localStorage.setItem("token", data.data.access_token);

    return data;
  } catch (error) {
    throw error;
  }
};


// =========================
// GET FAVORITES
// =========================
export const getFavorites = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/favorites`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};


// =========================
// ADD FAVORITE
// =========================
export const addFavorite = async (movie) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(movie),
  });

  return await response.json();
};


// =========================
// DELETE FAVORITE
// =========================
export const deleteFavorite = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/favorites/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};