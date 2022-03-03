/**
 * @note We're using an Express proxy server for the project to work in
 * the sandbox environment. The proxy server redirects all requests
 * prefixed with "/api" to the backend API server. A request to
 * "/api/notes" is thus redirected to "localhost:8080/notes". You may
 * want to use a different URL depending on your local setup.
 */

const BASE_API_URL = "/api";

async function _fetch(url, options) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (response.status === 204) {
    return null;
  }

  const result = await response.json();

  return result.data;
}

export async function getAll() {
  return await _fetch(`${BASE_API_URL}/notes`);
}

export async function getOne(id) {
  return await _fetch(`${BASE_API_URL}/notes/${id}`);
}

export async function add(data) {
  return await _fetch(`${BASE_API_URL}/notes`, {
    method: "post",
    body: JSON.stringify(data),
  });
}

export async function put(id, data) {
  return await _fetch(`${BASE_API_URL}/notes/${id}`, {
    method: "put",
    body: JSON.stringify(data),
  });
}

export async function remove(id) {
  return await _fetch(`${BASE_API_URL}/notes/${id}`, {
    method: "delete",
  });
}
