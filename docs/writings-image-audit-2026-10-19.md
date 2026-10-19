# Writings hero image audit — 19 October 2026

## Live findings

Direct HTTP checks of https://helenburgess.id.au/writings/ found 41 article cards and 40 distinct image URLs, including the index hero and logo. Of these, 26 returned HTTP 200 with an image content type and 14 returned HTTP 404. The missing files affect 15 articles because two share a hero. The index hero itself returned HTTP 200.

All 41 linked article pages were fetched successfully. Their hero URLs match their respective card image URLs.

| Affected article | Missing image |
| --- | --- |
| [Piece by Piece: Building Something That Holds My Attention](/writings/2026/03/2026-03-31-piece-by-piece-building-something-that-holds-my-attention/) | `wooden-kit-assembly.jpg` |
| [The Table I Know I’ll Be At](/writings/2026/05/2026-05-18-the-table-i-know-i’ll-be-at/) | `alexander-lunyov-TNaA3xGBzNk-unsplash.jpg` |
| [The Inner Dialogue of Trauma](/writings/2026/05/2026-05-11-the-inner-dialogue-of-trauma/) | `aimee-giles-u1QfqxhsrXQ-unsplash.jpg` |
| [The Rules Were Written Down: AuDHD, Structure, Service, and What Came After](/writings/2026/04/2026-04-23-the-rules-were-written-down-audhd-structure-service-and-what-came-after/) | `alan-pope-rP-kqmI-oS0-unsplash.jpg` |
| [What I Finally Have Words For: Understanding Myself Through an AuDHD Lens](/writings/2026/04/2026-04-12-what-i-finally-have-words-for-understanding-myself-through-an-audhd-lens/) | `harmandeep-singh-3_Mogjm96GE-unsplash.jpg` |
| [The Quiet After Usefulness](/writings/2026/02/2026-02-24-the-quiet-after-usefulness/) | `tina-witherspoon-fpKrFJUiPA8-unsplash.jpg` |
| [Natural Healing: How Outdoor Activities Transformed My Well-being](/writings/2025/04/2025-04-21-nature-healing/) | `elena-mozhvilo-7l6inLyD2NQ-unsplash.jpg` |
| [The Power of Meditation: How It's Helped Me Manage My Lived Experience](/writings/2025/04/2025-04-07-meditation-practice/) | `mindfulness-journey-header.jpg` |
| [Digital Art as Medicine: My Journey from Veteran to Digital Creator](/writings/2025/03/2025-03-21-digital-art/) | `pexels-shkrabaanthony-4348401.jpg` |
| [Lessons from Stoic Philosophy for Everyday Resilience](/writings/2025/02/2025-02-21-stoic-lessons/) | `elena-mozhvilo-7l6inLyD2NQ-unsplash.jpg` |
| [The Moment Everything Changed: My Journey with PTSD After Military Service](/writings/2025/01/2025-01-05-the-moment-everything-changed/) | `davide-pietralunga-unsplash.jpg` |
| [Walking the Line: How Freemasonry and Stoicism Shaped My Moral Compass](/writings/2025/10/2025-10-07-stoicism-freemasonry/) | `stocism-freemasonry.jpg` |
| [A Quiet Christmas](/writings/2025/12/2025-12-23-a-quiet-christmas/) | `mel-poole-LUPXhXj2ip0-unsplash.jpg` |
| [What I Wish I’d Started Sooner: Learning to Be on My Own Side](/writings/2025/07/28072025-whatwishIknew/) | `aaron-burden-peaceful-unsplash.jpg` |
| [Building a Modern Personal Site with 11ty](/writings/2024/11/2024-11-24-building-modern-personal-site-with-11ty/) | `hal-gatewood-tZc3vjPCk-Q-unsplash.jpg` |

## Local repair and validation

The 14 missing assets were deleted in commit `49d40825bd4311c7ec14195504c183ad3840ff19` (22 September 2026). Restored each original byte-for-byte from that commit’s parent. No post text, metadata, filenames, credits, templates, or CMS configuration changed. Restored assets total 29,799,860 bytes; image optimisation was outside this repair.

Added `tests/writing-images.test.cjs` to check every source writing’s hero file, image metadata and layout reference, plus image availability in the built writings index and article heroes.

Checks completed:

- All 42 source posts have readable local hero assets and the expected layout.
- `npm run build` passed: 356 files copied, 257 pages written.
- `node --test tests/*.test.cjs` passed: six tests, zero failures.
- `git diff --check` passed.
- All restored files match their historical Git bytes.

No UI interaction or template changes were made; keyboard and accessibility automation were not run. The repository has no configured lint or accessibility test script. HTTP checks establish availability, not a browser visual assessment.

## Deployment status

This is a local repair only. No commit, push or deployment was performed. Deploy these restored assets and rerun HTTP checks for the 14 previously failing URLs before considering the live issue resolved.
