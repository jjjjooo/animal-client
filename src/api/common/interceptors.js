export function setIntercepotors(instance) {
  instance.interceptors.request.use(
    function (config) {
      const accessToken =
        localStorage.getItem('ACCESS_TOKEN');
      config.headers.Authorization =
        'Bearer ' + accessToken;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );

  instance.interceptors.response.use(
    function (response) {
      console.log(response);
      return response;
    },
    function (error) {
      return Promise.reject(error);
    },
  );
  return instance;
}
