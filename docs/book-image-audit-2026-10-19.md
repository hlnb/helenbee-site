# Book cover repair — 19 October 2026

## Cause and repair

The same commit that removed the article hero assets,
`49d40825bd4311c7ec14195504c183ad3840ff19` (22 September 2026),
deleted 24 covers still referenced by the 26 books in `src/books/`.
Only the Atomic Habits and The Courage to Be Disliked covers remained locally.
This was an asset deletion, not an Eleventy passthrough or template problem.

Restored all 24 referenced missing files byte-for-byte from that commit's parent.
Each restored Git blob hash matches its historical counterpart. The restored
files total 3,098,876 bytes. The deleted but unreferenced `open-when.jpg` was
left outside this repair.

Kept the original filenames, including `daily-stoicjpg.jpg`,
`digital-minimalisim.jpg`, `dont-believe-evertything-you-think.jpg` and
`slow-producitivity.jpg`, because the existing content references those paths.
No book text, front matter, URLs, layouts, styles, CMS configuration, forms,
consent or analytics code changed. No brand-refresh changes were brought into
`main`.

## Verification

Added `tests/book-images.test.cjs` to validate all 26 source covers and their
layouts, all 26 reading-shelf images, every individual book hero and cover,
and byte-identical passthrough copies in the production build.

- `npm run build`: passed; 382 files copied, 257 pages written.
- `node --test tests/book-images.test.cjs`: 2 passed, 0 failed.
- `node --test tests/*.test.cjs`: 21 passed, 0 failed.
- `git diff --check`: passed.

This is a local repair. No commit, push or production deployment was performed.
The restored URLs still require a deployment before they can be verified live.
