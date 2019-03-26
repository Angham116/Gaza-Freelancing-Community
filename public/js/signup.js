const firstStepDiv = getElement('user-info');
const secondStepDiv = getElement('contacts-info');
const thirdStepDiv = getElement('confirm-info');
const confirmedPassword = getElement('confirm-pass','val');
const fields = document.getElementById("category-fields");
const specializations = document.getElementById("specialization-fields");

const userInfo = {};
secondStepDiv.style.display = 'none';
thirdStepDiv.style.display = 'none';

getElement('user-info-next-btn').addEventListener('click', (e) => {
  e.preventDefault();
    userInfo.firstSection = {
      firstName: getElement('firstname', 'val'),
      lastName: getElement('lastname', 'val'),
      mobile: getElement( 'mobile', 'val'),
      email: getElement('email', 'val')
    }
  validate(userInfo.firstSection, validationRegex.firstStepValidationRegex, (trueOrFalse) => {
    if (trueOrFalse) {
      ToggleDisplay(firstStepDiv, secondStepDiv);
    }
  });
});
getElement('to-confirm-info').addEventListener('click', (e) => {
  e.preventDefault();
  userInfo.secondSection = {
    field: fields.options[fields.selectedIndex].value,
    specialization:specializations.options[specializations.selectedIndex].value,
    freeLanceURL: getElement('user-url','val'),
    photoURL: getElement('user-photo','val'),
  };
  validate(userInfo.secondSection, validationRegex.secondStepValidationRegex, (trueOrFalse) => {
    if (trueOrFalse) {
      ToggleDisplay(secondStepDiv, thirdStepDiv);
    }
  });
});
getElement('to-user-info').addEventListener('click', (e) => {
  e.preventDefault();
  ToggleDisplay(secondStepDiv, firstStepDiv);
});
getElement('signup-btn').addEventListener('click', (e) => {
  e.preventDefault();
  userInfo.thirdSection = {
    password: getElement('password','val'),
  };
  if (userInfo.thirdSection['password'] === getElement('confirm-pass','val')) {
    validate(userInfo.thirdSection, validationRegex.thirdStepValidationRegex, (trueOrFalse) => {
      if (trueOrFalse) {
        fetch('/signup', {
          method: 'POST',
          credentials: 'same-origin',
          body: JSON.stringify(userInfo),
          headers: { 'Content-Type': 'application/json' },
        })
          .then(res => res.json())
          .then((res) => {
            if (res.Error) {
              Swal.fire({
                title: '<i>Oops</i>',
                html: `${res.Error}`,
                confirmButtonText: '<u>ok</u>',
              });
            } else {
              window.location.href = '/login';
            }
          })
          .catch(() => {
            Swal.fire({
              title: '<i>Oops</i>',
              html: 'Error, please try again',
              confirmButtonText: '<u>ok</u>',
            });
          });
      }
    });
  }else{
    Swal.fire({
      title: '<i>Oops</i>',
      html: 'Passwords don\'t match',
      confirmButtonText: '<u>ok</u>',
    });
  }
});
getElement('to-contacts-info').addEventListener('click', (e) => {
  e.preventDefault();
  ToggleDisplay(thirdStepDiv, secondStepDiv);
});
