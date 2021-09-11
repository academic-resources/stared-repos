# PRTG Disable Revocation Check Warning

I don't want to delete this object, but I want to silence it for things that are using a self-signed SSL.

To do that:

- Click the settings/wheel icon for **Revoked**
- Under _Value Lookup_, set the pull-down to `None`
- Repeat for **Root Authority Trusted**

Done.
