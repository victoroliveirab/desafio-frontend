export function headerFromJwt(jwt: string) {
  const [header] = jwt.split('.');
  return JSON.parse(window.atob(header));
}

export function userFromJwt(jwt: string) {
  const [, payload] = jwt.split('.');
  return JSON.parse(window.atob(payload));
}
