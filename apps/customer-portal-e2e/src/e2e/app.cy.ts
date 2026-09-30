import { getGreeting } from '../support/app.po';

describe('customer-portal', () => {
  beforeEach(() => cy.visit('/'));

  it('redirects unauthenticated users to the till login', () => {
    cy.url().should('include', 'auth/login');
    getGreeting().contains('Octopus Login');
  });
});
