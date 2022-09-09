import * as cypress from 'cypress'

describe('app', () => {
  const host = 'http://localhost:3000'

  beforeEach(() => {
    cy.window().then(win => win.sessionStorage.clear())
    cy.clearLocalStorage()
    cy.clearCookies()
  })

  describe('authentication', () => {
    describe('sign-up', () => {
      it('should sign up a new user', () => {
        cy.visit(host)
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
        cy.contains(name)
      })
    })
  })

  describe('foods', () => {
    it('should can see a list of foods', () => {
      cy.visit(host)
      cy.contains('Alimentos').click()
      cy.url().should('include', '/foods')
      cy.contains('Banana')
      cy.contains('5')
      cy.contains('Maçã')
      cy.contains('14')
      cy.contains('Mamão')
      cy.contains('7')
    })
  })
})