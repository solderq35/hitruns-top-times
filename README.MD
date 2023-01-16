## Hitruns-Top-Times

**Site URL**: https://hitruns-top-times.vercel.app/

### Site Origin / Purpose
- This is a slimmed down version of Hitruns Records Discord Bot (https://github.com/solderq35/hitruns-records-bot). 
- The Hitruns Top Times site only gets the top time for each category (rather than all runs like the Hiruns Records Discord Bot), and also splits up the requests by difficulty subcategory, so there is not as much lag when updating records; it is easier to keep this up to date than the Hitman Records Discord Bot.
- The Hitruns Records Discord Bot has a very lengthy output which can be hard to read on a Discord channel; part of the purpose of Hitruns Top Times is to quickly summarize these statistics on a few webpages in table form.

### What the Site Does
- Returns top times for each main individual level and full game category of https://www.speedrun.com/hitman_3
  - Might take awhile to load on the first attempt, as there are a lot of GET requests. After this, the responses seem to be cached for awhile and load speed is improved.
- Adds up the top level times of each full game category (e.g. Season 3) to calculate the theoretical sums of bests.
- Credit for dynamic HTML table generation: https://www.aspsnippets.com/Articles/Create-dynamic-Table-in-HTML-at-runtime-using-JavaScript.aspx
- Speedrun.com API for more info: https://github.com/speedruncomorg/api
- Need to remember to clean up console.log statements, rename variables to be more clear, remove unused code

