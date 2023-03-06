//id function
function r_e(id) {
  return document.querySelector(`#${id}`);
}

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
