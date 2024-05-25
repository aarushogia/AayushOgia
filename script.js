document.addEventListener("DOMContentLoaded", function () {
  const mobileMenu = document.querySelector(".mobile-menu");
  const menu = document.querySelector(".menu");

  mobileMenu.addEventListener("click", function () {
    menu.classList.toggle("show");
  });

  // Add event listener for username input validation
  document.getElementById("username").addEventListener("input", validateUsername);
});

function validateUsername() {
  const username = document.getElementById("username").value;
  const usernameError = document.getElementById("usernameError");
  const usernamePattern = /^[a-zA-Z]+$/; // Allows only alphabets, no spaces or numbers
  
  if (username.trim() === "") {
    usernameError.textContent = "Username cannot be empty or spaces only.";
  } else if (!usernamePattern.test(username)) {
    usernameError.textContent = "Username must contain only alphabets without spaces or numbers.";
  } else {
    usernameError.textContent = "";
  }
}

function processRegistration(event) {
  event.preventDefault();
  
  // Validate username before proceeding
  validateUsername();
  const usernameError = document.getElementById("usernameError").textContent;
  if (usernameError !== "") {
    return; // Stop the form submission if there are validation errors
  }

  let registrationStatus = false;
  let message = "";
  
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  localStorage.setItem("RegisteredUsers", username + ":" + password + ";");

  const savedItem = localStorage.getItem('RegisteredUsers');

  if (savedItem !== null) {
    alert('User registered successfully!');
  } else {
    alert('User not registered.');
  }
}

function processLogin(event) {
  event.preventDefault();
  
  // Validate username before proceeding
  validateUsername();
  const usernameError = document.getElementById("usernameError").textContent;
  if (usernameError !== "") {
    return; // Stop the form submission if there are validation errors
  }

  let usernameEntered = document.getElementById("username").value;
  let passwordEntered = document.getElementById("password").value;

  const registeredUsers = localStorage.getItem("RegisteredUsers");
  let loginStatus = false;
  let message = "";
  
  if (registeredUsers != null) {
    let usernamePasswordPairs = registeredUsers.split(";");
    
    for (let i = 0; i < usernamePasswordPairs.length; i++) {
      if (usernamePasswordPairs[i] != " ") {
        let registeredUsername = usernamePasswordPairs[i].split(":")[0];
        let registeredPassword = usernamePasswordPairs[i].split(":")[1];
        
        if (usernameEntered == registeredUsername && passwordEntered == registeredPassword) {
          loginStatus = true;
          break;
        }
      }
    }
    message = loginStatus ? "login success" : "login failed, invalid credentials";
  } else {
    message = "no one has registered!";
  }
  alert(message);
}
