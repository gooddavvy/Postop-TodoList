package utils

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"log"
	"os"

	// "reflect"

	"github.com/gooddavvy/Postop-TodoList/backend/models"
)

var (
	// `LogTodo()` is a function that returns an integer for a status, and an error
	//
	// It is best to handle errors in this one, because a todo can be nil
	//
	// That is why it uses a pointer as a type to its parameter, the `*` token
	LogTodo = func(todo *models.TodoItem) (int, error) {
		// Check for a nil todo
		if todo == nil {
			msg := "Received a nil todo."
			log.Println(msg)
			return 0, errors.New(msg)
		}

		log.Printf("Here is your Todo: %+v\n", *todo)
		return 1, nil // Return success (1) and no error.
	}

	// This is where the `RemoveElementAt` used to stand. I will leave it in this comment just to remember it.

	Use = func(value any) (any, func(newValue any)) {
		signal := value
		sfunc := func(newValue any) {
			signal = newValue
		}

		return signal, sfunc
	}
)

// Helper functions

func AreSlicesEqual(slice1, slice2 []models.TodoItem) bool {
	if len(slice1) != len(slice2) {
		return false
	}

	for i, v := range slice1 {
		if v != slice2[i] {
			return false
		}
	}

	return true
}

// ReadFile reads the file! It is made up in three stages, you can read its code.
func ReadFile(filename string) (int, []models.TodoItem, error) {

	// Stage 1 (Get read access)
	file, err := os.Open(filename) // For read access.
	if err != nil {
		return 0, nil, HandleError(err)
	}
	defer file.Close() // Ensure the file is closed when we're done.

	// Stage 2 (Read the file)
	data, err := ioutil.ReadAll(file)
	if err != nil {
		return 0, nil, HandleError(err)
	}

	// Stage 3 (Parse the JSON data)
	var todos []models.TodoItem
	err = json.Unmarshal(data, &todos)
	if err != nil {
		return 0, nil, HandleError(err)
	}

	return len(todos), todos, nil
}

// Be careful, this helper function is only for testing!
func UseGetTestTodos(filename string) []models.TodoItem {
	_, data, err := ReadFile(filename)
	HandleError(err) // HandleError will check if the error is nil by itself, no need to add it to the if statement
	return data
}

func GetTodos(filename string) ([]models.TodoItem, error) {
	_, data, err := ReadFile(filename)
	err = HandleError(err) // HandleError will check if the error is nil by itself, no need to add it to the if statement
	if err != nil {
		return nil, err
	}
	return data, nil
}

// Main todo-logic functions

func EditTodo(todos []models.TodoItem, x int, newTodo models.TodoItem) ([]models.TodoItem, error) {
	log.Println("editTodo is being executed.") // for testing purposes
	// Adjust x for 1-based indexing
	index := x - 1

	// Check if the index is valid
	if index < 0 || index >= len(todos) {
		return nil, errors.New("index out of bounds")
	}

	// Replace the todo at the specified index
	todos[index] = newTodo

	return todos, nil
}

func RemoveElementFromItemsAt(items []models.TodoItem, x int) []models.TodoItem {
	// Check if the index is within bounds
	if x >= 1 && x <= len(items) {
		// Use slicing to remove the element at index x
		return append(items[:x-1], items[x:]...)
	}
	// Return the original items if the index is out of bounds
	return items
}

func DeleteFromJson(jsonPath string, i int) (string, error) {
	var err error

	var data []models.TodoItem
	var dataMarshalled []byte
	dataMarshalled, err = ioutil.ReadFile(jsonPath)
	if err != nil {
		return "", err
	}

	err = json.Unmarshal(dataMarshalled, &data)
	if err != nil {
		return "", err
	}

	for k := range data {
		log.Println(k)
		if k == i {
			data = RemoveElementFromItemsAt(data, i+1)
			log.Println(data)
			break // Exit the loop after removing the element
		}
	}

	dataMarshalled, err = json.Marshal(data)
	if err != nil {
		return "", err
	}

	err = ioutil.WriteFile(jsonPath, dataMarshalled, 0644)
	if err != nil {
		return "", err
	}

	return "Success!", nil
}

// HandleError simply handles the error!
//
// It's a bit like try-catch, only difference is that HandleError is a `catch` handler
var HandleError = func(err error) error {
	if err != nil {
		log.Print("IntErr: " + err.Error())
		return err
	}
	return nil
}
