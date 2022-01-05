const include = [
  'gender',
  'name',
  'email',
];

const exclude = [
  'nat',
];

const seed = 'foobar';

const btnSubmit = document.getElementById('btnSubmit');
const form = document.getElementById('queryOptions');

form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();
  btnSubmit.setAttribute('disabled', '');

  getRandomUser(include, exclude, seed)
    .then(function (data) {
      btnSubmit.removeAttribute('disabled');
      console.log(data.results);
    });
}
