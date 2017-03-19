export const createUser = (user, success, error) => {
  $.ajax({
    method: 'POST',
    url: 'api/users/',
    data: user,
    success,
    error
  });
};

export const updateUser = (user, success, error) => {
  $.ajax({
    method: 'PATCH',
    url: `api/users/${user.id}`,
    data: {user},
    success,
    error
  });
};

export const fetchUsers = (params, success) => {
  $.ajax({
    method: "GET",
    url: "api/users",
    data: params,
    success
  });
};

export const fetchUser = (id, success) => {
  $.ajax({
    method: "GET",
    url: `api/users/${id}`,
    data: id,
    success
  });
};

export const deleteUser = (id, success) => {
  $.ajax({
    method: "DELETE",
    url: `api/users/${id}`,
    success
  });
};
