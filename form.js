function initForm() {
  const btnSubmit = document.getElementById('btnSubmit');
  const form = document.getElementById('queryOptions');
  const preloader = document.getElementById('result-preloader');

  generateIncSection();
  form.addEventListener('submit', handleFormSubmit);

  function handleFormSubmit(e) {
    e.preventDefault();

    // disable submit
    btnSubmit.setAttribute('disabled', '');
    btnSubmit
      .classList
      .add('disabled');

    // show preloader
    preloader
      .classList
      .add('active');

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
        btnSubmit.classList.remove('disabled');
        preloader.classList.remove('active');
        const display = document.getElementById('results-display');

        display.childNodes.forEach(function (element) {
          element.remove();
        });
        display.appendChild(
          document.createTextNode(
            JSON.stringify(data, null, 2))
        );

        document.getElementById('results-container')
          .classList
          .remove('hide');
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

function handleCopyText() {
  /* Get the text field */
  const copyText = document.getElementById("results-display").firstChild;

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText.nodeValue);
}
