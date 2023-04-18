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

  // functions

  function configure_nav_bar(user) {
    if (user) {
    } else {
    }
  }
  
  function r_e(id) {
    return document.querySelector(`#${id}`);
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
  
  








/

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
