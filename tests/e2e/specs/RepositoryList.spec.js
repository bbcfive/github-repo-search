describe('Repository List', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/search/repositories*', { fixture: 'repositories.json' }).as('getRepositories')
    cy.visit('/')
  })

  it('displays repositories and allows language switching', () => {
    cy.wait('@getRepositories')
    cy.get('.repo-item').should('have.length.gt', 0)
    cy.get('.language-tag').first().should('have.class', 'bg-blue-500')
    cy.get('.repo-item').first().should('contain', 'JS Repo')

    cy.get('.language-tag').eq(1).click()
    cy.get('.repo-item').first().should('contain', 'Python Repo')
  })

  it('loads more repositories when "Load More" is clicked', () => {
    cy.wait('@getRepositories')
    cy.get('.repo-item').then($items => {
      const initialCount = $items.length
      cy.get('.load-more-btn').click()
      cy.get('.repo-item').should('have.length.gt', initialCount)
    })
  })

  it('displays loading state and then repositories', () => {
    cy.get('.animate-spin').should('be.visible')
    cy.get('.repo-item', { timeout: 10000 }).should('be.visible')
    cy.get('.animate-spin').should('not.exist')
  })

  it('displays error message when API call fails', () => {
    cy.intercept('GET', '**/search/repositories*', { statusCode: 500, body: 'Server error' }).as('getRepositoriesError')
    cy.visit('/')
    cy.wait('@getRepositoriesError')
    cy.get('.text-red-600').should('contain', 'An error occurred')
  })
})