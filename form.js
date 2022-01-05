const include = [
  'gender',
  'name',
  'email',
];

const exclude = [
  'nat',
];


const btnSubmit = document.getElementById('btnSubmit');
const form = document.getElementById('queryOptions');

form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
  e.preventDefault();
  btnSubmit.setAttribute('disabled', '');

  const seed = form.elements.seed.value;

  getRandomUser(include, exclude, seed)
    .then(function (data) {
      btnSubmit.removeAttribute('disabled');
      console.log(data.results);
    });
}
