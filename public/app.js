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
      mymodal.classList.remove("is-active");

      signup_form.reset();
    })
    .catch((error) => {
      let signup_error = document.querySelector("#signup_error");
      signup_error.innerHTML = `<p>${error.message}</p>`;
    });
  let user = {
    email: email,
    admin: false,
  };

  // store the object in the database
  db.collection("users")
    .add(user)
    .then(() => {});
});

let signin_form = document.querySelector("#signin_form");

signin_form.addEventListener("submit", (e) => {
  e.preventDefault();


  // grab the email and password from the form

  let email = document.querySelector("#email_").value;
  let password = document.querySelector("#password_").value;
  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredentials) => {

      // close the modal
      signinModal.classList.remove("is-active");
      // reset
      signin_form.reset();
      window.location.reload()
    })
    .catch((error) => {


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
    
    r_e("card").classList.remove("is-hidden");
    r_e("footer").classList.remove("is-hidden");
    r_e("login-message").classList.add("is-hidden");
  } else {
    
    r_e("card").classList.add("is-hidden");
    r_e("footer").classList.add("is-hidden");
    r_e("login-message").classList.remove("is-hidden");
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

    hideContentCards(); // call function to hide content cards
  });
});
// function to hide content cards
function hideContentCards() {
  let contentCards = document.querySelectorAll(".content-card");
  contentCards.forEach((card) => {
    card.classList.add("is-hidden");
  });
}

auth.onAuthStateChanged((user) => {
  if (user) {

    configureNav(user);
    // showContentCards(); // call function to show content cards
  } else {

    configureNav();
    hideContentCards(); // call function to hide content cards
  }
});

// function to show content cards
// function showContentCards() {
//   let contentCards = document.querySelectorAll(".content-card");
//   contentCards.forEach((card) => {
//     card.classList.remove("is-hidden");
//   });
// }
// end of trying to hide content cards

// reference the collection
const candidateInfoRef = db.collection("Candidate Information");

function deleteCard(card) {
  // Get the ID of the document associated with the card
  // const docId = card.getAttribute("data-id");
  let docId = card;
  // Remove the card element from the page
  // card.remove();

  // Delete the corresponding document from Firestore
  db.collection("Candidate Information")
    .doc(docId)
    .delete()
    .then(() => {

    })
    .catch((error) => {
      console.error("Error deleting document: ", error);
    });
}

let isAdmin = false;



setTimeout(() => {
  db.collection("users")
    .where("email", "==", auth.currentUser.email)
    .get()
    .then((mydata) => {
      temp(mydata.docs[0].data().admin);
    });
}, 500);

function temp(check) {
  // alert(check);

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
      card.setAttribute("id", doc.id); // add data attribute for term
      // set card content using document data
      let cardContent = `
      <div class="card-content">
        <div class="content">
          <div class="media-content">
          `;

      if (check == true) {
        cardContent += `<p> <button id="x-button" class="delete-card button is-danger is-pulled-right is-link" >X</button></p><br>`;
      }
      // <button class="edit-card button is-danger is-pulled-right is-link ">Edit</button>

      cardContent += `
          </div>
          <p class="title is-4">${doc.data().Name}
          <p>Email: <a href="mailto:${doc.data().Email}">${doc.data().Email}</a></p>
          <p>Unit: ${doc.data().UnitPreference}</p>
          <p>Location: ${doc.data().PreferredLocation}</p>
          <p>Grad Year: ${doc.data().PredictedGraduationDate}</p>
          <p>Term: ${doc.data().When}</p>
          <p>Time Available: ${doc.data().TimeAvailable}</p>
        </div>
      </div>`;
      card.innerHTML = cardContent;
      // add the card to the page

      if (check == true) {
        const deleteButton = card.querySelector(".delete-card");
        deleteButton.addEventListener("click", () => {
          deleteCard(doc.id);
          // delete.doc.id
          card.parentNode.removeChild(card);
        });
      }

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
      const selectedTerm = selectedTermFilter ?
        selectedTermFilter.value :
        "All";

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

        const termMatch =
          selectedTerm === "All" || card.dataset.term === selectedTerm;


        // check if the card matches all the selected filters
        if (unitMatch && locationMatch && gradYearMatch && termMatch) {
          card.style.display = "block"; // display the card if it matches the filters
        } else {
          card.style.display = "none"; // hide the card if it doesn't match the filters
        }
      });
    }
  });
}
// TESTING 

// import puppeteer

const puppeteer = require("puppeteer");

async function go() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 15,
  });

  const page = await browser.newPage();

  //   site the to be tested

  await page.goto("https://mycar-collection-f21.web.app/index_.html");

  //   user click the sign-in button

  await page.click("#signinbtn");

  // admin user will provide email, password, and submit 

  await page.type("#email_", "admin@admin.com");
  await page.type("#password_", "Admin123");

  await page.click("#signin_form > div:nth-child(3) > div > button");

  // test filtering functionality 

  // unit 
  await page.click("#unit-Facilities");

  // location
  await page.click("#location-Memorial-Union")

  // grad year 
  await page.click("#choice > option:nth-child(5)")

  // wait 2 seconds 
  await new Promise((r) => setTimeout(r, 2000));

  // delete first result 
  await page.click("#x-button")

  // wait 2 seconds 
  await new Promise((r) => setTimeout(r, 2000));

  // sign out 
  await page.click("#signoutbtn")

  // attempt sign up
  // wait 2 seconds 
  await new Promise((r) => setTimeout(r, 2000));

  // sign up 
  await page.click("#mybutton")

  // non-admin user will provide email, password, & submit 

  await page.type("#email", "hello@test.com");
  await page.type("#password", "test123");

  await page.click("#sum_submit");


}

// call the go()

// go();

// JavaScript code to add the message to the DOM
const loginMessage = document.createElement('div');
loginMessage.id = 'login-message';
loginMessage.classList.add('has-text-centered', 'has-background-warning');
loginMessage.innerHTML = '<p>You need to log in to view content.</p>';

const contentSection = document.querySelector('#content-section');
contentSection.insertBefore(loginMessage, footer);
