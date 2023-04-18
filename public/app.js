//id function
function r_e(id) {
  return document.querySelector(`#${id}`);
}

// global variables

let signupbtn = document.querySelector("#signupbtn");
let signup_modal = document.querySelector("#signup_modal");
let signup_modalbg = document.querySelector("#signup_modalbg");

let signinbtn = document.querySelector("#signinbtn");
let signin_modal = document.querySelector("#signin_modal");
let signin_modalbg = document.querySelector("#signin_modalbg");

function configure_nav_bar(user) {
  let signedins = document.querySelectorAll(".signedin");
  let signedouts = document.querySelectorAll(".signedout");

  if (user) {
    // show all elements with the class signedin AND hide all elements with the class signedout

    signedins.forEach((link) => {
      link.classList.remove("is-hidden");
    });

    signedouts.forEach((link) => {
      link.classList.add("is-hidden");
    });
  }
  // user is signed out
  else {
    // hide all elements with the class signedin AND show all elements with the class signedout

    signedins.forEach((link) => {
      link.classList.add("is-hidden");
    });

    signedouts.forEach((link) => {
      link.classList.remove("is-hidden");
    });
  }
}

function configure_message_bar(msg) {
  r_e("message_bar").innerHTML = msg;

  // make the message bar hidden

  r_e("message_bar").classList.remove("is-hidden");

  // after 2 seconds, make the message bar hidden again
  setTimeout(() => {
    r_e("message_bar").classList.add("is-hidden");
    r_e("message_bar").innerHTML = "";
  }, 2000);
}

// sign-up modal link
signupbtn.addEventListener("click", () => {
  signup_modal.classList.add("is-active");
});

signup_modalbg.addEventListener("click", () => {
  signup_modal.classList.remove("is-active");
});

// sign-in modal link
signinbtn.addEventListener("click", () => {
  signin_modal.classList.add("is-active");
});

signin_modalbg.addEventListener("click", () => {
  signin_modal.classList.remove("is-active");
});

// sign out users

r_e("signoutbtn").addEventListener("click", () => {
  auth.signOut().then(() => {});
});

// sign up users

r_e("signup_form").addEventListener("submit", (e) => {
  // prevent the page from auto refresh
  e.preventDefault();

  // get the email and password

  let email = r_e("email").value;
  let password = r_e("password").value;

  // send email and password to firebase to create the user

  auth.createUserWithEmailAndPassword(email, password).then((user) => {
    configure_message_bar(`Welcome ${auth.currentUser.email}`);

    // reset the form
    r_e("signup_form").reset();

    // hide the modal
    r_e("signup_modal").classList.remove("is-active");
  });
});

// sign out users

r_e("signoutbtn").addEventListener("click", () => {
  auth.signOut().then(() => {});
});

// sign in users

r_e("signin_form").addEventListener("submit", (e) => {
  // prevent the page from auth refresh
  e.preventDefault();

  // get the email and password from the form

  let email = r_e("email_").value;
  let password = r_e("password_").value;

  // send email/password to firebase for authentication

  auth.signInWithEmailAndPassword(email, password).then((user) => {
    // reset the form
    r_e("signin_form").reset();

    // hide the modal
    r_e("signin_modal").classList.remove("is-active");
  });
});

// User Accounts
//let user1 = {
// name: 'admin1',
// admin: true
//};

//let user2 = {
// name: 'nonadmin1',
// admin: false
//};

//db.collection("users").add(user1);
//db.collection("users").add(user2);
