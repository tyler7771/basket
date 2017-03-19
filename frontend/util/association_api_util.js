export const createAssociation = (association, success) => {
  $.ajax({
    method: 'POST',
    url: 'api/user_list_association/',
    data: {association},
    success
  });
};
