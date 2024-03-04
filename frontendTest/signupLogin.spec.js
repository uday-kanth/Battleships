// cypress/integration/signupLogin.spec.js

// Import the Cypress commands and utilities
import { cy } from 'cypress';

// Describe the test suite
describe('Sign-up/Login Page Tests', () => {
  beforeEach(() => {
    // Visit the page before each test
    cy.visit('/path/to/your/signuplogin/page');
  });

  it('should display the login form by default', () => {
    // Assert that the login form is visible
    cy.get('.form-item.log-in').should('be.visible');
    // Assert that the sign-up form is not visible
    cy.get('.form-item.sign-up').should('not.be.visible');
  });

  it('should switch to the sign-up form when "Sign up" button is clicked', () => {
    // Click the "Sign up" button
    cy.contains('.btn', 'Sign up').click();
    // Assert that the sign-up form is visible
    cy.get('.form-item.sign-up').should('be.visible');
    // Assert that the login form is not visible
    cy.get('.form-item.log-in').should('not.be.visible');
  });

  it('should switch to the login form when "Log in" button is clicked', () => {
    // Click the "Sign up" button to switch to sign-up form first
    cy.contains('.btn', 'Sign up').click();
    // Click the "Log in" button
    cy.contains('.btn', 'Log in').click();
    // Assert that the login form is visible
    cy.get('.form-item.log-in').should('be.visible');
    // Assert that the sign-up form is not visible
    cy.get('.form-item.sign-up').should('not.be.visible');
  });

  it('should display an error message for invalid login credentials', () => {
    // Enter invalid login credentials
    cy.get('#loginEmail').type('invalid@example.com');
    cy.get('#loginPassword').type('invalidpassword');
    // Click the "Log in" button
    cy.get('#loginBtn').click();
    // Assert that an error message is displayed
    cy.get('.error-message').should('be.visible').and('contain', 'Invalid email or password');
  });

  it('should successfully sign up a new user with valid credentials', () => {
    // Enter valid sign-up credentials
    cy.get('#signupEmail').type('newuser@example.com');
    cy.get('#signupUsername').type('newuser');
    cy.get('#signupPassword').type('password123');
    // Click the "Sign up" button
    cy.get('#signUpBtn').click();
    // Assert that the user is redirected to the dashboard or another page
    // Add assertions based on your application's behavior after successful sign-up
  });

  // Add more test cases as needed
});
