const {
  articlesData,
  commentsData,
  topicsData,
  usersData
} = require("../data");
const {
  createUserRef,
  formatArticleData,
  commentRef,
  formatCommentsData
} = require("../../utils/utils");

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex("topics").insert(topicsData);
    })
    .then(() => {
      return knex("users")
        .insert(usersData)
        .returning("*");
    })
    .then(users => {
      const userRefObj = createUserRef(usersData, "username", "name");
      const formattedArticles = formatArticleData(articlesData, userRefObj);
      return knex("articles")
        .insert(formattedArticles)
        .returning("*");
    })
    .then(arts => {
      const commentsRefObj = commentRef(arts, commentsData);
      const formattedComments = formatCommentsData(
        commentsData,
        commentsRefObj
      );
      return knex("comments").insert(formattedComments);
    });
};
