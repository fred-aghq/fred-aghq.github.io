function prepareQueryString(parameters) {
  const include = parameters.include?.length > 0 ? '?inc='.concat(parameters.include.join(',')) : '';
  const exclude = parameters.exclude?.length > 0 ? '&exc='.concat(parameters.exclude.join(',')) : '';
  const seed = parameters.seed?.length > 0 ? '&seed='.concat(parameters.seed) : '';

  return ''.concat(include, exclude, seed);
}

async function getRandomUser(include = [], exclude = [], seed = '') {
  const url = 'https://randomuser.me/api/'.concat(
    prepareQueryString({
      include: include,
      exclude: exclude,
      seed: seed,
    }));

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });

  return response.json();
}
