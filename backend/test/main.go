package main

import (
	"errors"
	"fmt"
	"log"

	"github.com/gooddavvy/Postop-TodoList/backend/models"
	"github.com/gooddavvy/Postop-TodoList/backend/utils"
)

var SampleJsonPath = "C:\\Users\\goodd\\coding-apps\\coding-challenges\\Postop-TodoList\\Postop-TodoList\\backend\\test\\sample.json"
var SampleTodos = utils.UseGetTestTodos(SampleJsonPath)

func test(name string, fun func()) {
	fmt.Print(name + " Test:\n\n")
	fun()
}

func dfjTest() {
	_, err := utils.DeleteFromJson(SampleJsonPath, 0)
	if err != nil {
		log.Fatal(err)
	}
}

func etTest() {
	fmt.Println("Testing") // for testing purposes
	x := 1
	newTodos, err := utils.EditTodo(SampleTodos, x, models.TodoItem{
		Name:        "et test todo",
		Description: "et test todo",
		ID:          0,
		Completed:   true,
	})

	if err != nil {
		utils.HandleError(err)
		return
	}

	// Get the existing todos from the JSON file
	existingTodos := utils.UseGetTestTodos(SampleJsonPath)

	// Compare the contents of the slices
	if !utils.AreSlicesEqual(existingTodos, newTodos) {
		err := errors.New("Slices are not equal")
		utils.HandleError(err)
	}
}

func main() {
	/* test("DFJ", dfjTest)
	fmt.Print("\n\n") */
	test("ET", etTest)
}
