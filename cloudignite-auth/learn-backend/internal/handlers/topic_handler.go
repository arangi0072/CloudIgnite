package handlers

import (
	"context"
	"log"
	"net/http"
	"strings"

	"cloudignite-learn/internal/db"
	"cloudignite-learn/internal/models"

	"github.com/gin-gonic/gin"
)

// =========================================
// HELPERS
// =========================================

func normalizePath(path string) string {

	path = strings.TrimPrefix(path, "/")
	path = strings.TrimSuffix(path, "/")

	return path
}

func fetchTopicByPath(path string) (*models.Topic, error) {

	query := `
	SELECT
		id,
		slug,
		title,
		COALESCE(short_description, ''),
		COALESCE(hero_description, ''),
		COALESCE(category, ''),
		COALESCE(icon_url, ''),
		COALESCE(cover_image, ''),
		COALESCE(difficulty_level, ''),
		COALESCE(estimated_read_time, 0),
		COALESCE(trending_score, 0),
		COALESCE(popularity_score, 0),
		COALESCE(is_featured, false),
		created_at,
		updated_at,
		parent_topic_id,
		COALESCE(topic_level, 1),
		COALESCE(topic_order, 0),
		COALESCE(path, ''),
		COALESCE(is_category, false)

	FROM topics

	WHERE path = $1

	LIMIT 1
	`

	var topic models.Topic

	err := db.DB.QueryRow(
		context.Background(),
		query,
		path,
	).Scan(
		&topic.ID,
		&topic.Slug,
		&topic.Title,
		&topic.ShortDescription,
		&topic.HeroDescription,
		&topic.Category,
		&topic.IconURL,
		&topic.CoverImage,
		&topic.DifficultyLevel,
		&topic.EstimatedReadTime,
		&topic.TrendingScore,
		&topic.PopularityScore,
		&topic.IsFeatured,
		&topic.CreatedAt,
		&topic.UpdatedAt,
		&topic.ParentTopicID,
		&topic.TopicLevel,
		&topic.TopicOrder,
		&topic.Path,
		&topic.IsCategory,
	)

	if err != nil {
		return nil, err
	}

	return &topic, nil
}

func buildTopicTree(
	topics []models.Topic,
	parentID *string,
) []models.TopicTreeNode {

	var tree []models.TopicTreeNode

	for _, topic := range topics {

		if (parentID == nil && topic.ParentTopicID == nil) ||
			(parentID != nil &&
				topic.ParentTopicID != nil &&
				*topic.ParentTopicID == *parentID) {

			node := models.TopicTreeNode{
				Topic: topic,
			}

			children := buildTopicTree(
				topics,
				&topic.ID,
			)

			if children == nil {
				children = []models.TopicTreeNode{}
			}

			node.Children = children

			tree = append(tree, node)
		}
	}

	return tree
}

// =========================================
// GET TOPIC BY PATH
// =========================================

