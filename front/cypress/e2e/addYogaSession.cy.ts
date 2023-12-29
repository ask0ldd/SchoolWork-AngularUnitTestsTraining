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
  
      cy.url().should('include', '/sessions')

      cy.get('button[routerlink=create]').click()

      cy.get('input[formControlName=name]').should('exist').type("yoga fire")
      cy.get('input[formControlName=date]').should('exist').type("2026-06-10")
      cy.get('mat-select[formControlName=teacher_id]').should('exist').click()
      cy.contains('span.mat-option-text', ' Hélène THIERCELIN ').click()
    })


  });