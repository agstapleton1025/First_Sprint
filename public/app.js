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
  let user = {
    email: email,
  };

  // store the object in the database
  db.collection("users")
    .add(user)
    .then(() => {});
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
let contentCards = document.querySelectorAll(".content-card");

function configure_content(user) {
  if (user) {
    r_e("l_col").classList.remove("is-hidden");
    r_e("card").classList.remove("is-hidden");
    r_e("footer").classList.remove("is-hidden");
  } else {
    r_e("l_col").classList.add("is-hidden");
    r_e("card").classList.add("is-hidden");
    r_e("footer").classList.add("is-hidden");
  }
}

function configureNav(user) {
  if (user) {
    document.querySelector(
      "#welcome_user"
    ).innerHTML = `${auth.currentUser.email}`;

    loggedinlinks.forEach((link) => {
      link.classList.remove("is-hidden");
    });

    loggedoutlinks.forEach((link) => {
      link.classList.add("is-hidden");
    });

    configure_content(user); // call function to show content cards
  } else {
    document.querySelector("#welcome_user").innerHTML = "";

    loggedoutlinks.forEach((link) => {
      link.classList.remove("is-hidden");
    });

    loggedinlinks.forEach((link) => {
      link.classList.add("is-hidden");
    });

    configure_content(user); // call function to hide content cards
  }
}

let signoutbtn = document.querySelector("#signoutbtn");

signoutbtn.addEventListener("click", () => {
  auth.signOut().then(() => {
    console.log("user signed out!");
    hideContentCards(); // call function to hide content cards
  });
});
// Lucas Attempt at hiding cards for non-users
// function to hide content cards
function hideContentCards() {
  let contentCards = document.querySelectorAll(".content-card");
  contentCards.forEach((card) => {
    card.classList.add("is-hidden");
  });
}

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("user is now signed in!");
    configureNav(user);
    showContentCards(); // call function to show content cards
  } else {
    console.log("user is now signed out!");
    configureNav();
    hideContentCards(); // call function to hide content cards
  }
});

// function to show content cards
function showContentCards() {
  let contentCards = document.querySelectorAll(".content-card");
  contentCards.forEach((card) => {
    card.classList.remove("is-hidden");
  });
}
// end of trying to hide content cards

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
            <p class="title is-4">${
              doc.data().Name
            } <button id="x_button"  class ="is-link" ">X</button></p></p>
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

  // reference the filter elements
  const unitFilter = document.getElementsByName("unit");
  const locationFilter = document.getElementsByName("location");
  const gradYearFilter = document.getElementById("choice");
  const termFilter = document.getElementsByName("term");

  // add event listeners to the filter elements
  unitFilter.forEach((filter) => {
    filter.addEventListener("change", updateFilters);
  });
  locationFilter.forEach((filter) => {
    filter.addEventListener("change", updateFilters);
  });
  gradYearFilter.addEventListener("change", updateFilters);
  termFilter.forEach((filter) => {
    filter.addEventListener("change", updateFilters);
  });

  // update the filters and display the matching results
  function updateFilters() {
    // get the selected filter values
    const selectedUnitFilters = Array.from(unitFilter)
      .filter((filter) => filter.checked)
      .map((filter) => filter.value);
    const selectedLocationFilters = Array.from(locationFilter)
      .filter((filter) => filter.checked)
      .map((filter) => filter.value);
    const selectedGradYear = gradYearFilter.value;
    const selectedTermFilter = Array.from(termFilter).find(
      (filter) => filter.checked
    );
    const selectedTerm = selectedTermFilter ? selectedTermFilter.value : "All";

    // filter the cards based on the selected filters
    const cards = Array.from(document.querySelectorAll(".card"));

    cards.forEach((card) => {
      const unitMatch =
        selectedUnitFilters.length === 0 ||
        selectedUnitFilters.some((filter) =>
          card.dataset.unit.includes(filter)
        );
      const locationMatch =
        selectedLocationFilters.length === 0 ||
        selectedLocationFilters.some((filter) =>
          card.dataset.location.includes(filter)
        );
      const gradYearMatch =
        selectedGradYear === "All" ||
        card.dataset.gradYear === selectedGradYear;
      console.log(card.dataset.gradYear, selectedGradYear);
      const termMatch =
        selectedTerm === "All" || card.dataset.term === selectedTerm;
      console.log(card.dataset.term, selectedTerm);

      // check if the card matches all the selected filters
      if (unitMatch && locationMatch && gradYearMatch && termMatch) {
        card.style.display = "block"; // display the card if it matches the filters
      } else {
        card.style.display = "none"; // hide the card if it doesn't match the filters
      }
    });
  }
});
