describe('Product List Functionalities', () => {
    const apiUrl = `${Cypress.env('apiUrl')}/products`; 
    const productListUrl = `/`;
  
    beforeEach(() => {
      cy.visit(productListUrl);
    });
  
    it('Should filter products by name', () => {
      // Enter search query
      cy.get('[data-spec="search-input"]').type('Test Product');
  
      // Apply search
      cy.get('[data-spec="search-button"]').click();
  
      // Verify that filtered results are displayed
      cy.get('[data-spec="product-name"]').each(($el) => {
        expect($el.text().toLowerCase()).to.include('test product');
      });
    });
  
    it('Should sort products by price in ascending order', () => {
      // Click sort button for price
      cy.get('[data-spec="sort-price-button"]').click();
  
      // Verify that products are sorted by price in ascending order
      let previousPrice = 0;
      cy.get('[data-spec="product-price"]').each(($el) => {
        const currentPrice = parseFloat($el.text().replace('$', ''));
        expect(currentPrice).to.be.gte(previousPrice);
        previousPrice = currentPrice;
      });
    });
  
    it('Should sort products by price in descending order', () => {
      // Click sort button for price twice to toggle to descending
      cy.get('[data-spec="sort-price-button"]').click();
      cy.get('[data-spec="sort-price-button"]').click();
  
      // Verify that products are sorted by price in descending order
      let previousPrice = Number.MAX_VALUE;
      cy.get('[data-spec="product-price"]').each(($el) => {
        const currentPrice = parseFloat($el.text().replace('$', ''));
        expect(currentPrice).to.be.lte(previousPrice);
        previousPrice = currentPrice;
      });
    });
  
    it('Should navigate through pages', () => {
      // Navigate to the next page
      cy.get('[data-spec="next-page-button"]').click();
  
      // Verify that products on the second page are displayed
      cy.get('[data-spec="pagination-info"]').should('contain', 'Page 2');
  
      // Navigate back to the first page
      cy.get('[data-spec="prev-page-button"]').click();
  
      // Verify that products on the first page are displayed
      cy.get('[data-spec="pagination-info"]').should('contain', 'Page 1');
    });
  
    it('Should change the number of items per page', () => {
      // Change items per page to 20
      cy.get('[data-spec="items-per-page"]').select('20');
  
      // Verify that up to 20 products are displayed
      cy.get('[data-spec="product-item"]').should('have.length.lte', 20);
    });
  });
  