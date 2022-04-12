describe('Navigate to Movie', () => {
  it('should navigate to Incredibles 2', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="/videos/624d7d8d2324f164ebf6fa9b"]').click()

    // The new url should include "/about"
    cy.url().should('include', '/videos/624d7d8d2324f164ebf6fa9b')

    // The new page should contain an h1 with "About page"
    cy.get('h1').contains('Incredibles 2')
  })
})

describe('Login on Movie Page', () => {
  it('should navigate to Incredibles 2 and login', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/videos/624d7d8d2324f164ebf6fa9b')

    // Find a link with an href attribute containing "about" and click it
    cy.get('input[name*="username"]').type('viewer')
    cy.get('input[name*="password"]').type('viewer')
    cy.get('button[class="form_button"]').click()

    // The new url should include "/about"
    cy.url().should('include', '/videos/624d7d8d2324f164ebf6fa9b')

    // The new page should contain an h1 with "About page"
    cy.get('h1').contains('Incredibles 2')
    cy.get('video[src="https://storage.googleapis.com/fletnix-dev/videos/624d7d8d2324f164ebf6fa9b.mp4"]')
  })
})

describe('Login on Home Page', () => {
  it('should navigate to home page, login, then navigate to Incredibles 2', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    cy.get('#headlessui-menu-button-1 > .h-6').click()
    cy.get('#headlessui-menu-item-9').click()
    
    // Find a link with an href attribute containing "about" and click it
    cy.get('input[name*="username"]').type('viewer')
    cy.get('input[name*="password"]').type('viewer')
    cy.get('button[class="form_button"]').click()

    // Find a link with an href attribute containing "about" and click it
    cy.get('a[href*="/videos/624d7d8d2324f164ebf6fa9b"]').click()

    // The new url should include "/about"
    cy.url().should('include', '/videos/624d7d8d2324f164ebf6fa9b')

    // The new page should contain an h1 with "About page"
    cy.get('h1').contains('Incredibles 2')
    cy.get('video[src="https://storage.googleapis.com/fletnix-dev/videos/624d7d8d2324f164ebf6fa9b.mp4"]')
  })
})