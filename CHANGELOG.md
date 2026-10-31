# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `@rabtx/ui` Select rebuilt on the native `<select>`: sizes `sm` (32), `md` (40), `lg` (48),
  `SelectItem` (optional `icon`), `SelectGroup`, `SelectSeparator`, `onValueChange`, `placeholder`
  and `leadingIcon`. Where `appearance: base-select` exists the list unfolds from the trigger,
  pulls away into its gap, pinches the trigger's corners and fades its rows in, all in CSS, and
  opens above when there is no room below. `--rx-select-*` tokens; a new `unfold` spring.
- `apps/docs`: `/docs/ui/select` with live examples and their source.
- `@rabtx/ui` Button rebuilt with CSS-only motion: `primary`, `secondary`, `ghost` and `outline`;
  sizes `sm` (32), `md` (40), `lg` (48) and `icon` (32 square, `aria-label` required by type);
  hover growth on fine pointers, spring press (`pressScale`), optional `ripple`, plus `ButtonLink`,
  `StatefulButton` (idle, loading, success, error with a letter-by-letter label roll),
  `MagneticButton` and `MetallicButton`. Colors, radius and scales are `--rx-btn-*` variables.
  New `label` and `magnetic` springs in `@rabtx/ui/motion`.
- `apps/docs`: a UI section (`/docs/ui`) with a live Button page (every variant, size and state
  above its source).
- `apps/ai-api`: Bun + Hono + TypeScript AI service. Zod-validated env, nest-api JWT auth (HS256,
  shared `JWT_SECRET`), RAG on Postgres + pgvector via Drizzle (`rag_documents` / `rag_chunks`,
  HNSW cosine index, ingest + top-k query + grounded answer), streaming tool-calling chat with the
  AI SDK (`searchDocuments`, `currentTime` tools) over any OpenAI-compatible provider (OpenRouter by
  default), OpenAPI 3.1 at `/api/openapi.json` with a Scalar reference at `/api/docs`, `bun test`
  suite with mocked LLM/embeddings plus an opt-in pgvector integration test, Dockerfile, compose
  fragment, Render service, `bun run dev:ai` and a CI job. Docs: `/docs/ai-api`.
- NestJS auth API (`/api/v1/auth/*`) with JWT login/register/me for the web app.
- Shared UI auth components via shadcn (`alert`, `spinner`, `input-group`) in `@starter/ui`.
- Web login/register flows that call Nest only (no multi-backend API switcher).
- Conventional Commits enforcement in `commit-msg` hook (typed prefixes + all-lowercase subjects).
- Docker Compose services for Nest API and Next.js web (multi-stage images, healthchecks, no Compose `version` key).

### Changed

- **Breaking (`@rabtx/ui/select`):** heights are 32/40/48 (were 28/32/36) and the trigger is a
  bordered surface instead of the recessed field, so it no longer follows `data-depth` (Flat only
  drops the list shadow). Plain `<option>` children still work.
- **Breaking (`@rabtx/ui/button`):** variants `accent` and `danger`, sizes `xl` and `2xl`, and the
  `loading`, `static`, `iconOnly`, `leadingIcon` and `trailingIcon` props are gone. Use
  `StatefulButton` for loading, `size="icon"` for icon-only, and put icons in the children. The
  `rx-primary`, `rx-secondary`, `rx-ghost`, `rx-accent` and `rx-danger` utilities and the tokens
  only they used were removed. The `/ui` playground and its e2e spec follow the new API.
- Compose Postgres image is now `pgvector/pgvector:0.8.7-pg18-trixie` (Postgres 18 + pgvector) for
  `apps/ai-api`; see docker/README.md "Switching to the pgvector image".
- `apps/rust/Dockerfile` builds from the monorepo root context (it copied a non-existent root
  `Cargo.toml`).
- Documentation lives only in `apps/docs` (Fumadocs). Removed the root `docs/` pointer folder.
- Architecture boundary check scopes deep `@/modules/*/*/*` imports to consumers outside `src/modules/`.
- Root `format` script tolerates missing local `cargo`/`shfmt` tooling.
- Agent and README docs maps point at `apps/docs` routes (`http://localhost:3002/docs`).

### Removed

- `apps/ai-api` (Python FastAPI AI service) and the AI assist feature that proxied to it: Nest
  `modules/ai` (`/api/v1/ai/*`, `AI_API_URL`, `AI_SERVICE_TOKEN`), the web `/admin/ai` page and nav
  item, and its compose/Render config.
- All Python tooling: `scripts/python`, Ruff/uv in `.mise.toml`, CI `setup-uv`, devcontainer and
  VS Code Python setup.
- Root `docs/` directory (stale pointer after the docs app migration).
- Web API backend switcher (Python / Rust / Hono).

## [0.1.0] - 2026-02-10

### Added

- Initial Starter monorepo layout (Turborepo + Bun).
- Dual license: MIT and Apache-2.0.

[Unreleased]: https://github.com/shabirkhan-dev/starter/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/shabirkhan-dev/starter/releases/tag/v0.1.0
