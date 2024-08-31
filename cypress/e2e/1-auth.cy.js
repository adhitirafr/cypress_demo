describe('authentification', () => {

  let web_url
  let user
  let messages

  //-- use before as preparation to run all test case
  // just run once
  before(() => {
    web_url = Cypress.env('web_url');
    user = Cypress.env('user');
    messages = cy.fixture('messages').then((data) => {
      messages = data
    })
  })

  describe('user login', () => {

    //-- use beforeEach to do this each 'it' called
    beforeEach(() => {
      cy.visit(web_url)
    })

    it('should not pass because not filled email and password', () => {

      //-- cy.login is a custom command, created in cypress/e2e/support/commands.js
      cy.login('', '')

      //-- part for validate the result
      cy.get('#error').should('exist').contains(messages.login.blank)
    })

    it('should not pass because wrong format email', () => {

      //-- cy.login is a custom command, created in cypress/e2e/support/commands.js
      cy.login('a@a', '111')

      //-- part for validate the result
      cy.get('#error').should('exist').contains(messages.login.invalid_email)
    })

    it('should not pass because wrong authentification', () => {

      //-- cy.login is a custom command, created in cypress/e2e/support/commands.js
      cy.login('a@a.com', '111')

      //-- part for validate the result
      cy.get('#error').should('exist').contains(messages.login.invalid_auth)
    })

    it('shoud pass because authentification true', () => {
      cy.login(user.email, user.password)

      //-- part for validate the result
      cy.url().should("include", "/dashboard")
      cy.get('h3').should('exist').contains('Memo')
    })



  })

})