import * as cypress from 'cypress'

describe('app', () => {
  describe('foods', () => {
    it('should can see a list of foods', () => {
      cy.visit('http://localhost:3000')
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