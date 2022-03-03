const BASE_API_URL = "http://localhost:8080";

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
