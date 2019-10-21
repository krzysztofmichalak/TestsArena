Feature: As a user I want to be able to search items and validate the results

  Scenario: User search rower and analyse results
    When a user search item called "rower" on the auction platform
    Then price of 1 founded item should be grater than count of all items

  Scenario Outline: Result of searching items on default filters and settings
    When a user search item called "<item>" on the auction platform
    Then a user should see <itemsCount> items count
      And the user should see 30 items on first page

    Examples:
    | item     | itemsCount |
    | rower    | 1684       |
    | szafa    | 1043       |
    | materac  | 13196      |
    | doniczka | 150        |
#
#  # Not automated scenarios with not valid data - only an example
#  Scenario Outline: User search invalid items and check the count
#    When a user search item called "<item>" on the auction platform
#    Then the user should see empty search result
#      And the user should see main page of auction platform
#    Examples:
#      | item     |
#      | ^%%FB#   |
#      | -----    |
#      | ~~~~d    |
#      | <>?"}{}P |
