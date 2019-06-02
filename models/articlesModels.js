const connection = require("../db/connection");
const { sendAllTopics } = require("../models/topicsModels");
const { formatComment } = require("../utils/utils");

exports.selectAllArticles = ({ author, topic, sort_by, order, limit, p }) => {
  const offset = limit * (p - 1);

  return connection
    .select(
      "articles.article_id",
      "articles.title",
      "articles.votes",
      "articles.topic",
      "articles.author",
      "articles.created_at"
    )
    .where("articles.author", "like", author || "%")
    .where("articles.topic", "like", topic || "%")
    .from("articles")
    .limit(limit || 10)
    .offset(offset || 0)
    .join("comments", "articles.article_id", "=", "comments.article_id")
    .count("comments.article_id as comment_count")
    .groupBy("articles.article_id")
    .orderBy(sort_by || "created_at", order || "desc");
};

//

exports.selectArticleById = id => {
  return connection
    .select(
      "articles.article_id",
      "articles.title",
      "articles.body",
      "articles.votes",
      "articles.topic",
      "articles.author",
      "articles.created_at"
    )
    .where("articles.article_id", "=", id)
    .from("articles")
    .join("comments", "articles.article_id", "=", "comments.article_id")
    .count("comments.article_id as comment_count")
    .groupBy("articles.article_id");
};

exports.selectArticlesComments = (id, query) => {
  const offset = query.limit * (query.p - 1);

  return connection("comments")
    .select("comment_id", "votes", "created_at", "author", "body")
    .where("comments.article_id", "=", id)
    .orderBy(query.sort_by || "created_at", query.order || "desc")
    .limit(query.limit || 10)
    .offset(offset || 0);
};

exports.patchArticle = (vote, id) => {
  return connection
    .select(
      "articles.article_id",
      "articles.title",
      "articles.votes",
      "articles.topic",
      "articles.author",
      "articles.created_at"
    )
    .where("articles.article_id", "=", id)
    .from("articles")
    .join("comments", "articles.article_id", "=", "comments.article_id")
    .count("comments.article_id as comment_count")
    .groupBy("articles.article_id")
    .increment("votes", vote || 0)
    .returning("*");
};

exports.postArticle = body => {
  const sqlArticle = formatComment(body);
  if (sqlArticle.author === undefined || sqlArticle.body === undefined) {
    return Promise.reject({
      status: 400,
      msg: "Incorrect keys to insert article (Please use username and body)"
    });
  } else {
    return connection("articles")
      .insert(sqlArticle)
      .returning("*");
  }
};

exports.deleteArticle = id => {
  return connection("comments")
    .where("article_id", id)
    .delete()
    .then(result => {
      return connection("articles")
        .where("article_id", id)
        .delete()
        .then(result => {
          return result;
        });
    });
};
