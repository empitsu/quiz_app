import { IncomingHttpHeaders } from "http";

export function getIdTokenFromHeaders(headers: IncomingHttpHeaders) {
  const idToken = headers["authorization"];
  return idToken?.replace(/^Bearer (.*)/, "$1");
}
