function prepareQueryString(parameters) {
  const queryStrings = Object.keys(parameters).map(function(key, index) {
    let queryString = '';

    if (Array.isArray(parameters[key])) {
      queryString = parameters[key].join(',');
    }
    else {
      queryString = parameters[key];
    }

    if (index === 0) {
      return '?'.concat(key, '=', queryString)
    }

    return '&'.concat(key, '=', queryString)
  });

  console.log(queryStrings.join(''));
  return queryStrings.join('');
}

async function getRandomUser(parameters) {
  const url = 'https://randomuser.me/api/'.concat(prepareQueryString(parameters));

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  return response.json();
}
