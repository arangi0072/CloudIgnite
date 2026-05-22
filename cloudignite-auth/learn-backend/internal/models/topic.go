package models

import "time"

type Topic struct {
	ID    string `json:"id"`
	Slug  string `json:"slug"`
	Title string `json:"title"`

	ShortDescription string `json:"short_description"`
	HeroDescription  string `json:"hero_description"`

	Category string `json:"category"`

	IconURL    string `json:"icon_url"`
	CoverImage string `json:"cover_image"`

	DifficultyLevel string `json:"difficulty_level"`

	EstimatedReadTime int `json:"estimated_read_time"`

	TrendingScore   float64 `json:"trending_score"`
	PopularityScore float64 `json:"popularity_score"`

	IsFeatured bool `json:"is_featured"`
	IsCategory bool `json:"is_category"`

	ParentTopicID *string `json:"parent_topic_id"`

	TopicLevel int `json:"topic_level"`
	TopicOrder int `json:"topic_order"`

	Path string `json:"path"`

	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type TopicSection struct {
	ID string `json:"id"`

	SectionOrder int `json:"section_order"`

	SectionType string `json:"section_type"`

	Title string `json:"title"`

	Content string `json:"content"`
}

type TopicDiagram struct {
	ID string `json:"id"`

	Title string `json:"title"`

	DiagramType string `json:"diagram_type"`

	DiagramData interface{} `json:"diagram_data"`

	IsInteractive bool `json:"is_interactive"`
}

type RelatedTopic struct {
	ID string `json:"id"`

	Title string `json:"title"`

	Slug string `json:"slug"`

	RelationType string `json:"relation_type"`

	Strength float64 `json:"strength"`
}

type TopicTreeNode struct {
	Topic Topic `json:"topic"`

	Children []TopicTreeNode `json:"children"`
}

type TopicResponse struct {
	Topic Topic `json:"topic"`

	ChildTopics []Topic `json:"child_topics"`

	Sections []TopicSection `json:"sections"`

	Diagrams []TopicDiagram `json:"diagrams"`

	RelatedTopics []RelatedTopic `json:"related_topics"`
}
