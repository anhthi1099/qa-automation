Feature: User Login and search for job

  Background:
    Given I login to the application as "qatest2@gmail.com"

  @searchJobFlow @searchJobFlow01
  Scenario Outline: User login and search for job
    When I input "<searchKeyword>" to the input with "Search Job" placeholder
    When I click the "Search" button
    Then I can see the result list has job with "<searchKeyword>" title

    Examples:
      | searchKeyword |
      | Automation    |
      | ENGINEER      |
      | dEveloper     |

  @searchJobFlow @searchJobFlow02
  Scenario Outline: User login and search for job
    When I input "<searchKeyword>" to the input with "Search Job" placeholder
    When I click the "Search" button
    Then I can see a message "No results." returned

    Examples:
      | searchKeyword |
      | 123!@#456     |
      | 123456        |
