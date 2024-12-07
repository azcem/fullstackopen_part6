import { useSelector, useDispatch } from "react-redux";
import { voteOnAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter === "") {
      return state.anecdotes;
    }
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.includes(state.filter),
    );
  });

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(voteOnAnecdote(anecdote));
    dispatch(
      setNotification(
        anecdotes.filter((anecodote) => anecodote.id === anecdote.id)[0]
          .content,
        5,
      ),
    );
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
