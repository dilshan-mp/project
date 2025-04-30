describe('Seller Registration Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/seller-registration'); // Adjust this path if needed
  });

  it('should render step 1 (Business Info) by default', () => {
    cy.contains('Business Information').should('be.visible');
  });

  it('should validate required fields on step 1', () => {
    cy.contains('Next Step').click();
    cy.contains('Business name is required').should('exist');
    cy.contains('Business email is required').should('exist');
    cy.contains('Phone number is required').should('exist');
    cy.contains('Business type is required').should('exist');
    cy.contains('Tax ID is required').should('exist');
  });

  it('should show email validation error for invalid format', () => {
    cy.get('input[placeholder="business@example.com"]').type('invalid-email');
    cy.contains('Next Step').click();
    cy.contains('Invalid email address').should('exist');
  });

  it('should proceed to step 2 after valid step 1 inputs', () => {
    cy.get('input[placeholder="Your Business Name"]').type('Test Co');
    cy.get('input[placeholder="business@example.com"]').type('test@example.com');
    cy.get('input[placeholder="(555) 123-4567"]').type('5551234567');
    cy.get('select').eq(0).select('llc');
    cy.get('input[placeholder="XX-XXXXXXX"]').type('12-3456789');
    cy.contains('Next Step').click();
    cy.contains('Business Address').should('be.visible');
  });

  it('should validate required fields on step 2', () => {
    cy.contains('Next Step').click();
    cy.contains('Address is required').should('exist');
    cy.contains('City is required').should('exist');
    cy.contains('State is required').should('exist');
    cy.contains('Zip code is required').should('exist');
    cy.contains('Country is required').should('exist');
  });

  it('should go back to step 1 using Back button', () => {
    cy.contains('Back').click();
    cy.contains('Business Information').should('exist');
  });

  it('should proceed to step 3 with valid step 2 data', () => {
    cy.get('input[placeholder="123 Business Street"]').type('123 Main St');
    cy.get('input[placeholder="City"]').type('Colombo');
    cy.get('input[placeholder="State"]').type('Western');
    cy.get('input[placeholder="12345"]').type('12345');
    cy.get('select').eq(1).select('US');
    cy.contains('Next Step').click();
    cy.contains('Additional Information').should('exist');
  });

  it('should allow user to type business description', () => {
    cy.get('textarea').type('We sell eco-friendly products');
    cy.get('textarea').should('have.value', 'We sell eco-friendly products');
  });

  it('should submit the form after all steps', () => {
    cy.get('textarea').type('Great business');
    cy.intercept('POST', '/api/seller-register', { statusCode: 200 }).as('register'); // if API exists
    cy.contains('Submit').click();
    cy.contains('Registration submitted successfully!').should('exist');
  });

  it('should show toast error on submission failure', () => {
    // Simulate API failure
    cy.window().then((win) => {
      win.fetch = () => Promise.reject(new Error('Submission failed'));
    });
    cy.contains('Submit').click();
    cy.contains('Failed to submit registration').should('exist');
  });
    
    it('should require agreement to terms before submission', () => {
  cy.get('textarea').type('Business description here');

  // Try to submit without agreeing
  cy.contains('Submit').click();
  cy.contains('You must agree to the terms').should('exist');

  // Now agree and submit
  cy.get('input[type="checkbox"][name="agree"]').check(); // Update selector if it's a radio or different attribute
  cy.contains('Submit').click();
  cy.contains('Registration submitted successfully!').should('exist');
});

});
