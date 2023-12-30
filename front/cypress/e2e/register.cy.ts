// @ts-nocheck
describe('Register spec', () => {
    it('Register successfull', () => {
      cy.visit('/register')

      const fn = "john"
      const ln = "doe"
      const email = "john.doe@email.com"
      const password = "mockpassword"

      cy.intercept('POST', '/api/auth/register', {
        body: {
            email: email,
            firstName: fn,
            lastName: ln,
            password: password,
        },
      })
   
      cy.get('input[formControlName=firstName]').type(fn)
      cy.get('input[formControlName=lastName]').type(ln)
      cy.get('input[formControlName=email]').type(email)
      cy.get('input[formControlName=password]').type(password)

      cy.contains('span', 'Submit').click()
  
      cy.url().should('include', '/login')

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
  
      cy.url().should('include', '/sessions')
    })
  });