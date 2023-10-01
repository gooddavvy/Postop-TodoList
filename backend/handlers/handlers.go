package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gooddavvy/Postop-TodoList/backend/utils"
)

func AllTodosHandler(ctx *fiber.Ctx) error {
	todos, err := utils.GetTodos("todos.json")
}
