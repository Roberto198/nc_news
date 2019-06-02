exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: "Route Not Found" });
};

exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};

exports.writtenErrors = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send(err);
  }
  if (err.status === 400) {
    res.status(400).send(err);
  } else next(err);
};

exports.sqlErrors = (err, req, res, next) => {
  if (
    err.detail ===
    'Key (author)=(inavlidUsername) is not present in table "users".'
  ) {
    res.status(400).send({ msg: "Please provide a valid username to post." });
  } else if (err.code === "22P02") {
    res
      .status(400)
      .send({
        msg: "Values must be an integer: Article_id, Inc_votes, comment_id"
      });
  } else if (err.code === "23503") {
    res.status(404).send({ msg: "Article not found by this ID" });
  } else if (err.code === "42703") {
    res
      .status(400)
      .send({
        msg: "Incorrect keys to insert comment (Please use username and body)"
      });
  } else next(err);
};
