Feature: Tag Suggestions

As a User
I want to get tag suggestions
As I enter Tags
So I can filter based on existing tags

Scenario: Type the letter "c" in tag input field.
	Given I have the tag input field in focus
	When I type the letter "c"
	Then the tag "cisco" should show up as a suggestion

Scenario: Click on "cisco" tag suggestion.
	Given I have typed the letter "c" in the tag input field
	And the "cisco" tag suggestion has become visible
	When I click the "cisco" tag suggestion
	Then the "cisco" tag should be added to the tag input field

Scenario: Tab on "cisco" tag suggestion.
	Given I have type the letter "c" in the tag input field 
	And "cisco" is the first suggestion in the suggestion box
	When I press the "tab" key
	Then the "cisco" tag should be added to the tag input field