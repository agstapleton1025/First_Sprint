// global variables

// let signupbtn = document.querySelector("#signupbtn");
// let signup_modal = document.querySelector("#signup_modal");
// let signup_modalbg = document.querySelector("#signup_modalbg");

// let signinbtn = document.querySelector("#signinbtn");
// let signin_modal = document.querySelector("#signin_modal");
// let signin_modalbg = document.querySelector("#signin_modalbg");

// // functions

// function configure_nav_bar(user) {
//   let signedins = document.querySelectorAll(".signedin");
//   let signedouts = document.querySelectorAll(".signedout");

//   if (user) {
//     // show all elements with the class signedin AND hide all elements with the class signedout

//     signedins.forEach((link) => {
//       link.classList.remove("is-hidden");
//     });

//     signedouts.forEach((link) => {
//       link.classList.add("is-hidden");
//     });
//   }
//   // user is signed out
//   else {
//     // hide all elements with the class signedin AND show all elements with the class signedout

//     signedins.forEach((link) => {
//       link.classList.add("is-hidden");
//     });

//     signedouts.forEach((link) => {
//       link.classList.remove("is-hidden");
//     });
//   }
// }

// function r_e(id) {
//   return document.querySelector(`#${id}`);
// }

// // sign-up modal link
// signupbtn.addEventListener("click", () => {
//   signup_modal.classList.add("is-active");
// });

// signup_modalbg.addEventListener("click", () => {
//   signup_modal.classList.remove("is-active");
// });

// // sign-in modal link
// signinbtn.addEventListener("click", () => {
//   signin_modal.classList.add("is-active");
// });

// signin_modalbg.addEventListener("click", () => {
//   signin_modal.classList.remove("is-active");
// });

// // sign up users

// r_e("signup_form").addEventListener("submit", (e) => {
//   // prevent the page from auto refresh
//   e.preventDefault();

//   // get the email and password

//   let email = r_e("email").value;
//   let password = r_e("password").value;

//   // console.log(email, password);

//   // send email and password to firebase to create the user

//   auth.createUserWithEmailAndPassword(email, password).then((user) => {
//     // console.log("user created!");

//     // reset the form
//     r_e("signup_form").reset();

//     // hide the modal
//     r_e("signup_modal").classList.remove("is-active");
//   });
// });

// // sign out users

// r_e("signoutbtn").addEventListener("click", () => {
//   auth.signOut().then(() => {
//     // console.log("user signed out!");

//     // hide the user email from the nav bar

//     r_e("currentuser").innerHTML = "";
//   });
// });

// // sign in users

// r_e("signin_form").addEventListener("submit", (e) => {
//   // prevent the page from auth refresh
//   e.preventDefault();

//   // get the email and password from the form

//   let email = r_e("email_").value;
//   let password = r_e("password_").value;

//   // send email/password to firebase for authentication

//   auth.signInWithEmailAndPassword(email, password).then((user) => {
//     // console.log(user.user.email);

//     // display the user email on the nav bar

//     r_e("currentuser").innerHTML = user.user.email;

//     // reset the form
//     r_e("signin_form").reset();

//     // hide the modal
//     r_e("signin_modal").classList.remove("is-active");
//   });
// });

// // keep track of user authenticaiton status

// auth.onAuthStateChanged((user) => {
//   if (user) {
//     alert("user signed in");
//   } else {
//     alert("user signed out");
//   }
// });

// Query the collection and retrieve the documents

// configure_nav_bar(user.email);
var mybutton = document.querySelector("#mybutton");
mybutton.addEventListener("click", function () {
  var mymodal = document.querySelector("#mymodal");
  mymodal.classList.add("is-active");
});

let signinbtn = document.querySelector("#signinbtn");
let signinModal = document.querySelector("#signin-modal");
let signinModalBg = document.querySelector("#signin-modalbg");
signinbtn.addEventListener("click", () => {
  signinModal.classList.add("is-active");
});

signinModalBg.addEventListener("click", () => {
  signinModal.classList.remove("is-active");
});

// let postBtn = document.querySelector("#submit");
// let content = document.querySelector('#content');
let signup_form = document.querySelector("#signup_form");

signup_form.addEventListener("submit", (e) => {
  e.preventDefault();

  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log("user created successfully");
      mymodal.classList.remove("is-active");

      signup_form.reset();
    })
    .catch((error) => {
      // console.log(error.message);
      let signup_error = document.querySelector("#signup_error");
      signup_error.innerHTML = `<p>${error.message}</p>`;
    });
});

