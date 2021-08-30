// 

  const loginButton = document.getElementById("login-button");
  var emailInput = document.getElementById("email-input");
  var passwordInput = document.getElementById("password-input");
  var usernameInput = document.getElementById("username-input");
  
  loginButton.onclick = function(event){
    event.preventDefault;
    console.log(emailInput.value);
    console.log(passwordInput.value);
    console.log(usernameInput.value);
    location.href = "./";
  }

  //async function loginFormHandler(event) {
    //     event.preventDefault();
      
    //     const email = document.querySelector('#email-login').value.trim();
    //     const password = document.querySelector('#password-login').value.trim();
      
    //     if (email && password) {
    //       const response = await fetch('/api/users/login', {
    //         method: 'post',
    //         body: JSON.stringify({
    //           email,
    //           password
    //         }),
    //         headers: { 'Content-Type': 'application/json' }
    //       });
      
    //       if (response.ok) {
    //         document.location.replace('/dashboard/');
    //       } else {
    //         alert(response.statusText);
    //       }
    //     }
    //   }
      
    //   async function signupFormHandler(event) {
    //     event.preventDefault();
      
    //     const username = document.querySelector('#username-signup').value.trim();
    //     const email = document.querySelector('#email-signup').value.trim();
    //     const password = document.querySelector('#password-signup').value.trim();
      
    //     if (username && email && password) {
    //       const response = await fetch('/api/users', {
    //         method: 'post',
    //         body: JSON.stringify({
    //           username,
    //           email,
    //           password
    //         }),
    //         headers: { 'Content-Type': 'application/json' }
    //       });
      
    //       if (response.ok) {
    //         document.location.replace('/dashboard/');
    //       } else {
    //         alert(response.statusText);
    //       }
    //     }
    //   }

  //const loginButton = document.getElementById("#login-button")
  //loginButton.onclick = function loginPage() {
  //  location.href="../public.dashboard.html"
  //}
  
 // document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  
  //document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
  //document.querySelector('#login-form').addEventListener('submit', loginFormHandler);
  
  // document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
