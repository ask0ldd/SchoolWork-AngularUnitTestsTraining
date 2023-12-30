// @ts-nocheck
describe('Yoga Session Add spec', () => {
    it('Can Add then Display a Yoga Session', () => {
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

      cy.intercept('GET', '/api/teacher', { fixture: 'teachers.json' }).as('teachers')

      cy.get('button[routerlink=create]').click()

      cy.url().should('include', '/sessions/create')

      cy.get('input[formControlName=name]').should('exist').type("yoga fire")
      cy.get('input[formControlName=date]').should('exist').type("2026-06-10")
      cy.get('mat-select[formControlName=teacher_id]').should('exist').click()
      cy.get('#mat-option-1').should('exist').click()
      cy.get('textarea[formControlName=description]').should('exist').type("description")

      cy.intercept('POST', '/api/session', {
        body: {
          id: 2,
          date : "2024-12-29 01:07:22",
          teacher_id : 1,
          description : "yoga fire description",
          users : [1],
          createdAt : "2023-12-29 01:07:22",
          updatedAt : "2023-12-29 01:07:22"
        }
      })

      cy.intercept('GET', '/api/session', { fixture: 'sessions.json' }).as('sessions')

      cy.get('button[type=submit]').should('exist').click()

      cy.contains('mat-card-title', 'Rentals available').should('exist')
      cy.contains('mat-card-title', 'yoga fire').should('exist')
      cy.contains('p', 'yoga fire description').should('exist')
      cy.contains('mat-card-subtitle', 'December 29, 2024').should('exist')

      cy.get('img[src="assets/sessions.png"]').should('exist')

      })
  });