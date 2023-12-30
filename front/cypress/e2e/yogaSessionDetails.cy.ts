// @ts-nocheck
describe('Yoga Session Details spec', () => {
    it('Should display target yoga session details', () => {
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
  
      cy.intercept('GET', '/api/session', { fixture: 'sessions.json' }).as('sessions')
  
      cy.get('input[formControlName=email]').type("yoga@studio.com")
      cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)
  
      cy.url().should('include', '/sessions')

      cy.contains('mat-card-title', 'Rentals available').should('exist')
      cy.contains('mat-card-title', 'yoga fire').should('exist')
      cy.contains('p', 'yoga fire description').should('exist')
      cy.contains('mat-card-subtitle', 'December 29, 2024').should('exist')

      cy.get('img[src="assets/sessions.png"]').should('exist')

      cy.intercept('GET', '/api/session/*', { fixture: 'session.json' }).as('session')
      cy.intercept('GET', '/api/teacher/*', { fixture: 'teacher.json' }).as('teacher')

      cy.get('button[ng-reflect-router-link="detail,1"]').should('exist').click()

      cy.url().should('include', 'detail')

      cy.contains('div.description', 'yoga fire description').should('exist')
      cy.contains('span', 'December 29, 2024').should('exist')
      cy.contains('button', 'Delete').should('exist')
      cy.contains('span', 'teacher1 LASTNAME1').should('exist')
      cy.contains('span', '1 attendees').should('exist')
      })

      it('Back button', () => {
        cy.intercept('GET', '/api/session', { fixture: 'sessions.json' }).as('sessions')
        cy.contains('button', 'arrow_back').should('exist').click()

        cy.url().should('include', '/sessions')

        cy.contains('mat-card-title', 'Rentals available').should('exist')
        cy.contains('mat-card-title', 'yoga fire').should('exist')
        cy.contains('p', 'yoga fire description').should('exist')
        cy.contains('mat-card-subtitle', 'December 29, 2024').should('exist')
      })

      it('Should be editable & display the expected datas', () => {
        cy.intercept('GET', '/api/session/*', { fixture: 'session.json' }).as('session')
        cy.intercept('GET', '/api/teacher/*', { fixture: 'teacher.json' }).as('teacher')

        cy.get('button[ng-reflect-router-link="update,1"]').should('exist').click()

        cy.get('input[formControlName=name]').should('exist')
        cy.get('input[formControlName=date]').should('exist')
        cy.get('mat-select[formControlName=teacher_id]').should('exist')
        // cy.get('#mat-option-1').should('exist')
        cy.get('textarea[formControlName=description]').should('exist')
      })
  });