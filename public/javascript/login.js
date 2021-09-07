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
      document.location.replace("/movies");
    } else {
      ///betterlooking 'please enter req info'
      alert(response.statusText);
    }
  }
}

document
  .querySelector("#login-button")
  .addEventListener("click", loginFormHandler);

$("#new").on("click", () => {
  document.location.replace("/movies/register");
});
