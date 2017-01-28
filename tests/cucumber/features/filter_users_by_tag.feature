Feature: Filter users by selected tags.

As a user
I want to filter users by tags followed
So I can invite interested users to view my post.

Scenario: Filter for users following "cisco"
	Given there are users following the "cisco" tag
	When I add the "cisco" tag to the tag filter input field
	Then users following the "cisco" tag should appear in the users results panel 