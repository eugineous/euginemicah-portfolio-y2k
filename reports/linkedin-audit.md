# LinkedIn Audit — awaiting data

**Status:** no export found in `./linkedin-export`.

1. LinkedIn → Settings & Privacy → Data privacy → *Get a copy of your data* → select **the works** (or at least Shares, Comments, Reactions, Connections).
2. Download the ZIP (arrives in ~10 min for the fast archive, 24h for full).
3. Drop the ZIP into `./linkedin-export/` in this repo.
4. Run `npm run analyze-linkedin`, commit, redeploy — the report appears at `/admin/linkedin-audit`.

_The full analysis pipeline is already built: top/bottom 20 posts, engagement-rate timeline, best days/hours, hook + format + topic analysis, decay detection (first vs second half, >40% drops flagged), consistency gaps, 10 brutal mistakes and 10 double-downs — all computed the moment data lands._