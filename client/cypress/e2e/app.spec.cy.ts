import * as cypress from 'cypress'

describe('app', () => {
  const host = 'http://localhost:3000'

  beforeEach(() => {
    cy.window().then(win => win.sessionStorage.clear())
    cy.clearLocalStorage()
    cy.clearCookies()
  })

  describe('authentication', () => {
    it('should sign up, sign out, sign in and sign out again with new user', () => {
      cy.visit(`${host}/manager`)
      cy.get('a').contains('Entrar').should('not.be.disabled').click()
      cy.url().should('include', '/auth/sign-in')
      cy.get('a').contains('Cadastre-se').should('not.be.disabled').click()
      cy.url().should('include', '/auth/sign-up')

      const name = Date.now().toString()
      cy.get('#name').type(name)
      cy.get('#email').type(`${name}@gmail.com`)
      cy.get('#password').type('12345678')
      cy.get('#confirmed-password').type('12345678')
      cy.get('button').contains('Cadastrar').click()

      cy.url().should('be.eq', `${host}/`)
      cy.visit(`${host}/manager`)
      cy.get('.user-menu-list').should('not.be.visible')
      cy.get('.user-menu-button').contains(name)
      cy.get('.user-menu-button').contains('Usuário')
      cy.get('.user-menu-button').click()
      cy.get('.user-menu-list').should('be.visible').get('button').contains('Sair').click()
      cy.get('.sign-out-alert-dialog').should('be.visible')
      cy.get('.sign-out-alert-dialog').contains('Sair da conta')
      cy.get('.sign-out-alert-dialog').contains('Você tem certeza que deseja sair da sua conta?')
      cy.get('.sign-out-alert-dialog').get('button').contains('Cancelar').should('not.be.disabled')
      cy.get('.confirm-user-sign-out-button').contains('Sair').should('not.be.disabled').should('be.visible').click()

      cy.url().should('be.eq', `${host}/manager`)
      cy.get('a').contains('Entrar').should('not.be.disabled').click()
      cy.url().should('include', '/auth/sign-in')
      cy.get('#email').type(`${name}@gmail.com`)
      cy.get('#password').type('12345678')
      cy.get('button').contains('Entrar').click()

      cy.url().should('be.eq', `${host}/`)
      cy.visit(`${host}/manager`)
      cy.get('.user-menu-button').click()
      cy.get('.user-menu-list').should('be.visible').get('button').contains('Sair').click()
      cy.get('.confirm-user-sign-out-button').contains('Sair').should('not.be.disabled').should('be.visible').click()
      cy.url().should('be.eq', `${host}/manager`)
      cy.get('a').contains('Entrar').should('not.be.disabled').should('be.visible')
    })
  })
})