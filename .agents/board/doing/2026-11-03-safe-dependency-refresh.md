---
id: str-safe-dependency-refresh
title: Refresh safe dependency versions across workspaces
type: chore
from: human
to: web
priority: normal
status: doing
assignee: agent-web
reviewer: reviewer
parent: none
depends_on: []
branch: agent/web/safe-dependency-refresh
worktree: ../starter-worktrees/agent/web/safe-dependency-refresh
scope:
  - apps/ai-api/package.json
  - apps/docs/package.json
  - apps/mobile/package.json
  - apps/nest-api/package.json
  - apps/web/package.json
  - packages/logger/package.json
  - packages/rabtx/package.json
  - packages/ui/package.json
  - bun.lock
  - .agents/board/doing/2026-11-03-safe-dependency-refresh.md
allowed_shared: []
created: 2026-11-03
updated: 2026-11-03
---

## What

Apply the current Bun-compatible dependency updates across the workspaces and push the work branch.
The human explicitly approved the cross-workspace dependency scope in the task request.

## Why / Context

`bun outdated --recursive --no-save --dry-run` identified compatible updates across apps and shared packages.

## Proposal or Ask

Apply only the versions Bun identifies as compatible with each existing manifest range. Keep major-version/range changes out of scope. Definition of done: manifests and `bun.lock` are updated, required checks pass, an independent review is recorded, and the branch is pushed.

## Scope

**In scope:**

- Workspace dependency manifests listed in frontmatter and root `bun.lock`.
- This card's status and resolution.

**Out of scope:**

- TypeScript 6 → 7 and `postcss-nested` 7 → 9 range changes.
- Dependencies for which Bun reported no compatible update.
- Source-code changes.

## Validation

- `bun run lint`: pass, 0 errors; existing warnings in `@rabtx/ui` (1) and web (5).
- `bun run format`: pass, 980 files checked.
- `bun run typecheck`: pass, 8 workspace tasks. Mobile check used the main worktree's installed copies of unchanged `expo-secure-store` and `expo-image-picker` after the interrupted WTP install left zero-byte files in this worktree.
- `bun run test`: pass, 7 workspace tasks and shell tests; 3 pgvector integration tests skipped without a database.
- `bun outdated --recursive --no-save --dry-run`: remaining results are exact-pinned or outside the current range; no further compatible direct updates.
- `git diff HEAD^ HEAD --check`: pass.

## Resolution

Updated 16 compatible dependency versions across 7 workspace manifests and `bun.lock`. No source files changed. Independent review found no dependency, range, or source-scope issues; it requested this card metadata correction, which is now recorded. Push is pending.

Contract impact: none.

Review: read-only review of `ea45d45`; no dependency or scope findings. Card count/status correction addressed in this follow-up.

Commit: `ea45d45` (dependency changes); `cf9f8df` (review record correction).
