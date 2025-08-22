import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from "react";
import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import {
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Box,
  Link,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const client = generateClient<Schema>();

function Index() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    const content = window.prompt("Todo content");
    if (content) {
      client.models.Todo.create({ content });
    }
  }

  return (
    <>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        My Todos
      </Typography>
      
      <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={createTodo}
          size="large"
        >
          Add New Todo
        </Button>
      </Box>

      <Paper elevation={3} sx={{ mb: 4 }}>
        <List>
          {todos.length === 0 ? (
            <ListItem>
              <ListItemText primary="No todos yet. Create your first one!" />
            </ListItem>
          ) : (
            todos.map((todo) => (
              <ListItem key={todo.id} divider>
                <ListItemText primary={todo.content} />
              </ListItem>
            ))
          )}
        </List>
      </Paper>

      <Box sx={{ textAlign: "center" }}>
        <Typography variant="body1" paragraph>
          🥳 App successfully hosted with MUI and TanStack Router! Try creating a new todo.
        </Typography>
        <Link
          href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates"
          target="_blank"
          rel="noopener"
        >
          Review next step of this tutorial.
        </Link>
      </Box>
    </>
  );
}

export const Route = createFileRoute('/')({
  component: Index,
})
