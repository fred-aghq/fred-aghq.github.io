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

  function parseField(form, fieldName) {
    return (form.get(`${fieldName}`).length > 0) && {[fieldName]: form.get(fieldName)};
  }

  function parseCheckboxes(form, fieldName) {
    const checked = form.getAll(fieldName);
    return (checked.length > 0) && {[fieldName]: checked};
  }

// Dynamically generate the list of fields to include in the response
  function generateIncSection() {
    const incSection = document.getElementById('section-inc');

    fields.forEach(function (fieldName, _) {
      // naming
      const labelText = fieldName[0].toUpperCase() + fieldName.substring(1);

      // inner span
      const span = document.createElement('span');
      span.appendChild(document.createTextNode(labelText));

      // actual checkbox
      const checkbox = document.createElement('input');
      checkbox.setAttribute('id', 'inc-' + fieldName);
      checkbox.setAttribute('name', 'inc');
      checkbox.setAttribute('type', 'checkbox');
      checkbox.setAttribute('value', fieldName);

      // the label element
      const label = document.createElement('label')
      label.setAttribute('for', 'inc-' + fieldName)
      label.appendChild(checkbox);
      label.appendChild(span);

      // wrap it in a p tag for materialize
      const wrapper = document.createElement('p');
      wrapper.appendChild(label);

      incSection.appendChild(wrapper);
    });
  }
}
