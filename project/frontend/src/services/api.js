const BASE_URL = "http://127.0.0.1:8000";


// =========================
// REGISTER USER
// =========================
export const registerUser = async (userData) => {

  const response = await fetch(
    `${BASE_URL}/register`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {

    throw new Error(
      data?.detail?.message ||
      data?.detail ||
      "Register failed"
    );
  }

  return data;
};


// =========================
// LOGIN USER
// =========================
export const loginUser = async (
  email,
  password
) => {

  const response = await fetch(
    "http://127.0.0.1:8000/login",
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },

      body: new URLSearchParams({
        username: email,
        password: password,
      }),
    }
  );

  const data = await response.json();

  console.log("LOGIN RESPONSE:", data);

  if (!response.ok) {

    throw new Error(
      data?.detail ||
      "Login failed"
    );
  }

  // ✅ SAVE TOKEN
  localStorage.setItem(
    "token",
    data.access_token
  );

  return data;
};

// =========================
// GET FAVORITES
// =========================
export const getFavorites = async () => {

  const token =
    localStorage.getItem("token");

  const response = await fetch(
    `${BASE_URL}/favorites`,
    {
      method: "GET",

      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  return data;
};


// =========================
// ADD FAVORITE
// =========================
export const addFavorite = async (
  movie
) => {

  const token =
    localStorage.getItem("token");

  const response = await fetch(
    `${BASE_URL}/favorites`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",

        Authorization:
          `Bearer ${token}`,
      },

      body: JSON.stringify(movie),
    }
  );

  const data = await response.json();

  return data;
};


// =========================
// DELETE FAVORITE
// =========================
export const deleteFavorite = async (
  movie_id
) => {

  const token =
    localStorage.getItem("token");

  const response = await fetch(
    `${BASE_URL}/favorites/${movie_id}`,
    {
      method: "DELETE",

      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  return data;
};