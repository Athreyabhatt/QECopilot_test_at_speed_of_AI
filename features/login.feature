# Updated for GitHub Actions testing
Feature: User Login Functionality

  As a user of the-internet.herokuapp.com
  I want to login with valid and invalid credentials
  So that I can access the secure area and see appropriate error messages

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter username "tomsmith" and password "SuperSecretPassword!"
    And I click the login button
    Then I should be redirected to the secure area
    And I should see a success message "You logged into a secure area!"
    And I should see a logout button

  Scenario: Failed login with invalid username
    Given I am on the login page
    When I enter username "invaliduser" and password "SuperSecretPassword!"
    And I click the login button
    Then I should remain on the login page
    And I should see an error message "Your username is invalid!"

  # Scenario: Failed login with invalid password
  #   Given I am on the login page
  #   When I enter username "tomsmith" and password "wrongpassword"
  #   And I click the login button
  #   Then I should remain on the login page
  #   And I should see an error message "Your password is invalid!"

  # Scenario: Failed login with both invalid credentials
  #   Given I am on the login page
  #   When I enter username "invaliduser" and password "wrongpassword"
  #   And I click the login button
  #   Then I should remain on the login page
  #   And I should see an error message "Your username is invalid!"
