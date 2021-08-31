

// //

//   const loginButton = document.getElementById("login-button");
//   var emailInput = document.getElementById("email-input");
//   var passwordInput = document.getElementById("password-input");
//   var usernameInput = document.getElementById("username-input");

//   loginButton.onclick = function(event){
//     event.preventDefault;
//     console.log(emailInput.value);
//     console.log(passwordInput.value);
//     console.log(usernameInput.value);
//     location.href = "./homepage";
//   }


async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector("#email-input").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  console.log(email, password);

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/movies");
    } else {
      alert(response.statusText);
    }

  }
}

document.querySelector('#login-button').addEventListener('click', loginFormHandler)


async function signupFormHandler(event) {
  event.preventDefault();

  const username = document.querySelector("#username-input").value.trim();
  const email = document.querySelector("#email-input").value.trim();
  const password = document.querySelector("#password-input").value.trim();

  if (username && email && password) {
    const response = await fetch(`/api/user/register`, {
      method: "post",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log(response);
      document.location.replace("/movies");
    } else {
      alert(response.statusText);
    }
  }
}

document.querySelector('#login-button').addEventListener('click', signupFormHandler)


