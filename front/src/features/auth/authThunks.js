// src/features/auth/authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  BORROW_BOOK,
  CREATE_BOOK,
  DELETE_BOOK,
  FETCH_BOOKS,
  FETCH_BORROWED_BOOKS,
  FETCH_ME,
  FETCH_USERS,
  LOGIN_API,
  RETURN_BOOK,
  UPDATE_BOOK,
} from "../../api/api";

export const fetchMe = createAsyncThunk("auth/fetchMe", async () => {
  const res = await fetch(FETCH_ME, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  if (!data.success) throw new Error("Unauthorized");
  return data.user;
});

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password, role }) => {
    const res = await fetch(LOGIN_API, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      // important if using cookies
      withCredentials: true,
      body: JSON.stringify({ email, password, role: role }),
    });

    const data = await res.json();
    if (!data.success) throw new Error(data.message || "Login failed");
    return data.user;
  }
);

export const fetchUsers = createAsyncThunk("auth/fetchUsers", async () => {
  const res = await fetch(FETCH_USERS, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  if (!data.success) throw new Error("Unauthorized");
  return data.users;
});

export const fetchBooks = createAsyncThunk("auth/fetchBooks", async () => {
  const res = await fetch(FETCH_BOOKS, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  if (!data.success) throw new Error("Unauthorized");
  return data.allBorrowBook;
});

export const createBook = createAsyncThunk(
  "auth/createBook",
  async (formData, thunkAPI) => {
    console.log("formData", formData);
    try {
      const res = await fetch(CREATE_BOOK, {
        method: "POST",
        body: formData, // FormData directly
        credentials: "include",
      });

      const data = await res.json();
      console.log("formData data", data);

      if (!data.success) {
        throw new Error(data.message || "Something went wrong");
      }

      return data.book;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const borrowBook = createAsyncThunk(
  "auth/borrowBook",
  async (formData, thunkAPI) => {
    console.log("formData", formData);
    try {
      const res = await fetch(BORROW_BOOK, {
        method: "POST",
        body: formData, // FormData directly
        credentials: "include",
      });

      const data = await res.json();
      console.log("formData data", data);

      if (!data.success) {
        throw new Error(data.message || "Something went wrong");
      }

      return data.book;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const returnBook = createAsyncThunk(
  "auth/returnBook",
  async (bookId, thunkAPI) => {
    try {
      const res = await fetch(`${RETURN_BOOK}/${bookId}`, {
        method: "PUT",
        credentials: "include",
      });

      const data = await res.json();
      console.log("returnBook response data:", data);

      if (!data.success) {
        throw new Error(data.message || "Something went wrong");
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateBook = createAsyncThunk(
  "auth/updateBook",
  async ({ id, formData }, thunkAPI) => {
    console.log("formData", formData);
    try {
      const res = await fetch(`${UPDATE_BOOK}/${id}`, {
        method: "PUT",
        body: formData, // FormData directly
        credentials: "include",
      });

      const data = await res.json();
      console.log("formData data", data);

      if (!data.success) {
        throw new Error(data.message || "Something went wrong");
      }

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "auth/deleteBook",
  async (id, thunkAPI) => {
    try {
      const res = await fetch(`${DELETE_BOOK}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      console.log("formData data", data);

      if (!data.success) {
        throw new Error(data.message || "Something went wrong");
      }

      return data.book;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchBorrowedBooks = createAsyncThunk(
  "auth/fetchBorrowedBooks",
  async () => {
    const res = await fetch(FETCH_BORROWED_BOOKS, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    if (!data.success) throw new Error("Unauthorized");
    return data.allBorrowBook;
  }
);
