// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  borrowBook,
  createBook,
  deleteBook,
  fetchBooks,
  fetchBorrowedBooks,
  fetchMe,
  fetchUsers,
  loginThunk,
  updateBook,
} from "./authThunks";

const initialState = {
  user: null,
  loading: false,
  error: null,
  users: {
    users: [],
    loading: false,
    error: null,
  },
  CreatedBooks: {
    Books: [],
    loading: false,
    error: null,
  },
  CreateBook: {
    message: [],
    loading: false,
    error: null,
  },
  BorrowBook: {
    loading: false,
    error: null,
  },
  UpdateBook: {
    loading: false,
    error: null,
  },
  DeleteBook: {
    loading: false,
    error: null,
  },
  BorrowedBooks: {
    Books: [],
    loading: false,
    error: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message;
      })

      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        // state.error = action.error.message;
      })

      .addCase(fetchUsers.pending, (state) => {
        state.users.loading = true;
        state.users.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users.loading = false;
        state.users.users = action.payload; // ✅ Only update the users array
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.users.loading = false;
        state.users.error = action.error.message || "Failed to fetch users";
      })

      .addCase(fetchBooks.pending, (state) => {
        state.CreatedBooks.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.CreatedBooks.loading = false;
        state.CreatedBooks.Books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.CreatedBooks.loading = false;
      })

      .addCase(createBook.pending, (state) => {
        state.CreateBook.loading = true;
        state.CreateBook.error = null;
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.CreateBook.loading = false;
        state.CreateBook.error = null;
        state.CreateBook.message = action.payload;
      })
      .addCase(createBook.rejected, (state, action) => {
        state.CreateBook.loading = false;
        state.CreateBook.error = action.payload || "Something went wrong";
      })

      .addCase(borrowBook.pending, (state) => {
        state.BorrowBook.loading = true;
        state.BorrowBook.error = null;
      })
      .addCase(borrowBook.fulfilled, (state, action) => {
        state.BorrowBook.loading = false;
        state.BorrowBook.error = null;
      })
      .addCase(borrowBook.rejected, (state, action) => {
        state.BorrowBook.loading = false;
      })

      .addCase(updateBook.pending, (state) => {
        state.UpdateBook.loading = true;
        state.UpdateBook.error = null;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.UpdateBook.loading = false;
        state.UpdateBook.error = null;
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.UpdateBook.loading = false;
      })

      .addCase(deleteBook.pending, (state) => {
        state.DeleteBook.loading = true;
        state.DeleteBook.error = null;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.DeleteBook.loading = false;
        state.DeleteBook.error = null;
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.DeleteBook.loading = false;
      })

      .addCase(fetchBorrowedBooks.pending, (state) => {
        state.BorrowedBooks.loading = true;
      })
      .addCase(fetchBorrowedBooks.fulfilled, (state, action) => {
        state.BorrowedBooks.loading = false;
        state.BorrowedBooks.Books = action.payload;
      })
      .addCase(fetchBorrowedBooks.rejected, (state, action) => {
        state.BorrowedBooks.loading = false;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
