## Hitruns-Top-Times

**Site URL**: https://hitruns-top-times.vercel.app/

- Returns top times for each main individual level and full game category of https://www.speedrun.com/hitman_3
  - Might take awhile to load on the first attempt, as there are a lot of GET requests. After this, the responses seem to be cached for awhile and load speed is improved.
- Adds up the top level times of each full game category (e.g. Season 3) to calculate the theoretical sums of bests.
- Credit for dynamic HTML table generation: https://www.aspsnippets.com/Articles/Create-dynamic-Table-in-HTML-at-runtime-using-JavaScript.aspx
- Speedrun.com API for more info: https://github.com/speedruncomorg/api
- Need to remember to clean up console.log statements, rename variables to be more clear, remove unused code

