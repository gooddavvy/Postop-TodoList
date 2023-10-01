import type { TodoState, TodoItem } from "@/types";

export default function useTodoFunctions() {
    let todoState: TodoState = {
        isModalOpen: false,
        action: "add",
    };

    let addTodo = (data: TodoItem[], currentItemOption?: TodoItem) => {
        console.log(data, data as TodoItem[], currentItemOption);
        // Handle what happens when addItem modal has been opened
        let currentItem: TodoItem = {
            id: data.length || 0,
            name: "",
            description: "",
            completed: false,
        };
        if (currentItemOption && !(currentItemOption === currentItem)) {
            currentItem = currentItemOption
            data.push(currentItem);
            console.log(data);
        }
        todoState = { ...todoState, isModalOpen: true, currentItem, note: "addItemButtonClicked" };
    }

    return {
        addTodo
    };
}