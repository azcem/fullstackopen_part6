import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getAnecdotes, updateAnecdote } from "./requests";
import { useContext } from "react";
import NotificationContext from "./NotificationContext";

const App = ({ client }) => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      const anecdotes = client.getQueryData(["anecdotes"]);
      client.setQueryData(
        ["anecdotes"],
        anecdotes.map((anecdote) =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote,
        ),
      );
    },
  });
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    notificationDispatch({
      type: "SET",
      payload: `you voted for ${anecdote.content}`,
    });
    console.log(notification);
    setTimeout(() => notificationDispatch({ type: "CLEAR" }), 5000);
  };

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
  });

  if (result.isLoading) {
    return <div>Loading data... </div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server </div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification message={notification} />
      <AnecdoteForm queryClient={client} />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
