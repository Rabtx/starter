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
  Glass is an intentional `kind` described below, not a default page decoration.
- Use real state design: loading, empty, error, disabled, hover, focus-visible, selected, saving,
  success, and permission denied.

## Rabtx UI: shared design intent

This section records the owner's agreed direction. Use it when another agent or session takes
on a component. Existing code is an implementation to assess, not proof that the design is finished.

### Direction (agreed 2026-10-07)

`@rabtx/ui` is being rebuilt from scratch. It is not a styled layer over shadcn and it does not
inherit `@starter/ui`'s components.

- **Design source:** the Reptex/Grid design system in Figma (see Figma source below). Where this
  file and Figma disagree on a visual decision, Figma wins, with one exception: no shadows (see
  Radius, depth and kind). Record the component's Figma node ID on its card.
- **Animation reference:** beUI (`https://beui.dev`; MCP server `https://mcp.beui.dev/mcp`).
- **shadcn is kept only for its CLI** (`components.json`, registry and add-component workflow). Its
  component code is not the foundation and is replaced component by component.
- **Tailwind CSS stays** as the styling system, on the shared tokens in
  `packages/ui/src/styles/globals.css`.
- **Icons are HugeIcons only** (`@hugeicons/react` on web, `@hugeicons/react-native` on native).
  `lucide-react`, `lucide-react-native` and any other icon set are not used.
- **Two targets, one design language:** web components and real React Native/Expo components that
  share tokens and design intent but not rendering code.
- **Clean components:** a component carries no per-style branching. Radius and depth come from
  token modes, and each `kind` is a ready-made set of Tailwind classes applied only when selected.

### Figma source

File: `rabtx Design System`, key `en7xSFtcVYHkX7Iwo4hONQ`
(`https://www.figma.com/design/en7xSFtcVYHkX7Iwo4hONQ/rabtx-Design-System`). Pages: Cover (`0:1`),
Icons (`2:155`), Components (`2:156`). Each component is a `Section/<name>` frame on the Components
page; the node IDs below are for that frame.

Button `5:6`, Icon Button `5:191`, Input `6:14`, Checkbox `6:59`, Task Check `6:78`, Toggle `6:103`,
Badge `6:116`, Chip `6:139`, Nav Item `7:23`, Menu Item `7:46`, Kbd `7:179`, Avatar `7:185`,
Tab `7:202`, Tooltip `7:231`, Toast `7:238`, Status Icon `8:85`, Composer `8:104`, Dialog `8:162`,
Banner Card `8:194`, Kanban Card `9:139`, Kanban Column `9:174`, Table `9:235`, Top Bar `9:325`,
Sidebar `9:383`, Option Card `26:400`, Step Progress `26:425`, Field `26:436`, Mobile `27:419`,
App Icon `40:408`, Tag `42:441`, Progress Ring `42:516`, Shape & Depth `55:502`, Select `66:770`,
Textarea `66:783`, Radio `66:794`, Segmented Control `66:846`, Alert `67:751`,
Progress Bar `67:788`, Skeleton `67:802`, Empty State `67:851`, Command Palette `68:823`,
Pagination `68:877`, Breadcrumb `68:897`, Avatar Group `68:929`, Setting Row `69:823`,
Stat Card `69:860`, Plan Card `69:936`, Tool Call `112:893`, Diff Card `112:910`,
Approval Card `112:1010`, Inbox Row `113:993`, File Tree Item `113:1088`, Picker Row `113:1120`,
Grid Shell `113:12741`, Thread Status `128:1062`, Thread Row `128:1111`, PR Row `128:1224`,
Banner `129:17096`. Product-specific sections (Composer, Kanban, Tool Call, Diff, Approval,
Thread, PR, Inbox) are Grid app components, not part of the first library pass.

Tokens read from the Sidebar node (`92:11340`, dark theme) so far, as a starting point; read each
component's own variables before building it:

- Names are `--color-*`, `--space-*`, `--radius-*`, `--size-*`.
- Radius 4, 6, 8, 12 and 999. Space 0, 2, 4, 6, 8, 10, 12. Control height 24, nav row height 28.
- Type is SF Pro at 13/20 and 12/16 (regular 400, medium 510), letter spacing -0.15.
- Dark colors: surface `#212121`, subtle `#1b1b1b`, pressed `#303030`, border `#303030` and strong
  `#3d3d3d`; text `#ebebeb`, `#a3a3a3`, `#7f7f7f`; accent `#2d7cf6`; danger `#f0686d`.

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

- **Depth without shadows.** The mechanism is undecided. The owner will share a real example and
  update Figma, whose Raised and Floating depths currently use drop shadows.
