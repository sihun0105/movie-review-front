# Loading media skeletons implementation plan

1. Add a failing contract test for pending avatar data and image-download states.
2. Make `DmUserAvatar` render a circular skeleton until user data and the selected image finish loading.
3. Keep the real missing/broken-image fallback only after loading has completed.
4. Audit every avatar and poster consumer so route/data loading states do not render placeholder media.
5. Run focused tests, the full test suite, lint, build, and the 200-line limit check.
6. Verify representative desktop/mobile pages, merge the PR, and watch the production deployment.
