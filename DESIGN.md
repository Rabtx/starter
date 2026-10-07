# Design System Brief

This file is the source of truth for AI agents and humans when creating UI in this Starter.
Keep it updated before generating new screens with Codex, Claude Code, Cursor, v0, Open Design,
Figma MCP, Onlook, Scamp, or similar tools.

## Product Intent

This Starter should produce production-grade application interfaces, not generic demo pages.
Generated UI must feel domain-specific, accessible, responsive, and built from reusable components.

## Audience

- Developers starting new products from this monorepo.
- Designers or product builders using AI tools to explore screens.
- AI coding agents implementing UI from product briefs, Figma frames, or design-system prompts.

## Visual Principles

- Prefer clear hierarchy over decoration.
- Prefer operational density for dashboards, admin panels, and internal tools.
- Prefer calm, readable surfaces for documentation and product workflows.
- Avoid generic SaaS hero sections inside actual applications.
- Avoid decorative blobs, background glows, unnecessary nested cards, and one-note purple/blue gradients.
  Glass is an intentional component material described below, not a default page decoration.
- Use real state design: loading, empty, error, disabled, hover, focus-visible, selected, saving,
  success, and permission denied.

## Rabtx UI: shared design intent

This section records the owner's agreed direction. Use it when another agent or session takes
on a component. Existing code is an implementation to assess, not proof that the design is finished.

### Direction (agreed 2026-10-07)

`@rabtx/ui` is being rebuilt from scratch. It is not a styled layer over shadcn and it does not
inherit `@starter/ui`'s components.

- **Design source:** the Reptex/Grid design system in Figma. Where this file and Figma disagree on
  a visual decision, Figma wins; record the Figma link on the component's card.
- **shadcn is kept only for its CLI** (`components.json`, registry and add-component workflow). Its
  component code is not the foundation and is replaced component by component.
- **Tailwind CSS stays** as the styling system, on the shared tokens in
  `packages/ui/src/styles/globals.css`.
- **Icons are HugeIcons only** (`@hugeicons/react` on web, `@hugeicons/react-native` on native).
  `lucide-react`, `lucide-react-native` and any other icon set are not used.
- **Two targets, one design language:** web components and real React Native/Expo components that
  share tokens and design intent but not rendering code.

### Dependency policy

The goal is a clean, modern implementation, not zero dependencies. Component libraries became the
default mainly to get accessibility and interaction behavior that native HTML lacked. Modern
browsers now provide much of it, so prefer the platform first.

1. **Platform first (web).** Reach for native HTML and CSS before any package: `<dialog>`, the
   Popover API, `<details>`, `inert`, CSS anchor positioning, `:focus-visible`, `:has()`,
   `@starting-style` for entry animation, view transitions and `prefers-reduced-motion`. Check each feature against the browser baseline the product supports
   before using it, and note that baseline on the component.
2. **Accessibility is not optional.** Keyboard operation, focus management, roles, names and
   states must be at least as good as the library being replaced. Verify with the keyboard and a
   screen reader, not just by reading the markup.
3. **A dependency needs a written reason.** State the platform gap it fills (usually an accessible
   behavior the platform cannot yet do) and the condition under which it can be removed. Without
   that, do not add it. Where a gap is real, using a dependency is correct.
4. **Native (Expo / React Native) follows the same rule**, but the platform surface is smaller, so
   some dependencies (Expo modules, gesture and animation runtime) are expected. Which animation
   runtime is acceptable is an open decision (see below).
5. **Remove, do not stack.** Replacing a dependency means deleting it and its imports in the same
   change, not running two systems side by side.

### Open decisions

These are not settled; do not guess them.

- Figma file link and the node IDs for each component.
- The animation spec (which animations, durations and easing curves). The owner has this planned
  and has not shared it yet.
- Whether the four materials below survive as the `kind` axis, or are replaced by the Figma
  system's own variants.
- Whether `react-native-reanimated` counts as acceptable for native motion or the built-in
  `Animated` API should be used.
- What `@starter/ui` becomes once components are rebuilt (tokens and CLI config only, or removed).
- The order in which components are rebuilt.

### Goal and scope

Web components must be responsive by default and work on desktop browsers. Mobile means real React
Native/Expo components, not just a narrow web layout. Share the design language and tokens; use
platform-specific rendering and interactions where needed. No separate desktop library is required
now.

Work on one component at a time. Keep the implementation minimal (KISS, DRY, Ponytail): every
wrapper, style, dependency and abstraction must solve a current need. “Minimal” does not mean
omitting accessibility, useful feedback or the edge detailing that defines the material.

### Four materials

Status: this is the previous Button direction. It stays as the reference for the edge and material
language until it is reconciled with the Figma system (see Open decisions); do not treat it as the
final variant model for the rebuilt library.

