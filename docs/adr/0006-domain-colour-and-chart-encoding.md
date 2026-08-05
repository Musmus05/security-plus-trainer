# 6. Domain colour is wayfinding, not encoding

- **Status:** Accepted
- **Date:** 2026-08-05

## Context

The exam has five domains, and a gamified learning path naturally wants to give each one its own
colour — five hues, five nodes on the path, five rings on the dashboard.

That intuition was tested rather than trusted. Every five-hue subset of the reference colour ramps
(56 of them) was run through the palette validator in both light and dark mode, on the _all-pairs_
pairlist — the right pairlist when all five colours are visible simultaneously, as they are on a
dashboard or a path overview.

**Not one subset passed.** With five hues on screen at once, some pair always fell below either the
colour-vision-deficiency separation target (OKLab ΔE 8.0) or, worse, the normal-vision floor (ΔE
15.0) — the point at which a full-colour reader cannot reliably tell two marks apart either. The
failure is structural: eight hues stepped for a shared lightness band simply do not contain five
mutually distinguishable members.

On the _adjacent_ pairlist — bars side by side, list rows, a legend-ordered sequence — the picture
is different, and 24 subsets pass.

## Decision

Three rules, in order of importance.

**1. Domain identity never rests on hue.** Every element that identifies a domain also shows its
number, and its name wherever space allows. The accent colour is wayfinding — it helps you recognise
a screen you have seen before — not the encoding a reader must decode. This satisfies the
accessibility requirement anyway; the validator result just makes it non-negotiable.

**2. Progress uses the sequential ramp, not domain accents.** Progress, mastery and activity are
_magnitude_, and magnitude takes one hue light→dark. So every progress bar, mastery ring and heatmap
cell is stepped blue, in every domain. This is not a compromise forced by the validator — it is the
correct form choice, and it happens to dissolve the problem: five rings in one hue with five numbers
inside them are unambiguous.

**3. Where accents are used, they use the best-scoring passing order.**
`blue → orange → aqua → violet → red`, assigned to domains 1–5 in that fixed order, never cycled:

| Domain                                        | Light     | Dark      |
| --------------------------------------------- | --------- | --------- |
| 1.0 General Security Concepts                 | `#2a78d6` | `#3987e5` |
| 2.0 Threats, Vulnerabilities, and Mitigations | `#eb6834` | `#d95926` |
| 3.0 Security Architecture                     | `#1baf7a` | `#199e70` |
| 4.0 Security Operations                       | `#4a3aa7` | `#9085e9` |
| 5.0 Security Program Management and Oversight | `#e34948` | `#e66767` |

Measured on the adjacent pairlist: CVD ΔE 9.2 light / 9.4 dark (target 8.0, so clear of the warn
band), normal-vision ΔE 27.6 light / 22.5 dark (floor 15.0). Best of the 24 passing subsets on both
metrics.

## Consequences

- The dashboard's five mastery rings are one colour, with the domain number inside each. Less
  decorative than five coloured rings; unambiguous, which matters more.
- The heatmap ramp direction **inverts** between themes: on light, more magnitude reads as darker;
  on dark, as lighter. `tokens.test.ts` asserts this, because getting it backwards in one theme is
  an easy and invisible mistake.
- Adding a sixth category — a sixth domain, or a per-source breakdown — is not a matter of picking
  another hue. It folds into "other", becomes small multiples, or drops colour for position.
- Anyone changing `src/ui/tokens.css` must re-run the validator. The numbers above are the
  acceptance criteria, not decoration.
