// @ts-nocheck
describe('Login spec', () => {
  it('Login successfull', () => {
    cy.visit('/login')

    cy.intercept('POST', '/api/auth/login', {
      body: {
        id: 1,
        username: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        admin: true
      },
    })

    cy.intercept(
      {
        method: 'GET',
        url: '/api/session',
      },
    []).as('session')

    cy.get('input[formControlName=email]').type("yoga@studio.com")
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)

    /*cy.findByLabelText("email").type("yoga@studio.com")
    cy.findByLabelText("password").type(`${"test!1234"}{enter}{enter}`)*/

    cy.url().should('include', '/sessions')
  })

  it('Logout', () => {
    cy.contains('span', 'Logout').click()

    cy.contains('span', 'Login').should('exist')

    cy.url().should('equal', 'http://localhost:4200/')
  })

  it('Login failing', () => {

  })
});