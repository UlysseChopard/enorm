# Specs

## Superusers

Only a `superuser` can add or remove a `superuser`.

Only a `superuser` can create an `organisation`, set its name and invites its first `user` with `organisation management` right.

## Rights

The following rights may be granted fully or none to `users`:
  * Organisation management
  * Subscription management
  * Entity management
  * Registration management
  * Entity membership

### Organisation management

An `organisation` is a set of `users`.

Can send invitations to `users` and manage their rights.

### Subscription management

A `subscription` gives access to own and accessible `entities` of the subscribed organisation.
Conversely, an organisation gives access to its own and these accessible `entities` to its subscribers.

Can request, accept, decline and cancel `subscriptions` with other organisations.


### Entity management

An `entity` is a group of registered users.

Can create, modify, delete `entities`.

Can accept or decline `registration requests` to its `entities`.

Can cancel or modify `registrations`.

### Registration management

A `registration` links a user to an `entity`.
A `registration request` carries a user's request through a path of `subscriptions`
to an `entity manager` of a given `entity`, `registrations managers` acting as gates for it.

Can create or cancel `registration requests` for his `organisation members`.

Can forward or decline `registration requests` received from his organisation's `subscribers` or from his `organisation members`.

Can modify `registration requests` (eg. `category of interest`).

### Entity membership

A `member` can be registered in an `entity` following a `registration request`.
His `profile` conveys details about him.

Can fill or modify his `profile`.

Can create or cancel `registration requests`.

-----

wg -> entities

----

Manage request path inside organisations
