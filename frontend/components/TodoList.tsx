import React, { useState } from "react";
import type { TodoItem } from "@/types";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ContainedButtonStyles } from "@/ui-styles/button-styles";

interface TodoItemProps {
  id: number;
  name: string;
  description: string;
  completed: boolean;
  reveal: boolean;
}

interface TodoListProps {
  data: TodoItem[] | unknown;
  listIsEmpty: boolean;
}

function TodoItem({ id, name, description, completed, reveal }: TodoItemProps) {
  let [completedState, setCompletedState] = useState(completed);

  return reveal ? (
    <Box component="li">
      <Checkbox
        checked={completedState}
        title={
          completedState
            ? "You completed this todo item."
            : "You have not completed this todo item."
        }
        onClick={() => setCompletedState(!completedState)}
        sx={{ textAlign: "left" }}
      />
      <Container sx={{ textAlign: "center" }}>
        <Typography fontSize={30} fontWeight="bold">
          {name}
        </Typography>
        <Typography fontSize={20}>{description}</Typography>
      </Container>
      <Container sx={{ textAlign: "right" }}>
        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Container>
    </Box>
  ) : null;
}

export default function TodoList({ data, listIsEmpty }: TodoListProps) {
  return listIsEmpty ? (
    <Box>
      <Typography>Your todo list is empty :)</Typography>
      <Button variant="contained" sx={ContainedButtonStyles}>
        Add your first item
      </Button>
    </Box>
  ) : (
    <Container>
      <Button variant="contained" sx={ContainedButtonStyles}>
        Add item
      </Button>
      <Box component="ul">
        {(data as TodoItem[]).map(({ id, name, description, completed }) => (
          <TodoItem
            key={id}
            id={id}
            name={name}
            description={description}
            completed={completed}
            reveal={true}
          />
        ))}
      </Box>
    </Container>
  );
}
