//cypress testing for User-Onboarding
// ### Task 2a: Write and Run Tests (MVP)

// In order to complete this challenge you will need to write and run the following tests. They do *not* need to pass, so long as the reasons they are failing is legitimate.

// Set up tests that will...

// - [ ]  Get the `Name` input and type a name in it.
// - [ ]  Use an assertion to check if the text inputted contains the name you provided (Hint: use the .should assertion)
// - [ ]  Get the `Email` input and type an email address in it
// - [ ] Get the `password` input and type a password in it
// - [ ]  Set up a test that will check to see if a user can check the terms of service box
// - [ ] Check to see if a user can submit the form data
// - [ ] Check for form validation if an input is left empty
// npx cypress open

describe('Onboarding User App', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    // our first test
    //arrange
    describe('My First Test', function () {
        //act
        it('Does not do much', function () {
            //assert
            expect(true).to.equal(true);
        })
    })

    describe('My Second Test', function () {
        //Arrange
        it('Visits a new site', function () {
            // Act
            cy.visit("http://localhost:3000");
        })
    })

    // get the name input and test that it can be typed into
    const nameInput = () => cy.get('input[name="name"]')
    it('can type in the name input', () => {
        nameInput()
            .should('have.value', '')
            .type('Hank Sheldon')
            .should('have.value', 'Hank Sheldon')
    })

    // get the email input and test that it can be typed into
    const emailInput = () => cy.get('input[name="email"]')
    it('can type in the email input', () => {
        emailInput()
            .should('have.value', '')
            .type('hank@hank.com')
            .should('have.value', 'hank@hank.com')
    })

    // get the password input and test that it can be typed into
    const pwInput = () => cy.get('input[name="password"]')
    it('can type in the assword input', () => {
        pwInput()
            .should('have.value', '')
            .type('isSuperCool')
            .should('have.value', 'isSuperCool')
    })

    // check to see if the user can check the terms
    const termsCheckbox = () => cy.get('input[name="terms"]')
    it('can check the terms checkbox', () => {
        termsCheckbox()
            .should('not.be.checked')
            .check()
            .should('be.checked')
    })

    // Check to see if a user can submit the form data
    const submitButton = () => cy.get('button[name="submit"]')
    it('can submit form when all inputs are filled', () => {
        nameInput().type("Hank")
        emailInput().type('hank@hank.com')
        pwInput().type('cookieMonster')
        termsCheckbox().check()
        // assert - use a should - that the submit button enables
        submitButton().should('be.enabled')
        cy.get('#userForm').submit()
    })

    // Check for form validation if an input is left empty
    it('fails to submit if no inputs filled and sees validation errors', () => {
        nameInput().type("Hank")
        emailInput()
            .type("cool@cool.com")
            .should('have.value', 'cool@cool.com')
        pwInput()
            .type('cool')
            .should('have.value', 'cool')
        termsCheckbox()
            .check()
            .should('be.checked')
        submitButton()
            .should('be.disabled')
        cy.get('#pwErrors')
            .should('have.text', "this must be at least 8 characters")
    })
})