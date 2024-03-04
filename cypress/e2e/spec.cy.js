
import { cy } from 'cypress';


describe('Sign-up/Login Page Tests', () => {
  beforeEach(() => {
   
    cy.visit('http://localhost:3000/');
  });

  it('should display the login form by default', () => {
    
    cy.get('.form-item.log-in').should('be.visible');
    
    cy.get('.form-item.sign-up').should('not.be.visible');
  });

  it('should switch to the sign-up form when "Sign up" button is clicked', () => {
    cy.contains('.btn', 'Sign up').click();
    cy.get('.form-item.sign-up').should('be.visible');
    cy.get('.form-item.log-in').should('not.be.visible');
  });

  it('should switch to the login form when "Log in" button is clicked', () => {
    cy.contains('.btn', 'Sign up').click();
    cy.contains('.btn', 'Log in').click();
    cy.get('.form-item.log-in').should('be.visible');
    cy.get('.form-item.sign-up').should('not.be.visible');
  });

  it('should display an error message for invalid login credentials', () => {
    cy.get('#loginEmail').type('invalid@example.com');
    cy.get('#loginPassword').type('invalidpassword');
    cy.get('#loginBtn').click();
    cy.get('.error-message').should('be.visible').and('contain', 'Invalid email or password');
  });

  it('should successfully sign up a new user with valid credentials', () => {
    // Enter valid sign-up credentials
    cy.get('#signupEmail').type('newuser@example.com');
    cy.get('#signupUsername').type('newuser');
    cy.get('#signupPassword').type('password123');
    
    cy.get('#signUpBtn').click();
    
  });

});
