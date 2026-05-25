Feature: Smoke Test
  Scenario: App opens and displays the main title
    Given the app is open
    Then I should see the "DevLog" heading
