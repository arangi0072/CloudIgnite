package routes

import (
	"cloudignite-learn/internal/handlers"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(router *gin.Engine) {

	// =========================================
	// HEALTH
	// =========================================

	router.GET("/health", func(c *gin.Context) {

		c.JSON(200, gin.H{
			"success": true,
			"message": "CloudIgnite Learn API Running",
		})
	})

	// =========================================
	// API GROUP
	// =========================================

	api := router.Group("/api")
	{

		// =========================================
		// ROOT TOPICS
		// =========================================

		api.GET(
			"/root-topics",
			handlers.GetRootTopics,
		)

		// =========================================
		// TOPIC TREE
		// =========================================

		api.GET(
			"/topic-tree/*path",
			handlers.GetTopicTree,
		)

		// =========================================
		// TOPIC CHILDREN
		// =========================================

		api.GET(
			"/topic-children/*path",
			handlers.GetTopicChildren,
		)

		// =========================================
		// TOPIC BY PATH
		// KEEP LAST
		// =========================================

		api.GET(
			"/topics/*path",
			handlers.GetTopicByPath,
		)
	}
}