let signin_form = document.querySelector("#signin_form");

signin_form.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log('sign in form submitted!');

  // grab the email and password from the form

  let email = document.querySelector("#email_").value;
  let password = document.querySelector("#password_").value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredentials) => {
      console.log(
        userCredentials.user.email +
        " with the uid " +
        userCredentials.user.uid +
        " is logged in!"
      );
      // close the modal
      signinModal.classList.remove("is-active");

      // reset
      signin_form.reset();
    })
    .catch((error) => {
      console.log(error.message);

      // grab the error div

      let signin_error = document.querySelector("#signin_error");
      signin_error.innerHTML = `<p>${error.message}</p>`;
    });
});

let loggedoutlinks = document.querySelectorAll(".loggedout");
let loggedinlinks = document.querySelectorAll(".loggedin");

function configureNav(user) {
  if (user) {
    document.querySelector(
      "#welcome_user"
    ).innerHTML = `${auth.currentUser.email}`;
    // console.log(loggedoutlinks);

    loggedinlinks.forEach((link) => {
      link.classList.remove("is-hidden");
    });

    loggedoutlinks.forEach((link) => {
      link.classList.add("is-hidden");
    });
  }
  // no user is passed to the function (user is signed out)
  else {
    document.querySelector("#welcome_user").innerHTML = "";
    // show all the loggedout links
    loggedoutlinks.forEach((link) => {
      link.classList.remove("is-hidden");
    });
    // hide all the loggedin links
    loggedinlinks.forEach((link) => {
      link.classList.add("is-hidden");
    });
  }
}

let signoutbtn = document.querySelector("#signoutbtn");

signoutbtn.addEventListener("click", () => {
  auth.signOut().then((msg) => {
    console.log("user signed out!");
  });
});

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("user is now signed in!");
    configureNav(user);
  } else {
    console.log("user is now signed out!");
    configureNav();
  }
});



// Still figuring out the Load_Data Function:


// function load_data(coll, loc, field, val) {
//   let query = "";

//   if (field && val) {
//     query = db.collection(coll).where(field, '==', val);
//   } else {
//     query = db.collection(coll);
//   }
//   query.get().then(res => {

//     let documents = res.docs;

//     // html reference
//     html = "";

//     // check documents lenth if 0 => no rescues
//     // if (documents.length == 0) {
//     //   html += `<p class="has-text-centered is-size-3 " >No rescues posted at this time!<p>`
//     //   }

//     // loop through the documents array
//     documents.forEach(doc => {
//       html += `<div class="box has-background-dark has-text-light has-text-centered" style="border: solid white 2px" > `;

//       // check if current user email matches email stored on the document
//       if (auth.currentUser.email == doc.data().Email) {

//         // show Delete Button for Poster
//         html += `<h1 class="title has-text-centered has-text-light"> ${doc.data().Name} <button id="x_button" class="button is-pulled-right is-link" onclick="del_doc('rescues', '${doc.id}')">X</button> </h1>`; // add the rescue name inside an h1


//       } else {
//         // hide the x button from users
//         html += `<h1 class="title has-text-centered has-text-light"> ${doc.data().Name} </h1>`; // add just the rescue name inside an h1


//       }

//       html += `<p  >${doc.data().Name}</p>`;
//       html += `<p>Email: ${doc.data().Email}</p>`;
//       html += `<p > UnitPreference: ${doc.data().UnitPreference}</p> `;
//       html += `<p class="has-background-grey-lighter has-text-dark mt-5">  Contact: <a href="mailto:${doc.data().Email}"> ${doc.data().Email} </a>  </p>`
//       html += `</div>`;

//     })


//   })
// }
// load_data('Candidate Information', 'contentchange')



// // Testing how to pull our Doc data in Console.Log:

// console.log(db.collection("UnionCandidateTracker").doc("Candidate Information"))

// var docRef = db.collection("UnionCandidateTracker").doc("Candidate Information");

// docRef.get().then((doc) => {
//   if (doc.exists) {
//     console.log("Document data:", doc.data());
//   } else {
//     // doc.data() will be undefined in this case
//     console.log("No such document!");
//   }
// }).catch((error) => {
//   console.log("Error getting document:", error);
// });

// console.log(docRef.get('Candidate Information'));



// // More testing... Didn't create an output in the log and idk why

// db.collection("UnionCandidateTracker").get().then((querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
//   });
// });