func GetTopicByPath(c *gin.Context) {

	path := normalizePath(
		c.Param("path"),
	)

	log.Println("Fetching topic:", path)

	topic, err := fetchTopicByPath(path)

	if err != nil {

		log.Println("Topic fetch error:", err)

		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"error":   "Topic not found",
		})

		return
	}

	// =========================================
	// FETCH SECTIONS
	// =========================================

	sectionQuery := `
	SELECT
		id,
		section_order,
		COALESCE(section_type, ''),
		COALESCE(title, ''),
		COALESCE(content, '')

	FROM topic_sections

	WHERE topic_id = $1

	ORDER BY section_order ASC
	`

	sectionRows, err := db.DB.Query(
		context.Background(),
		sectionQuery,
		topic.ID,
	)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   err.Error(),
		})

		return
	}
	defer sectionRows.Close()

	var sections []models.TopicSection

	for sectionRows.Next() {

		var section models.TopicSection

		err := sectionRows.Scan(
			&section.ID,
			&section.SectionOrder,
			&section.SectionType,
			&section.Title,
			&section.Content,
		)

		if err != nil {
			continue
		}

		sections = append(sections, section)
	}

	// =========================================
	// FETCH CHILD TOPICS
	// =========================================

	childQuery := `
	SELECT
		id,
		slug,
		title,
		COALESCE(short_description, ''),
		COALESCE(hero_description, ''),
		COALESCE(category, ''),
		COALESCE(icon_url, ''),
		COALESCE(cover_image, ''),
		COALESCE(difficulty_level, ''),
		COALESCE(estimated_read_time, 0),
		COALESCE(trending_score, 0),
		COALESCE(popularity_score, 0),
		COALESCE(is_featured, false),
		created_at,
		updated_at,
		parent_topic_id,
		COALESCE(topic_level, 1),
		COALESCE(topic_order, 0),
		COALESCE(path, ''),
		COALESCE(is_category, false)

	FROM topics

	WHERE parent_topic_id = $1

	ORDER BY topic_order ASC
	`

	childRows, err := db.DB.Query(
		context.Background(),
		childQuery,
		topic.ID,
	)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   err.Error(),
		})

		return
	}
	defer childRows.Close()

	var childTopics []models.Topic

	for childRows.Next() {

		var child models.Topic

		err := childRows.Scan(
			&child.ID,
			&child.Slug,
			&child.Title,
			&child.ShortDescription,
			&child.HeroDescription,
			&child.Category,
			&child.IconURL,
			&child.CoverImage,
			&child.DifficultyLevel,
			&child.EstimatedReadTime,
			&child.TrendingScore,
			&child.PopularityScore,
			&child.IsFeatured,
			&child.CreatedAt,
			&child.UpdatedAt,
			&child.ParentTopicID,
			&child.TopicLevel,
			&child.TopicOrder,
			&child.Path,
			&child.IsCategory,
		)

		if err != nil {
			continue
		}

		childTopics = append(childTopics, child)
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data": gin.H{
			"topic":        topic,
			"sections":     sections,
			"child_topics": childTopics,
		},
	})
}

// =========================================
// GET TOPIC TREE
// =========================================

func GetTopicTree(c *gin.Context) {

	path := normalizePath(
		c.Param("path"),
	)

	rootTopic, err := fetchTopicByPath(path)

	if err != nil {

		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"error":   "Topic tree not found",
		})

		return
	}

	query := `
	SELECT
		id,
		slug,
		title,
		COALESCE(short_description, ''),
		COALESCE(hero_description, ''),
		COALESCE(category, ''),
		COALESCE(icon_url, ''),
		COALESCE(cover_image, ''),
		COALESCE(difficulty_level, ''),
		COALESCE(estimated_read_time, 0),
		COALESCE(trending_score, 0),
		COALESCE(popularity_score, 0),
		COALESCE(is_featured, false),
		created_at,
		updated_at,
		parent_topic_id,
		COALESCE(topic_level, 1),
		COALESCE(topic_order, 0),
		COALESCE(path, ''),
		COALESCE(is_category, false)

	FROM topics

	WHERE path LIKE $1

	ORDER BY
		topic_level ASC,
		topic_order ASC
	`

	rows, err := db.DB.Query(
		context.Background(),
		query,
		rootTopic.Path+"%",
	)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   err.Error(),
		})

		return
	}
	defer rows.Close()

	var topics []models.Topic

	for rows.Next() {

		var topic models.Topic

		err := rows.Scan(
			&topic.ID,
			&topic.Slug,
			&topic.Title,
			&topic.ShortDescription,
			&topic.HeroDescription,
			&topic.Category,
			&topic.IconURL,
			&topic.CoverImage,
			&topic.DifficultyLevel,
			&topic.EstimatedReadTime,
			&topic.TrendingScore,
			&topic.PopularityScore,
			&topic.IsFeatured,
			&topic.CreatedAt,
			&topic.UpdatedAt,
			&topic.ParentTopicID,
			&topic.TopicLevel,
			&topic.TopicOrder,
			&topic.Path,
			&topic.IsCategory,
		)

		if err != nil {
			continue
		}

		topics = append(topics, topic)
	}

	tree := models.TopicTreeNode{
		Topic: *rootTopic,
	}

	tree.Children = buildTopicTree(
		topics,
		&rootTopic.ID,
	)

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"tree":    tree,
	})
}

