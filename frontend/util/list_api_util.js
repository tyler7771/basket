export const createList = (list, success, error) => {
  $.ajax({
    method: 'POST',
    url: 'api/lists/',
    data: list,
    success,
    error
  });
};

export const updateList = (list, success, error) => {
  $.ajax({
    method: 'PATCH',
    url: `api/lists/${list.id}`,
    data: {list},
    success,
    error
  });
};

export const fetchLists = success => {
  $.ajax({
    method: "GET",
    url: "api/lists",
    success
  });
};

export const fetchList = (id, success) => {
  $.ajax({
    method: "GET",
    url: `api/lists/${id}`,
    success
  });
};

export const deleteList = (id, success) => {
  $.ajax({
    method: "DELETE",
    url: `api/lists/${id}`,
    success
  });
};
