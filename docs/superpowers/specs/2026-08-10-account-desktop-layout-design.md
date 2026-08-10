# Account desktop layout

## Goal

Prevent the account page's local profile and account rail from pushing the
activity workspace sideways inside the existing three-column desktop shell.

## Layout

- Keep the global desktop navigation and right matching sidebar unchanged.
- Render the account page as one full-width column inside the center pane.
- Use a horizontal profile header on desktop as well as mobile.
- Place the activity summary and selected feed immediately below the profile.
- Place shortcuts and destructive account actions below the activity feed.

## Constraints

- Preserve all profile editing, activity filtering, deletion, sign-out, and
  account withdrawal behavior.
- Do not introduce page-level horizontal scrolling.
- Keep the existing mobile order and compact activity navigation.

## Verification

- A source contract rejects the nested 200px account grid and desktop-only
  vertical profile treatment.
- Frontend tests, lint, build, and desktop viewport inspection pass.
