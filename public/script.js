// TESTING 

// import puppeteer

const puppeteer = require('puppeteer');

async function go() {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 15,
    });

    const page = await browser.newPage();

    //   site the to be tested

    await page.goto("https://unioncandidatetracker.web.app/indexproject.html");

    //   user click the sign-in button

    await page.click("#signinbtn");

    // admin user will provide email, password, and submit 

    await page.type("#email_", "admin@admin.com");
    await page.type("#password_", "Admin123");

    await new Promise((r) => setTimeout(r, 2000));
    await page.click("#signin_form > div:nth-child(3) > div > button");

    // test filtering functionality 
    await new Promise((r) => setTimeout(r, 2000));
    // unit 
    await page.click("#unit-Facilities");

    // location
    await page.click("#location-Memorial-Union")

    // grad year 
    await page.select('#choice', 'Fall 2025')

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

    //     // sign up 
    await page.click("#mybutton")

    //     // non-admin user will provide email, password, & submit 

    await page.type("#email", "hello@test.com");
    await page.type("#password", "test123");

    await page.click("#sum_submit");


}

// call the go()

go();