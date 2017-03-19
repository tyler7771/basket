export const createUserListAssociation = (user_list_association, success, error) => {
  $.ajax({
    method: 'POST',
    url: 'api/user_list_association',
    data: user_list_association,
    success,
    error
  });
};

export const deleteUserListAssociation = (id, success) => {
  $.ajax({
    method: "DELETE",
    url: `api/user_list_association/${id}`,
    success
  });
};
