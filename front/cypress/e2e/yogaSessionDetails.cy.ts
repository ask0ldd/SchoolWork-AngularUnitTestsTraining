describe('Yoga Session Details spec', () => {
    it('Display Yoga Session Details', () => {
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
  
      cy.intercept('GET', '/api/session', { fixture: 'session.json' }).as('sessions')
  
      cy.get('input[formControlName=email]').type("yoga@studio.com")
      cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)
  
      cy.url().should('include', '/sessions')

      cy.contains('mat-card-title', 'Rentals available').should('exist')
      cy.contains('mat-card-title', 'yoga fire').should('exist')
      cy.contains('p', 'yoga fire description').should('exist')
      cy.contains('mat-card-subtitle', 'December 29, 2024').should('exist')

      cy.get('img[src="assets/sessions.png"]').should('exist')

      })
  });