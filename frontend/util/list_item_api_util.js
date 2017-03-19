export const createListItem = (item, success, error) => {
  $.ajax({
    method: 'POST',
    url: 'api/list_items/',
    data: item,
    success,
    error
  });
};

export const updateListItem = (item, success, error) => {
  $.ajax({
    method: 'PATCH',
    url: `api/list_items/${item.id}`,
    data: {item},
    success,
    error
  });
};

export const fetchListItems = (list, success) => {
  $.ajax({
    method: "GET",
    url: "api/list_items",
    data: list,
    success
  });
};

export const fetchListItem = (id, success) => {
  $.ajax({
    method: "GET",
    url: `api/list_items/${id}`,
    data: id,
    success
  });
};

export const deleteListItem = (id, success) => {
  $.ajax({
    method: "DELETE",
    url: `api/list_items/${id}`,
    success
  });
};
