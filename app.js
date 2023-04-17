//id function
function r_e(id) {
  return document.querySelector(`#${id}`);
}

// global variables

let signinbtn = document.querySelector("#signinbtn");
let signin_modal = document.querySelector("#signin_modal");
let signin_modalbg = document.querySelector("#signin_modalbg");

// sign-in modal link
signinbtn.addEventListener("click", () => {
  signin_modal.classList.add("is-active");
});

signin_modalbg.addEventListener("click", () => {
  signin_modal.classList.remove("is-active");
});

// get the email and password

let email = r_e("email").value;
let password = r_e("password").value;

// send email and password to firebase to create the user

auth.createUserWithEmailAndPassword(email, password).then((user) => {
  //configure_message_bar(`Welcome ${auth.currentUser.email}`);

  // reset the form
  r_e("signup_form").reset();

  // hide the modal
  r_e("signup_modal").classList.remove("is-active");
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
