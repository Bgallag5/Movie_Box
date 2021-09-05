

async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector("#email-input").value.trim();
  const password = document.querySelector("#password-input").value.trim();

  console.log(email, password);

  if (email && password) {
    const response = await fetch("/api/user/login", {
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log('RESPONSE.OK');
      document.location.replace("/movies");
      console.log('LOCATION REPLACED');
    } else {
      ///betterlooking 'please enter req info'
      alert(response.statusText);
    }

  }
}

document.querySelector('#login-button').addEventListener('click', loginFormHandler);
// document.querySelector('#password-input').addEventListener('keyup', (e) => {
//   if(e.keyCode === 13) {
//     e.preventDefault();
//     $('#login-button').
//   }
// });



$('#new').on('click', () => {
  document.location.replace('/movies/register');
})

