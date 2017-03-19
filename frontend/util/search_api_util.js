export const fetchSearchResults = (params, success) => {
  $.ajax({
    method: "GET",
    url: "api/search_results",
    data: params,
    success
  });
};
