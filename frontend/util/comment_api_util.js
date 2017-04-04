export const createComment = (comment, success, error) => {
  $.ajax({
    method: 'POST',
    url: 'api/comments/',
    data: {comment},
    success,
    error
  });
};

export const updateComment = (comment, success, error) => {
  $.ajax({
    method: 'PATCH',
    url: `api/comments/${comment.id}`,
    data: {comment},
    success,
    error
  });
};

export const fetchComments = (params, success) => {
  $.ajax({
    method: "GET",
    url: "api/comments",
    data: params,
    success
  });
};

export const fetchComment = (id, success) => {
  $.ajax({
    method: "GET",
    url: `api/comments/${id}`,
    data: id,
    success
  });
};

export const deleteComment = (id, success) => {
  $.ajax({
    method: "DELETE",
    url: `api/comments/${id}`,
    success
  });
};
