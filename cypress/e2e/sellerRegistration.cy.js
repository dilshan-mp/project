describe('Seller Registration Form', () => {
  beforeEach(() => {
    cy.visit('/seller-registration'); // Adjust this path if needed
  });

  it('should render step 1 (Business Info) by default', () => {
    cy.contains('Business Information').should('be.visible');
  });

  it('should validate required fields on step 1', () => {
    cy.contains('Next: Address').click();
    cy.contains('Business name is required').should('exist');
    cy.contains('Business email is required').should('exist');
    cy.contains('Phone number is required').should('exist');
    cy.contains('Business type is required').should('exist');
    cy.contains('Tax ID is required').should('exist');
  });

  it('should show email validation error for invalid format', () => {
    cy.get('input[placeholder="business@example.com"]').type('invalid-email');
    cy.contains('Next: Address').click();
    cy.contains('Invalid email address').should('exist');
  });

  it('should proceed to step 2 after valid step 1 inputs', () => {
    cy.get('input[placeholder="Your Business Name"]').type('Test Co');
    cy.get('input[placeholder="business@example.com"]').type('test@example.com');
    cy.get('input[placeholder="(555) 123-4567"]').type('5551234567');
    cy.get('select').eq(0).select('llc');
    cy.get('input[placeholder="XX-XXXXXXX"]').type('12-3456789');
    cy.contains('Next: Address').click();
    cy.contains('Business Address').should('be.visible');
  });

  it('should validate required fields on step 2', () => {
    // First, navigate to step 2
    cy.get('input[placeholder="Your Business Name"]').type('Test Co');
    cy.get('input[placeholder="business@example.com"]').type('test@example.com');
    cy.get('input[placeholder="(555) 123-4567"]').type('5551234567');
    cy.get('select').eq(0).select('llc');
    cy.get('input[placeholder="XX-XXXXXXX"]').type('12-3456789');
    cy.contains('Next: Address').click();
    
    // Now try to proceed to step 3 without entering required fields
    cy.contains('Next: Additional Info').click();
    cy.contains('Address is required').should('exist');
    cy.contains('City is required').should('exist');
    cy.contains('State/Province is required').should('exist');
    cy.contains('Zip/Postal code is required').should('exist');
    cy.contains('Country is required').should('exist');
  });

  it('should go back to step 1 using Back button', () => {
    // First, navigate to step 2
    cy.get('input[placeholder="Your Business Name"]').type('Test Co');
    cy.get('input[placeholder="business@example.com"]').type('test@example.com');
    cy.get('input[placeholder="(555) 123-4567"]').type('5551234567');
    cy.get('select').eq(0).select('llc');
    cy.get('input[placeholder="XX-XXXXXXX"]').type('12-3456789');
    cy.contains('Next: Address').click();
    
    // Now go back
    cy.contains('Back').click();
    cy.contains('Business Information').should('exist');
  });

  it('should proceed to step 3 with valid step 2 data', () => {
    // First navigate to step 2
    cy.get('input[placeholder="Your Business Name"]').type('Test Co');
    cy.get('input[placeholder="business@example.com"]').type('test@example.com');
    cy.get('input[placeholder="(555) 123-4567"]').type('5551234567');
    cy.get('select').eq(0).select('llc');
    cy.get('input[placeholder="XX-XXXXXXX"]').type('12-3456789');
    cy.contains('Next: Address').click();
    
    // Now enter step 2 data and proceed
    cy.get('input[placeholder="123 Business Street"]').type('123 Main St');
    cy.get('input[placeholder="City"]').type('Colombo');
    cy.get('input[placeholder="State / Province"]').type('Western');
    cy.get('input[placeholder="12345"]').type('12345');
    cy.get('select').eq(0).select('US');
    cy.contains('Next: Additional Info').click();
    cy.contains('Additional Information').should('exist');
  });

  it('should validate required fields on step 3', () => {
    // Navigate to step 3
    // Step 1
    cy.get('input[placeholder="Your Business Name"]').type('Test Co');
    cy.get('input[placeholder="business@example.com"]').type('test@example.com');
    cy.get('input[placeholder="(555) 123-4567"]').type('5551234567');
    cy.get('select').eq(0).select('llc');
    cy.get('input[placeholder="XX-XXXXXXX"]').type('12-3456789');
    cy.contains('Next: Address').click();
    
    // Step 2
    cy.get('input[placeholder="123 Business Street"]').type('123 Main St');
    cy.get('input[placeholder="City"]').type('Colombo');
    cy.get('input[placeholder="State / Province"]').type('Western');
    cy.get('input[placeholder="12345"]').type('12345');
    cy.get('select').eq(0).select('US');
    cy.contains('Next: Additional Info').click();
    
    // Now try to submit without required fields
    cy.contains('Submit Registration').click();
    cy.contains('Business description is required').should('exist');
    cy.contains('You must agree to the terms and conditions').should('exist');
  });

  it('should allow user to type business description', () => {
    // Navigate to step 3
    // Step 1
    cy.get('input[placeholder="Your Business Name"]').type('Test Co');
    cy.get('input[placeholder="business@example.com"]').type('test@example.com');
    cy.get('input[placeholder="(555) 123-4567"]').type('5551234567');
    cy.get('select').eq(0).select('llc');
    cy.get('input[placeholder="XX-XXXXXXX"]').type('12-3456789');
    cy.contains('Next: Address').click();
    
    // Step 2
    cy.get('input[placeholder="123 Business Street"]').type('123 Main St');
    cy.get('input[placeholder="City"]').type('Colombo');
    cy.get('input[placeholder="State / Province"]').type('Western');
    cy.get('input[placeholder="12345"]').type('12345');
    cy.get('select').eq(0).select('US');
    cy.contains('Next: Additional Info').click();
    
    // Test textarea
    cy.get('textarea').type('We sell eco-friendly products');
    cy.get('textarea').should('have.value', 'We sell eco-friendly products');
  });

  it('should submit the form after all steps completed', () => {
    // Navigate to step 3
    // Step 1
    cy.get('input[placeholder="Your Business Name"]').type('Test Co');
    cy.get('input[placeholder="business@example.com"]').type('test@example.com');
    cy.get('input[placeholder="(555) 123-4567"]').type('5551234567');
    cy.get('select').eq(0).select('llc');
    cy.get('input[placeholder="XX-XXXXXXX"]').type('12-3456789');
    cy.contains('Next: Address').click();
    
    // Step 2
    cy.get('input[placeholder="123 Business Street"]').type('123 Main St');
    cy.get('input[placeholder="City"]').type('Colombo');
    cy.get('input[placeholder="State / Province"]').type('Western');
    cy.get('input[placeholder="12345"]').type('12345');
    cy.get('select').eq(0).select('US');
    cy.contains('Next: Additional Info').click();
    
    // Complete step 3 and submit
    cy.get('textarea').type('We sell eco-friendly products for homes and offices. Our mission is to reduce waste and promote sustainability.');
    cy.get('#terms').check();
    cy.intercept('POST', '/api/seller-register', { statusCode: 200 }).as('register'); // if API exists
    cy.contains('Submit Registration').click();
    // Add a wait or assertion depending on how your toast appears
    cy.contains('Registration submitted successfully!', { timeout: 10000 }).should('exist');
  });

  it('should show toast error on submission failure', () => {
    // Navigate to step 3 and fill out required fields
    // Step 1
    cy.get('input[placeholder="Your Business Name"]').type('Test Co');
    cy.get('input[placeholder="business@example.com"]').type('test@example.com');
    cy.get('input[placeholder="(555) 123-4567"]').type('5551234567');
    cy.get('select').eq(0).select('llc');
    cy.get('input[placeholder="XX-XXXXXXX"]').type('12-3456789');
    cy.contains('Next: Address').click();
    
    // Step 2
    cy.get('input[placeholder="123 Business Street"]').type('123 Main St');
    cy.get('input[placeholder="City"]').type('Colombo');
    cy.get('input[placeholder="State / Province"]').type('Western');
    cy.get('input[placeholder="12345"]').type('12345');
    cy.get('select').eq(0).select('US');
    cy.contains('Next: Additional Info').click();
    
    // Complete step 3
    cy.get('textarea').type('We sell eco-friendly products for homes and offices.');
    cy.get('#terms').check();
    
    // Simulate API failure
    cy.intercept('POST', '/api/seller-register', {
      statusCode: 500,
      body: { error: 'Server error' }
    }).as('registerFail');
    
    cy.contains('Submit Registration').click();
    cy.contains('Failed to submit registration', { timeout: 10000 }).should('exist');
  });
});