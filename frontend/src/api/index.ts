export const definedApiMethods = {
  get: "GET",
  post: "POST",
  put: "PUT",
  delete: "DELETE",
  any: "ANY",
};

export const apiSettingsMaker = ({ method, body } : { method: any, body: string | object }) => {
  const settings = {
    method,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      Authorization: sessionStorage.getItem("token"),
      user: sessionStorage.getItem("user"),
    },
    body
  };
  return settings;
};
