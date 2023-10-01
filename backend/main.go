package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gooddavvy/Postop-TodoList/backend/handlers"
	"github.com/gooddavvy/Postop-TodoList/backend/utils"
)

func main() {
	app := utils.App

	app.Get("/api/*", func(c *fiber.Ctx) error {
		apiParam := c.Params("*")
		if apiParam == "allTodos" {
			return handlers.AllTodosHandler(c)
		}

		return c.SendString("E404 Not Found: API parameter not found")
	})

	utils.StartServer()
}