Material is the `kind` axis: `solid`, `detail`, `glass`, `terminal`. It is independent of color role
(`variant`: primary, secondary, destructive, ghost) and size. Do not confuse a material with a color.

| Kind | Intended appearance and behavior |
| --- | --- |
| `solid` | A clean opaque pill. Depth is three tones — a hairline edge, a light top edge and a dark bottom edge — and never a drop shadow. Polish comes from proportions, spacing, typography, color and complete interaction states. |
| `detail` | A surface with two touching rounded contours. The outer rim follows the inner curve with **zero gap or spacer** and subtly blends into the surrounding background. The inner contour carries the same depth as `solid` — hairline edge, light top, dark bottom — so the two materials differ in construction, not in tone. **No cast shadows, blurred shadows or background glow.** |
| `glass` | **Liquid glass**, in the sense Apple uses it across recent iOS and macOS: a translucent material that refracts and bends what sits behind it, picks up specular highlights along its edges, and reacts to motion rather than sitting flat. The background is part of the material, not a tint over it. Opacity plus a backdrop blur is a fallback, not the target — do not describe that fallback as finished. |
| `terminal` | Squarish corners, crisp edges and a coherent terminal aesthetic. Monospace and restrained color fit the direction. Current uppercase labels and hover inversion are implementation choices, not mandatory requirements for every future component. |

“Polished” is the quality bar for all four kinds; `detail` is one specific material construction.
Do not interpret polished as “add more shadows, glow or animation.”

### Detailed construction

- Start with the actual component surface and its rounded boundary.
- Put the outer contour directly against the inner contour; keep their curves concentric.
- Let the outer rim sit only subtly apart from the surrounding surface, including charcoal.
- Create depth through edge contrast, not a floating drop shadow. Detail and solid share one
  depth language: `--button-edge` for the hairline, `--button-sheen` and `--button-shade` for the
  light top and dark bottom. Solid draws those three tones as a border plus inset shadows; detail
  draws the same tones as its inner contour, which is what keeps its two contours touching, and
  inverts the bevel while pressed.
- Keep surface, rim and radius decisions in shared tokens. The Button consumes `--button-rim`
  for the outer detail contour and `--button-edge`, `--button-sheen`, `--button-shade` for the
  surface that sits inside it (the sheen and shade carry their own dark-theme values). Add more
  tokens only when an actual design decision needs them.
- Radius belongs to the material, not the size (`kindShape`): solid is a pill, and `size="icon"`
  is therefore a circle. Sizes change height, padding and text scale only.
- Check the result in light and dark themes on a plain background. A background effect must not
  conceal weak component styling. Where the host surface differs, adapt the rim token deliberately.

### Motion and interaction

Motion is on by default, purposeful and restrained. Press/release should feel responsive without
moving surrounding layout. Respect reduced motion and `animated={false}`. Disabled controls must
not activate or animate as enabled controls. Native caller callbacks must not suppress internal motion.

Previous Button direction (removed by the reset, kept as a starting point): solid used a stiff press
spring (0.93) with a 1.02 hover scale, detail a restrained press (0.94) with a 1px hover lift,
glass a softer spring, and terminal neither scaled nor lifted. Hover was gated behind a real-hover
media query so touch devices did not keep a phantom hover. These are values to evaluate, not
universal physics rules, and the owner's animation spec supersedes them once shared.

Review default, hover (web), keyboard focus, pressed, disabled, loading and success states where
applicable. Include leading/trailing icons and icon-only examples with accessible names. Keep labels
and dimensions stable during state changes. The earlier Button had state-driven loading and result
labels (`state` with `loadingText` / `successText` / `errorText`) that morphed the width between
labels. That behavior is gone with the reset; re-establish it deliberately, and review it on both
platforms before calling it finished.

### Consistency and review

The same language should eventually apply to cards, inputs, sidebar items and the surrounding
application shell. Use semantic color and helpful SVGs where they clarify content, without decorative
color noise. Do not redesign every screen as part of a single component task.

The earlier design lab included controls for outer rim, inner edge, material, motion and a flat/polished
comparison. Those are useful review tools, not a requirement to add a large control API to components.
Before moving to the next component, review the current one across themes, sizes, interaction states
and supported platforms. Be explicit about untested native behavior and simplified material fallbacks.

### Current implementation and preview

State as of 2026-10-07. Verify against the repo before relying on it.

- `packages/ui` (`@starter/ui`): the original shadcn-style web components (about 30), `motion/*`
  variants and `mobile/*` components, plus the shared tokens. The apps still consume it. It is the
  thing being replaced, not the foundation to extend.
