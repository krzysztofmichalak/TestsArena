Feature: As a user I want to sort searched item via price

  Scenario: User sorts searched items via price and analyze results
    When a user search item called "rower" on the auction platform
      And a user sorts searched items by "Cena rosnąco"
      And save "cheapest" item price
      And display sum of prices of 5 elements if price first of its is less than "500 zł"
      And display difference between cheapest and most expensive if price of first item is greater than "721 zł"
    Then price of first item should be less than "500 zł" or greater than "721 zł"

#   # Not automated scenario with fake data
#  Scenario Outline: User should see the same count number of items for each sorting
#    When a user search item called "rower" on the auction platform
#      And a user sorts searched items by "<sortingRule>"
#    Then a user should see 1668 item count
#    Examples:
#    | sortingRule             |
#    | Trafność                |
#    | Popularność             |
#    | Cena rosnąco            |
#    | Cena malejąco           |
#    | Cena z dostawą malejąco |
#    | Cena z dostawą rosnąco  |
#
#  # Not automated scenario with fake data
#  Scenario Outline: User should proper items according to sorting rule
#    When a user search item called "rower" on the auction platform
#    And a user sorts searched items by "<sortingRule>"
#    Then a user should see "<item>" on first position
#    Examples:
#      | sortingRule             | item   |
#      | Trafność                | rower1 |
#      | Popularność             | rower2 |
#      | Cena rosnąco            | rower3 |
#      | Cena malejąco           | rower4 |
#      | Cena z dostawą malejąco | rower5 |
#      | Cena z dostawą rosnąco  | rower6 |