- **Glass.** How far it goes (translucency plus blur, or closer to Apple's liquid glass) is to be
  discussed. The structure is decided: a simple `kind` backed by ready-made Tailwind classes.
- **Animation spec.** beUI is the reference. Still needed: which beUI motions map to which
  components, and any deviations. The beUI MCP server is not yet configured in agent sessions.
- Whether `react-native-reanimated` counts as acceptable for native motion or the built-in
  `Animated` API should be used.
- What `@starter/ui` becomes once components are rebuilt (tokens and CLI config only, or removed).
- The order in which components are rebuilt.
- Whether both light and dark themes ship in the first pass (Figma shows both: the Sidebar is dark,
  Shape & Depth is light).
- Mapping Figma's token names (`--color-*`, `--space-*`, `--radius-*`, `--size-*`) onto the existing
  shadcn names in `packages/ui/src/styles/globals.css`.
- Font. Figma uses SF Pro, which exists only on Apple platforms; the web and Android fallback is
  undecided. A global monospace option is app-level theming, not a component concern.

### Goal and scope

Web components must be responsive by default and work on desktop browsers. Mobile means real React
Native/Expo components, not just a narrow web layout. Share the design language and tokens; use
platform-specific rendering and interactions where needed. No separate desktop library is required
now.

Work on one component at a time. Keep the implementation minimal (KISS, DRY, Ponytail): every
wrapper, style, dependency and abstraction must solve a current need. “Minimal” does not mean
omitting accessibility, useful feedback or the detailing that defines the depth treatment.

### Radius, depth and kind

Agreed 2026-10-07, replacing the earlier four materials (`solid`, `detail`, `glass`, `terminal`).
Components vary along independent axes: color role (`variant`), size, and the three below.

- **Radius** (Figma mode: Sharp, Default, Round). The terminal look is not a material any more: it
  is the Sharp radius mode. Radius is a token, so it can be switched for a whole app or theme
  instead of per component. A monospace font for a terminal feel is likewise applied globally by
  the app, never by an individual component.
- **Depth** (Figma mode: Flat, Raised, Floating). **No shadows**: no drop shadow, blurred shadow or
  background glow. This overrides Figma, whose Raised and Floating currently draw drop shadows
  (and the Sidebar uses `Shadow/sm` and `Depth/Soft`); do not copy those. The owner will update
  Figma. How depth is expressed instead is an open decision. The tonal-edge language of the earlier
  direction (a hairline edge, a light top edge and a dark bottom edge) is a candidate starting
  point, not a decision.
- **Kind.** Reserved for a treatment that needs its own look. Today only `glass`. Each kind is a
  ready-made set of Tailwind classes applied only when that kind is selected, so the component
  itself stays free of per-kind logic. `glass` is deliberately simple; its exact look is open.

Radius and depth are expected to ship as token modes (CSS variables switched by a mode attribute on
a container) so components do not need props for them. Confirm this when the first component is
built.

Do not interpret polished as “add more shadows, glow or animation.”

### Earlier construction notes (candidate for depth)

From the earlier `solid` and `detail` materials, kept as reference while the depth mechanism is
undecided. Radius-per-material (`kindShape`) no longer applies: radius is now its own mode.


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
- Radius is its own mode, not a property of the size or the kind. Sizes change height, padding and
  text scale only.
- Check the result in light and dark themes on a plain background. A background effect must not
  conceal weak component styling. Where the host surface differs, adapt the rim token deliberately.

### Motion and interaction

Motion is on by default, purposeful and restrained. Press/release should feel responsive without
moving surrounding layout. Respect reduced motion and `animated={false}`. Disabled controls must
not activate or animate as enabled controls. Native caller callbacks must not suppress internal motion.

The animation reference is beUI (`https://beui.dev`, for example its motion Button at
`https://beui.dev/components/motion/button`). Match its feel; take concrete values from it or from
the owner's spec rather than from the numbers below.

Previous Button direction (removed by the reset, kept as a starting point): solid used a stiff press
spring (0.93) with a 1.02 hover scale, detail a restrained press (0.94) with a 1px hover lift,
glass a softer spring, and terminal neither scaled nor lifted (these names are the old
materials). Hover was gated behind a real-hover media query so touch devices did not keep a
phantom hover. These are values to evaluate, not universal physics rules, and the owner's
animation spec supersedes them once shared.

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

The earlier design lab included controls for outer rim, inner edge, material, motion and a
flat/polished comparison. Those are useful review tools, not a requirement to add a large control API to components.
Before moving to the next component, review the current one across themes, sizes, interaction states
and supported platforms. Be explicit about untested native behavior and simplified glass fallbacks.

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
