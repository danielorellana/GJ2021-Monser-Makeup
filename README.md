deploys to: https://danielorellana.github.io/GJ2021-Monser-Makeup/


After cloning the repo run `npm install`

`npm run build` compiles all of the .ts files into `game.js` and copies into `dist/`

`npm run watch` uses gulp.watch to automatically recomple when src files change

Setting `dist/` to the gh-pages branch with `git clone git@github.com:danielorellana/GJ2021-Monser-Makeup.git --branch gh-pages dist` allows you to push to gh-pages with `npm run deploy`