- `packages/rabtx` (`@rabtx/ui`): the rebuild target. It currently holds a single
  `src/button.tsx`, a verbatim shadcn Button copy left by the "reset the Button" commit, exported as
  `@rabtx/ui/button`. It still depends on `@base-ui/react`, `@starter/ui` and
  `class-variance-authority`, all of which the rebuild is expected to remove.
- Shared tokens: `packages/ui/src/styles/globals.css`. It still defines the `--button-rim`,
  `--button-edge`, `--button-sheen` and `--button-shade` tokens from the previous direction; the
  baseline Button does not use them.
- Preview route: `apps/docs/content/rabtx/` (`index.mdx`, `button.mdx`), served at `/rabtx`.
  `button.mdx` is a short page rendering the baseline Button. The earlier material matrix
  component no longer exists.
- Icons: HugeIcons is the target, but 44 files still import `lucide` and 93 import HugeIcons.
  Migrating the remaining lucide usage is part of the rebuild.
- Glass: the earlier web implementation was translucency plus backdrop blur and the native one was
  flat translucency; neither was liquid glass. On native the intended path is `expo-glass-effect`,
  already a mobile dependency, which hands the real system material to iOS instead of imitating it.
  The web has no equivalent system material, so it has to be approximated — layered translucency,
  an edge highlight that responds to the surface behind it, and refraction where it is affordable.
  Treat web and native results as the same material with different fidelity, and say which one you
  tested.

## Layout Rules

- Use stable dimensions for toolbars, sidebars, tables, cards, and repeated controls.
- Do not let text overflow buttons, tabs, cards, table cells, or mobile headers.
- Do not place cards inside cards unless it is a true repeated item or modal body.
- Keep desktop workflows scannable and mobile workflows thumb-friendly.
- Use responsive constraints instead of viewport-scaled font sizes.

## Tokens

The shared Tailwind 4 design tokens live at `packages/ui/src/styles/globals.css` (shadcn monorepo style).

Current baseline:

- Background: `--background`
- Foreground: `--foreground`
- Primary: `--primary`
- Secondary: `--secondary`
- Muted: `--muted`
- Border: `--border`
- Ring: `--ring`
- Radius: `--radius`
- Charts: `--chart-1` through `--chart-5`
- Sidebar tokens: `--sidebar-*`

When adding a new app, do not invent one-off color systems. Extend the shared token package or
create an app-specific override with a short rationale.

## Typography

- Use the app's configured sans font for product UI.
- Reserve large display text for true first-viewport marketing or documentation hero sections.
- Use smaller, tighter headings inside dashboards, cards, sidebars, tables, and forms.
- Keep letter spacing at `0` unless a specific brand treatment requires otherwise.

## Components

The repo has a shared web primitive package at `packages/ui` and app-local primitives in
`apps/web/src/components/ui`.

Current rule (during the rebuild):

- Existing screens keep using `@starter/ui` until the matching `@rabtx/ui` component exists. Do not
  add new components or features to `@starter/ui`.
- New and rebuilt components go in `@rabtx/ui`, one at a time, following the Direction and
  Dependency policy above. Do not wrap or extend a shadcn component.
- When a component is rebuilt, switch its consumers over and delete the `@starter/ui` original in
  the same change.
- Keep complex or app-specific composed components inside each app or feature module.
- Promote a component to `packages/ui` only after it is reusable and free of route/auth/data
  coupling.
- Extend the existing `/rabtx` docs routes for visual review of the polished components.
- Add examples for loading, empty, error, disabled, hover, focus-visible, and selected states.

## AI UI Generation Rules

Before implementing UI, an agent should:

1. Read this `DESIGN.md`.
2. Read the target app's README and existing components.
3. Identify reusable components and tokens.
4. Ask for missing product context if the screen purpose is unclear.
5. Propose an implementation plan before editing.

After implementing UI, an agent should:

1. Run lint/typecheck/tests for the touched app.
2. Capture or inspect desktop and mobile rendering where possible.
3. Check long text, empty data, error states, and keyboard focus.
4. List any intentional differences from the design reference.

## Prompt Template

```txt
Use DESIGN.md and the existing app components as the source of truth.

Design/implement [screen/component].

Audience:
[who uses it]

Primary task:
[what the user must complete]

Domain constraints:
[data density, privacy, accessibility, workflow, device context]

Required states:
loading, empty, error, validation, hover, focus-visible, selected, disabled, saving, success

Quality bar:
No generic SaaS layout. No decorative blobs. No nested cards. Use shared tokens, stable spacing,
accessible contrast, responsive behavior, and existing component conventions.

Before coding, return:
1. Components to reuse.
2. New components needed.
3. Token changes if any.
4. Tests or visual checks to run.
```
