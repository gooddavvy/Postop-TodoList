import React, { useState } from "react";
import type { TodoItem } from "@/types";
import useTodoFunctions from "@/hooks/useTodoFunctions";
import { ContainedButtonStyles } from "@/ui-styles/button-styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

type ModalAction = "Add" | "Delete" | "Edit";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  action: ModalAction;
  data: TodoItem[] | unknown;
}

let { addTodo } = useTodoFunctions();

const AddComponent = ({ open, onClose, data }: ModalProps) => {
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");

  let currentItem = {
    id: (data as TodoItem[])?.length || 0,
    name: "",
    description: "",
    completed: false,
  };
  currentItem.name = name;
  currentItem.description = description;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Todo</DialogTitle>
      <DialogContent>
        <Typography>
          Let's add a todo item! Please fill in the following form.
        </Typography>
        <br />
        <FormControl>
          <Input
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <br />
          <br />
          <Input
            value={description}
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setName("");
            setDescription("");
            addTodo(data as TodoItem[], currentItem);
            onClose();
          }}
          sx={ContainedButtonStyles}
        >
          Add Item
        </Button>
        <Button
          onClick={() => {
            setName("");
            setDescription("");
            onClose();
          }}
          color="primary"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default function Modal({ open, onClose, action, data }: ModalProps) {
  if (action === "Add")
    return (
      <AddComponent
        open={open}
        onClose={onClose}
        data={data}
        action={
          "Add"
        } /* we put it here just in case, it wouldn't have been necessary */
      />
    );
}
