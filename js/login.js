const loginsec = document.querySelector(".login-section");
const loginlink = document.querySelector(".login-link");
const registerlink = document.querySelector(".register-link");
const signUpEmail = document.querySelector("#sign-up-email");
const signUpPassword = document.querySelector("#sign-up-password");
const signInEmail = document.querySelector("#sign-in-email");
const signInPassword = document.querySelector("#sign-in-password");
const signInButton = document.querySelector("#sign-in-button");
const signUpButton = document.querySelector("#sign-up-button");

registerlink.addEventListener("click", (e) => {
  loginsec.classList.add("active");
});

loginlink.addEventListener("click", (e) => {
  loginsec.classList.remove("active");
});

signUpButton.addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAEP_ydlwLDo-CpytHQnndOgnVtjFecMOU",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: signUpEmail.value,
          password: signUpPassword.value,
          returnSecureToken: true,
        }),
      }
    );

    const data = await response.json();

    if (data?.error) {
      if (data?.error?.message.includes("EMAIL_EXISTS")) {
        alert("Email already exists");
      } else {
        alert(data?.error?.message);
      }
    } else {
      sessionStorage.setItem("id_token", data.idToken);

      window.location.href = "index.html";
    }
  } catch (error) {
    alert(error?.message || error);
  }
});

signInButton.addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAEP_ydlwLDo-CpytHQnndOgnVtjFecMOU",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: signInEmail.value,
          password: signInPassword.value,
          returnSecureToken: true,
        }),
      }
    );

    const data = await response.json();

    if (data?.error) {
      if (data?.error?.message.includes("EMAIL_NOT_FOUND")) {
        alert("User doesn't exist");
      } else if (data?.error?.message.includes("INVALID_PASSWORD")) {
        alert("Invalid password");
      } else {
        alert(data?.error?.message);
      }
    } else {
      sessionStorage.setItem("id_token", data.idToken);

      window.location.href = "index.html";
    }
  } catch (error) {
    alert(error?.message || error);
  }
});
