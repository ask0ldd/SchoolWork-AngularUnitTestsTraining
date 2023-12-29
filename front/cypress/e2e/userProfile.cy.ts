describe('User Profile spec', () => {
    it('Access User Profile', () => {
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

        cy.url().should('include', '/sessions')

        /*cy.intercept(
        {
            method: 'GET',
            url: '/api/user/1',
        },
        []).as('user')*/
        cy.intercept('GET', '/api/user/*', { fixture: 'user.json' }).as('user')

        cy.contains('span', 'Account').click()

        cy.wait('@user').then((interception) => {
            cy.contains('p', 'Name: admin ADMIN').should('exist')
            cy.contains('p', 'Email: john.doe@email.com').should('exist')
            cy.contains('p', 'You are admin').should('exist')
            cy.contains('p', 'December 29, 2023').should('exist')
        })
    })
  });