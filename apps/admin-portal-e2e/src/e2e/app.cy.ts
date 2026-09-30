import { getGreeting } from '../support/app.po';

describe('admin-portal', () => {
  beforeEach(() => cy.visit('/'));

  it('redirects unauthenticated users to the admin login', () => {
    cy.url().should('include', 'auth/login');
    getGreeting().contains('Admin Login');
  });
});
