function saveAuthToCookie(value) {
  document.cookie = `til_auth=${value}`;
  localStorage.setItem('ACCESS_TOKEN', value);
}

function getAuthFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)til_auth\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

function deleteCookie(value) {
  document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export {
  saveAuthToCookie,
  getAuthFromCookie,
  deleteCookie,
};