// =========================================
// GET CHILD TOPICS
// =========================================

func GetTopicChildren(c *gin.Context) {

	path := normalizePath(
		c.Param("path"),
	)

	topic, err := fetchTopicByPath(path)

	if err != nil {

		c.JSON(http.StatusNotFound, gin.H{
			"success": false,
			"error":   "Topic not found",
		})

		return
	}

	query := `
	SELECT
		id,
		slug,
		title,
		COALESCE(short_description, ''),
		COALESCE(hero_description, ''),
		COALESCE(category, ''),
		COALESCE(icon_url, ''),
		COALESCE(cover_image, ''),
		COALESCE(difficulty_level, ''),
		COALESCE(estimated_read_time, 0),
		COALESCE(trending_score, 0),
		COALESCE(popularity_score, 0),
		COALESCE(is_featured, false),
		created_at,
		updated_at,
		parent_topic_id,
		COALESCE(topic_level, 1),
		COALESCE(topic_order, 0),
		COALESCE(path, ''),
		COALESCE(is_category, false)

	FROM topics

	WHERE parent_topic_id = $1

	ORDER BY topic_order ASC
	`

	rows, err := db.DB.Query(
		context.Background(),
		query,
		topic.ID,
	)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   err.Error(),
		})

		return
	}
	defer rows.Close()

	var children []models.Topic

	for rows.Next() {

		var child models.Topic

		err := rows.Scan(
			&child.ID,
			&child.Slug,
			&child.Title,
			&child.ShortDescription,
			&child.HeroDescription,
			&child.Category,
			&child.IconURL,
			&child.CoverImage,
			&child.DifficultyLevel,
			&child.EstimatedReadTime,
			&child.TrendingScore,
			&child.PopularityScore,
			&child.IsFeatured,
			&child.CreatedAt,
			&child.UpdatedAt,
			&child.ParentTopicID,
			&child.TopicLevel,
			&child.TopicOrder,
			&child.Path,
			&child.IsCategory,
		)

		if err != nil {
			continue
		}

		children = append(children, child)
	}

	c.JSON(http.StatusOK, gin.H{
		"success":  true,
		"children": children,
	})
}

// =========================================
// GET ROOT TOPICS
// =========================================

func GetRootTopics(c *gin.Context) {

	query := `
	SELECT
		id,
		slug,
		title,
		COALESCE(short_description, ''),
		COALESCE(hero_description, ''),
		COALESCE(category, ''),
		COALESCE(icon_url, ''),
		COALESCE(cover_image, ''),
		COALESCE(difficulty_level, ''),
		COALESCE(estimated_read_time, 0),
		COALESCE(trending_score, 0),
		COALESCE(popularity_score, 0),
		COALESCE(is_featured, false),
		created_at,
		updated_at,
		parent_topic_id,
		COALESCE(topic_level, 1),
		COALESCE(topic_order, 0),
		COALESCE(path, ''),
		COALESCE(is_category, false)

	FROM topics

	WHERE parent_topic_id IS NULL

	ORDER BY topic_order ASC
	`

	rows, err := db.DB.Query(
		context.Background(),
		query,
	)

	if err != nil {

		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   err.Error(),
		})

		return
	}
	defer rows.Close()

	var topics []models.Topic

	for rows.Next() {

		var topic models.Topic

		err := rows.Scan(
			&topic.ID,
			&topic.Slug,
			&topic.Title,
			&topic.ShortDescription,
			&topic.HeroDescription,
			&topic.Category,
			&topic.IconURL,
			&topic.CoverImage,
			&topic.DifficultyLevel,
			&topic.EstimatedReadTime,
			&topic.TrendingScore,
			&topic.PopularityScore,
			&topic.IsFeatured,
			&topic.CreatedAt,
			&topic.UpdatedAt,
			&topic.ParentTopicID,
			&topic.TopicLevel,
			&topic.TopicOrder,
			&topic.Path,
			&topic.IsCategory,
		)

		if err != nil {
			continue
		}

		topics = append(topics, topic)
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"topics":  topics,
	})
}
