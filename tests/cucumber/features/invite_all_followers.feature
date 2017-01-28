Feature: Invite All Users

As a product owner
I want to invite interested users to view my post
So they can learn about the product

Scenario: Invite all users following me
	Given there are users following me
	When I click the Invite All button
	Then an invitation will be sent to each follower
	And the invite buttons will indicate the invitation has been sent
	And the Invite All button will indiact invations have been sent