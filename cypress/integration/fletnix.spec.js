describe('Navigate to Movie', () => {
  it('should navigate to Incredibles 2', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    // Navigate to the Incredibles 2 video page
    cy.get('a[href*="/videos/624d7d8d2324f164ebf6fa9b"]').click()

    // Make sure we got there
    cy.url().should('include', '/videos/624d7d8d2324f164ebf6fa9b')

    // The page should contain the title
    cy.get('h1').contains('Incredibles 2')
  })
})

describe('Login on Movie Page', () => {
  it('should navigate to Incredibles 2, login, and verify the video is there', () => {
    // Start from the Incredibles 2 page
    cy.visit('http://localhost:3000/videos/624d7d8d2324f164ebf6fa9b')

    // Verify that the video isn't exposed before logging in
    cy.get('h1').contains('Incredibles 2')
    cy.get('video[src*="https://storage.googleapis.com/fletnix-dev/videos/624d7d8d2324f164ebf6fa9b.mp4"]').should('not.exist')

    // Find a link with an href attribute containing "about" and click it
    cy.get('input[name*="username"]').type('viewer')
    cy.get('input[name*="password"]').type('viewer')
    cy.get('button[class="form_button"]').click()

    // Make sure we are still on the video page after logging in
    cy.url().should('include', '/videos/624d7d8d2324f164ebf6fa9b')

    // Verify that the video is now exposed.
    cy.get('h1').contains('Incredibles 2')
    cy.get('video[src*="https://storage.googleapis.com/fletnix-dev/videos/624d7d8d2324f164ebf6fa9b.mp4"]')
  })
})

describe('Login on Home Page', () => {
  it('should navigate to home page, login, then navigate to Incredibles 2 and make sure it exists', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    // Find the signin button under the profile menu
    cy.get('div[id*="menu"]').click()
    cy.get('a[class*="signin"]').click()
    
    // Fill out the login form and submit it
    cy.get('input[name*="username"]').type('viewer')
    cy.get('input[name*="password"]').type('viewer')
    cy.get('button[class="form_button"]').click()

    // Click on the Incredibles 2 movie
    cy.get('a[href*="/videos/624d7d8d2324f164ebf6fa9b"]').click()

    // Make sure we got there
    cy.url().should('include', '/videos/624d7d8d2324f164ebf6fa9b')

    // Find the link to the video which only exists when logged in
    cy.get('h1').contains('Incredibles 2').should('be.visible')
    cy.get('video[src*="https://storage.googleapis.com/fletnix-dev/videos/624d7d8d2324f164ebf6fa9b.mp4"]')
  })
})

describe('Login on dashboard without authorized role', () => {
  it('should navigate to dashboard and login with viewer account', () => {
    // navigate to the dashboard page
    cy.visit('http://localhost:3000/dashboard')

    // Make sure we got there
    cy.url().should('include', '/dashboard')
    
    // Fill out the login form and submit it
    cy.get('input[name*="username"]').type('viewer')
    cy.get('input[name*="password"]').type('viewer')
    cy.get('button[class="form_button"]').click()

    // verify that we were sent back to the home page
    cy.url().should('not.include', '/dashboard');
  })
})

describe('Login on dashboard with content_editor role', () => {
  it('should navigate to dashboard and login with editor account', () => {
    // navigate to the dashboard page
    cy.visit('http://localhost:3000/dashboard')

    // Make sure we got there
    cy.url().should('include', '/dashboard')
    
    // Fill out the login form and submit it
    cy.get('input[name*="username"]').type('editor')
    cy.get('input[name*="password"]').type('editor')
    cy.get('button[class="form_button"]').click()

    // Find the dashboard button in the menu
    cy.get('div[id*="menu"]').click()
    cy.get('a[class*="dashboard"]').click()

    // Verify the upload form and delete option are available
    cy.get('label').contains('Select the Video File')
    cy.get('th[id*="delete_col"]')
    
    // Verify the views and ratings are not available
    cy.get('th[id*="views_col"]').should('not.exist')
    cy.get('th[id*="ratings_col"]').should('not.exist')

    cy.get('p').contains('Incredibles')
    cy.get('p').contains('Iron Man')
    cy.get('p').contains('Iron Man 2')
  })
})

describe('Login on dashboard with content_manager role', () => {
  it('should navigate to dashboard and login with manager account', () => {
    // navigate to the dashboard page
    cy.visit('http://localhost:3000/dashboard')

    // Make sure we got there
    cy.url().should('include', '/dashboard')
    
    // Fill out the login form and submit it
    cy.get('input[name*="username"]').type('manager')
    cy.get('input[name*="password"]').type('manager')
    cy.get('button[class="form_button"]').click()

    // Find the dashboard button in the menu
    cy.get('div[id*="menu"]').click()
    cy.get('a[class*="dashboard"]').click()

    // Verify the upload form and delete option are available
    cy.get('label').should('not.exist')
    cy.get('th[id*="delete_col"]').should('not.exist')
    
    // Verify the views and ratings are not available
    cy.get('th[id*="views_col"]')
    cy.get('th[id*="rating_col"]')

    cy.get('p').contains('Incredibles')
    cy.get('p').contains('Iron Man')
    cy.get('p').contains('Avengers')
  })
})

/* Tests TODO:
 * -----------
 * upload -> check role, field validation, file types, existance after
 * delete -> check role, doesn't exist after
 * ratings -> multiple ratings should count latest only + correct averaging
 * views -> increments after every video page load
 */