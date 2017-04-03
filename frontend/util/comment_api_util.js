export const createComment = (comment, success, error) => {
  $.ajax({
    method: 'POST',
    url: 'api/list_comments/',
    data: {comment},
    success,
    error
  });
};

export const updateComment = (comment, success, error) => {
  $.ajax({
    method: 'PATCH',
    url: `api/list_comments/${comment.id}`,
    data: {comment},
    success,
    error
  });
};

export const fetchComments = (params, success) => {
  $.ajax({
    method: "GET",
    url: "api/list_comments",
    data: params,
    success
  });
};

export const fetchComment = (id, success) => {
  $.ajax({
    method: "GET",
    url: `api/list_comments/${id}`,
    data: id,
    success
  });
};

export const deleteComment = (id, success) => {
  $.ajax({
    method: "DELETE",
    url: `api/list_comments/${id}`,
    success
  });
};
