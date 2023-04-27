//id function
function r_e(id) {
  return document.querySelector(`#${id}`);
}

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

// var docRef = db.collection("Candidate Information").doc("tnTHXcqh6PHczDJaHXRf");

// docRef
//   .get()
//   .then((doc) => {
//     if (doc.exists) {
//       console.log("Document data:", doc.data());
//     } else {
//       // doc.data() will be undefined in this case
//       console.log("No such document!");
//     }
//   })
//   .catch((error) => {
//     console.log("Error getting document:", error);
//   });

// reference the collection
const candidateInfoRef = db.collection("Candidate Information");

// get all documents in the collection
candidateInfoRef.get().then((querySnapshot) => {
  // loop through each document in the snapshot
  querySnapshot.forEach((doc) => {
    // create a new card element
    const card = document.createElement("div");
    card.classList.add("card", "filter-item"); // add filter class to card element
    card.setAttribute("data-unit", doc.data().UnitPreference); // add data attribute for unit preference
    card.setAttribute("data-location", doc.data().PreferredLocation); // add data attribute for location
    card.setAttribute("data-grad-year", doc.data().PredictedGraduationDate); // add data attribute for graduation year
    card.setAttribute("data-term", doc.data().When); // add data attribute for term
    // set card content using document data
    const cardContent = `
      <div class="card-content">
        <div class="content">
          <div class="media-content">
            <p class="title is-4">${doc.data().Name}</p>
          </div>
          <p>Email: ${doc.data().Email}</p>
          <p>Unit: ${doc.data().UnitPreference}</p>
          <p>Location: ${doc.data().PreferredLocation}</p>
          <p>Grad Year: ${doc.data().PredictedGraduationDate}</p>
          <p>Term: ${doc.data().When}</p>
          <p>Time Available: ${doc.data().TimeAvailable}</p>
        </div>
      </div>`;
    card.innerHTML = cardContent;
    // add the card to the page
    document.querySelector("#card").appendChild(card);
  });
});

// get all filter dropdowns
// const filters = document.querySelectorAll(".filter-dropdown");
// const searchBtn = document.querySelector("#searchbtn");

// // add event listener to search button
// searchBtn.addEventListener("click", () => {
//   // get selected value for each filter
//   const selectedUnit = document.querySelector("#unit-filter").value;
//   const selectedLocation = document.querySelector("#location-filter").value;
//   const selectedGradYear = document.querySelector("#grad-year-filter").value;
//   const selectedTerm = document.querySelector("#term-filter").value;

//   // get all cards
//   const cards = document.querySelectorAll(".card");

//   // loop through each card
//   cards.forEach((card) => {
//     // get data attributes for each card
//     const unit = card.getAttribute("data-unit");
//     const location = card.getAttribute("data-location");
//     const gradYear = card.getAttribute("data-grad-year");
//     const term = card.getAttribute("data-term");

//     // check if card matches selected filters
//     const unitMatch = selectedUnit === "All" || unit === selectedUnit;
//     const locationMatch = selectedLocation === "All" || location === selectedLocation;
//     const gradYearMatch = selectedGradYear === "All" || gradYear === selectedGradYear;
//     const termMatch = selectedTerm === "All" || term === selectedTerm;

//     // show or hide card based on filter selection
//     if (unitMatch && locationMatch && gradYearMatch && termMatch) {
//       card.style.display = "block";
//     } else {
//       card.style.display = "none";
//     }
//   });
// });
function search_cands(field, terms) {
  // go to the recipes collection and only fetch documents matching the search term

  db.collection("Candidate Information")
    .where(field, "==", terms)
    .get()
    .then((data) => {
      let mydocs = data.docs;
      // check if no canididates have been added yet
      if (mydocs.length == 0) {
        card.innerHTML = `<p class="has-text-centered">No candidates were found!</p>`;
        return;
      }

      let cardContent = ``;
      mydocs.forEach((doc) => {
        html += `
        <div class="card-content">
          <div class="content">
            <div class="media-content">
              <p class="title is-4">${doc.data().Name}</p>
            </div>
            <p>Email: ${doc.data().Email}</p>
            <p>Unit: ${doc.data().UnitPreference}</p>
            <p>Location: ${doc.data().PreferredLocation}</p>
            <p>Grad Year: ${doc.data().PredictedGraduationDate}</p>
            <p>Term: ${doc.data().When}</p>
            <p>Time Available: ${doc.data().TimeAvailable}</p>
          </div>
        </div>`;
        card.innerHTML = cardContent;
        //add the card to the page
        document.querySelector("#card-container").appendChild(card);
      });
    });
}
r_e("searchbtn").addEventListener("click", () => {
  // find the search term entered by the user in the search box

  let terms = document.querySelector("#choice").value;

  //find all recipes with a title matching the variable term

  search_cands("PredictedGraduationDate", terms);
});
