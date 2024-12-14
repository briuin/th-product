
describe('CRUD Products End-to-End', () => {
    const apiUrl = `${Cypress.env('apiUrl')}/products`; 
    const productListUrl = `/`;
  
    beforeEach(() => {
      cy.visit(productListUrl); 
    });
  
    it('Should create a new product', () => {
      cy.get('[data-spec="open-create-product-button"]').click();
  
      // Fill the form
      cy.get('[data-spec="create-product-name"]').type('Test Product');
      cy.get('[data-spec="create-product-type"]').type('Electronics');
      cy.get('[data-spec="create-product-price"]').type('99.99');
      cy.get('[data-spec="create-product-description"]').type('This is a test product.');
  
      // Upload an image
      const fileName = 'test-image.png';
      cy.get('[data-spec="create-product-image"]').attachFile(fileName);
  
      // Submit the form
      cy.get('[data-spec="create-product-button-save"]').click();
  
      // Verify the product is added
      cy.contains('Test Product').should('be.visible');
    });
  
    it('Should update an existing product', () => {
      // Click on a product to view details
      cy.get('[data-spec="view-product-detail-button"]').click();
      cy.get('[data-spec="product-detail-edit-button"]').click();
  
      // Edit the product
      cy.get('[data-spec="product-detail-name"]').clear().type('Updated Product');
      cy.get('[data-spec="product-detail-save-button"]').click();
  
      // Verify the product is updated
      cy.contains('Updated Product').should('be.visible');
    });
  
    it('Should list products', () => {
      // Verify that the product list is displayed
      cy.get('[data-spec="product-item"]').should('have.length.greaterThan', 0);
    });
  });
  