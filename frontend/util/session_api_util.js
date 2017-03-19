export const signup = (data, success, error) => {
  $.ajax({
    method: 'POST',
    url: 'api/users/',
    data: data,
    success,
    error
  });
};

export const login = (data, success, error) => {
  $.ajax({
    method: 'POST',
    url: 'api/session/',
    data: data,
    success,
    error
  });
};

export const logout = (success) => {
  $.ajax({
    method: 'DELETE',
    url: 'api/session/',
    success,
    error: () => {console.log("error");}
  });
};
