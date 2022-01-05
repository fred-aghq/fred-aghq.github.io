const fields = [
  'gender',
  'name',
  'location',
  'email',
  'login',
  'registered',
  'dob',
  'phone',
  'cell',
  'id',
  'picture',
  'nat',
];

function initForm() {
  const btnSubmit = document.getElementById('btnSubmit');
  const form = document.getElementById('queryOptions');

  generateIncSection();

  form.addEventListener('submit', handleFormSubmit);

  function handleFormSubmit(e) {
    e.preventDefault();
    btnSubmit.setAttribute('disabled', '');

    // @TODO: get/parse params from event
    const formData = new FormData(e.target);

    // bit cheeky but nice syntactic sugar under time constraints
    const params = {
      ...parseField(formData, 'results'),
      ...parseField(formData, 'seed'),
      ...parseField(formData, 'gender'),
      ...parseCheckboxes(formData, 'inc')
    }

    getRandomUser(params)
      .then(function (data) {
        btnSubmit.removeAttribute('disabled');
        console.log(data.results);
      });
  }
}

function parseField(form, fieldName) {
  return (form.get(`${fieldName}`).length > 0) && {[fieldName]: form.get(fieldName)};
}

function parseCheckboxes(form, fieldName) {
  const checked = form.getAll(fieldName);
  return (checked.length > 0) && {[fieldName]: checked};
}

function generateIncSection()
{
  const incSection = document.getElementById('section-inc');

  fields.forEach(function(fieldName, _) {
    const labelText = fieldName[0].toUpperCase() + fieldName.substring(1);

    const checkbox = document.createElement('input');
    checkbox.setAttribute('id', 'inc-' + fieldName);
    checkbox.setAttribute('name', 'inc');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('value', fieldName);
    checkbox.setAttribute('style', 'display: block;');

    const label = document.createElement('label')
    label.setAttribute('for', 'inc-' + fieldName)
    label.appendChild(document.createTextNode(labelText));

    incSection.appendChild(
      label
    )

    incSection.appendChild(
      checkbox
    )
  });
}