import { createSlice, current } from "@reduxjs/toolkit";
import { removeNotification, setNotification } from "./notificationReducer";
import { useDispatch } from "react-redux";
import anecdoteService from "../services/anecdotes";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    updateAnecdotes(state, action) {
      return state
        .map((anecdote) =>
          anecdote.id === action.payload.id ? action.payload : anecdote,
        )
        .sort((a, b) => a.votes < b.votes);
    },
    appendAnecdote(state, action) {
      return state.concat(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const voteOnAnecdote = (anecdote) => {
  const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
  return async (dispatch) => {
    const votedAnecdote = await anecdoteService.voteOnAnecdote(newAnecdote);
    dispatch(updateAnecdotes(votedAnecdote));
  };
};

export const { updateAnecdotes, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;
