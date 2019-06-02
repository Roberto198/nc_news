const { selectAllSearch, countArticles } = require("../models/searchModel");

exports.sendSearch = (req, res, next) => {
  const { search_term } = req.params;
  const { query } = req;
  const limitedQuery = selectAllSearch(search_term, query);
  const unlimitedQuery = countArticles(search_term, query);
  Promise.all([limitedQuery, unlimitedQuery])
    .then(([limitedArticles, count]) => {
      res
        .status(200)
        .send({ articles: limitedArticles, article_count: count.length });
    })
    .catch(err => {
      next(err);
    });
};
