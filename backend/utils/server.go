package utils

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gooddavvy/Postop-TodoList/backend/models"
)

var (
	App     = fiber.New()
	AppData = map[string]any{
		"port":    "2033",
		"myTodos": []models.TodoItem{},
	}
	StartServer = func() {
		port, ok := AppData["port"].(string)
		if !ok {
			log.Println("Port is not a string")
			return
		}

		log.Fatal(App.Listen(":" + port))
	}
)
