const {
  deleteComment,
  postComment,
  patchComment,
  selectAllComments
} = require("../models/commentsModels");

exports.removeComment = (req, res, next) => {
  const { comment_id } = req.params;

  deleteComment(comment_id)
    .then(result => {
      if (result === 1) res.status(204).send();
      else if (result === 0)
        return Promise.reject({
          status: 404,
          msg: "Error: comment not found with this ID"
        });
    })
    .catch(err => {
      next(err);
    });
};

exports.uploadComment = (req, res, next) => {
  const { body, params } = req;
  postComment(body, params)
    .then(comment => {
      res.status(201).send({ comment: comment[0] });
    })
    .catch(err => {
      next(err);
    });
};

exports.updateComment = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;

  patchComment(inc_votes, comment_id)
    .then(([comment]) => {
      if (!comment) {
        return Promise.reject({
          status: 404,
          msg: "Error: Comment not found with this ID"
        });
      } else res.status(200).send({ comment });
    })
    .catch(err => {
      next(err);
    });
};

exports.sendAllComments = (req, res, next) => {
  selectAllComments(req.query)
    .then(comments =>
      res.status(200).send({ comments, comment_count: comments.length })
    )
    .catch(err => {
      next(err);
    });
};
