# Contributing to isiconic

Thanks for your interest in improving isiconic. This guide explains how to propose changes and what reviewers look for.

By participating you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Ways to contribute

- **Report a bug** using the [bug report form](https://github.com/ismailbentabett/isiconic_web_app/issues/new?template=bug_report.yml).
- **Suggest a feature** using the [feature request form](https://github.com/ismailbentabett/isiconic_web_app/issues/new?template=feature_request.yml).
- **Improve the docs**: typos, clarifications and missing setup steps are always welcome.
- **Submit code**: pick an open issue, or open one first to discuss larger changes.

Security problems should **not** be reported in public issues. See [SECURITY.md](SECURITY.md).

## Development setup

1. Install the prerequisites listed in the [README](README.md#-quick-start): Node.js, npm and a MongoDB instance.
2. Copy `server/.env.example` to `server/.env` and fill in your own development values. Never commit `.env` files.
3. Run the API: `cd server && npm install && npm start` (or `npx nodemon ./bin/www` for auto-reload).
4. Run the client: `cd client && npm install && npm run serve`

## Workflow

1. Fork the repository and create a branch from the default branch:
   `git checkout -b feat/short-description`
2. Make focused commits. Keep unrelated refactors out of feature or fix PRs.
3. Run the checks below before pushing.
4. Open a pull request and fill in the template. Link the issue it resolves (`Closes #123`).

### Branch names

| Prefix | Use for |
| --- | --- |
| `feat/` | New features |
| `fix/` | Bug fixes |
| `docs/` | Documentation only |
| `refactor/` | Code changes that neither fix a bug nor add a feature |
| `chore/` | Tooling, dependencies, configuration |

### Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/):

```text
feat(feed): add hashtag filter to trending view
fix(auth): refresh token before it expires
docs: clarify database setup
```

## Before you open a pull request

- Server: the API starts cleanly and the endpoints you touched behave as expected.
- Client: `npm run lint` passes and `npm run build` succeeds in `client/`.
- No secrets, API keys or personal data in the diff.
- Documentation is updated when behaviour or configuration changes.

## Project conventions

- **Server layering**: routes in `server/routes` stay thin and delegate to controllers in `server/controllers`; Mongoose schemas live in `server/models`.
- **Validation**: validate request bodies with Joi before they reach the database.
- **Auth**: protect endpoints with the existing auth middleware instead of re-implementing token checks.
- **Client**: pages go in `client/src/views`, reusable pieces in `client/src/components`, and shared state in the Vuex store.
- **Styling**: use Vuetify components and theme tokens rather than ad-hoc CSS where possible.

## Review process

A maintainer will review your pull request, may ask for changes, and will merge it once it is ready. Small, well-described PRs are reviewed fastest.

## Questions

Open a [discussion-style issue](https://github.com/ismailbentabett/isiconic_web_app/issues) or reach the maintainer via [GitHub](https://github.com/ismailbentabett).
