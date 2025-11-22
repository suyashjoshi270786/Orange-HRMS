Feature: Network Intercept Test

Scenario: Mock API response before login
  Given I mock the user API
  When I open the login page
  Then API should be mocked successfully
