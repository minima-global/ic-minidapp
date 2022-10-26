export const fetchWrapper = {
  get,
  getWithoutRedirect,
  post,
  postPhone,
  postForm,
  put,
}

function getWithoutRedirect(url) {
  const requestOptions = {
      method: 'GET',
      // mode: 'cors',
      credentials: 'include',
  }
  return fetch(url, requestOptions)
}

function get(url) {
  const requestOptions = {
      method: 'GET',
      // mode: 'cors',
      credentials: 'include',
  }
  return fetch(url, requestOptions).then(handleResponse)
}

function post(url, body) {
  const requestOptions = {
      method: 'POST',
      // mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
  }
  return fetch(url, requestOptions).then((res) => handleResponse(res))
}

// probably could implement this better,
// but this is the same as post(),
// except without credentials
function postPhone(url, body) {
  const requestOptions = {
      method: 'POST',
      body,
  }
  return fetch(url, requestOptions).then((res) => handleResponse(res))
}

function postForm(url, body) {
  var urlencoded = new URLSearchParams()
  for (const [key, value] of Object.entries(body)) {
      urlencoded.append(key, value)
  }

  var requestOptions = {
      method: 'POST',
      // mode: 'cors',
      credentials: 'include',
      body: urlencoded,
  }

  return fetch(url, requestOptions).then(handleResponse)
}

function put(url, body) {
  const requestOptions = {
      method: 'PUT',
      // mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(body),
  }
  return fetch(url, requestOptions).then(handleResponse)
}

function handleResponse(response) {
  return response.text().then((text) => {
      const data = text && JSON.parse(text)

      if (!response.ok) {
          const error = (data && data.message) || response.statusText
          const status = response.status
          return Promise.reject({ error, status })
      }

      return data
  })
}
