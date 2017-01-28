Feature: Invite User

As a Product Owner
I want to invite interested users to view my post
So they can become familiar with the product.

Scenario: Invite Violet Blue
	Given Violet Blue is following a tag in the tag filter input field
	When I click the Invite button adjacent to her information
	Then an invitaion will be sent
	And the Invite button will indicate the invitation has been sent.