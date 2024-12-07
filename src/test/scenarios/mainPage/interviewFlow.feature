Feature: User Login and search for job

  Background:
    Given I login to the application as "qatest2@gmail.com"

  @searchJobFlow
  Scenario: User login and search for job
    When I input "qa automation" to the input with "Search Job" placeholder
    When I click the "Search" button
    When Page sleep for 30 seconds

  @updateProfileFlow
  Scenario: User Update profile
    When I click the "1st" pencil button in the "profile-header" section
    Then the "Edit personal info" dialog appears
    When I input "Charlotte" to the "First Name" field
    When I input "Diamond" to the "Last Name" field
    When I input "abc" to the "Headline" field
    When I input "Dafna" and select "Dafna, North, Israel" for the "Location" field
    When I click the "Save" button
    Then the "Edit personal info" dialog disappears

    When I click the "2nd" pencil button in the "profile-header" section
    Then the "Edit Social Links" dialog appears
    When I input "https://www.linkedin.com/in/qatest2" to the input with "Linkedin Link" placeholder
    When I input "https://www.facebook.com/in/qatest2" to the input with "Facebook Link" placeholder
    When I input "https://www.Twitter Link.com/in/qatest2" to the input with "Twitter Link" placeholder
    When I input "https://www.Github Link.com/in/qatest2" to the input with "Github Link" placeholder
    When I input "https://www.Website Link.com/in/qatest2" to the input with "Website Link" placeholder
    When I click the "Save" button
    Then the "Edit Social Links" dialog disappears

    When I click the plus button in the "Experience" section
    Then the "Add Job" dialog appears
    When I input "ABC" to the "Company" field
    When I input "12/12/2023" to the "Start date:" field
    When I input "01/01/2024" to the "End date:" field
    When I click on the "Add Job" dialog title
    When I click the "Save" button
    Then I can see the error message with content "Required" under the "Position" field
    When I input "CEO" to the "Position" field
    When I click the "Save" button
    Then the "Add Job" dialog disappears

    When I click the "1st" pencil button in the "Experience" section
    Then the "Edit Job" dialog appears
    When I input "part time CEO" to the "Position" field
    When I click the "Save" button
    Then the "Add Job" dialog disappears

    When I click the plus button in the "Education" section
    Then the "Add Education" dialog appears
    When I input "Associate Degree" to the "Degree type" field
    When I input "Chemistry" to the "Field" field
    When I input "DUE" to the "School" field
    When I input "18/07/2021" to the "Graduation date" field
    When I click the "Save" button
    Then the "Add Education" dialog disappears

    When I click the plus button in the "Skills" section
    Then the "Edit skills" dialog appears
    When I input "ca" to the input with "Select..." placeholder
    When I select the "3rd" item in the list
    When I click on the "Edit skills" dialog title
    When I click the "Save" button
    Then the "Edit skills" dialog disappears







