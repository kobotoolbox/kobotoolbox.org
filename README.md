# kobotoolbox.org

A simple static Jekyll-powered website for KoBoToolbox.

## Development

### Requirements

- [npm](https://www.npmjs.com/get-npm)
- [ruby](https://www.ruby-lang.org/en/documentation/installation/)

### Setup

Start off with `npm install`, `gem install jekyll`, and then you can use one of the following terminal commands:

- building styles once: `npm run styles-build`
- building styles continuously: `npm run styles-watch`
- building website locally: `npm run jekyll-build` (builds to `_site` directory)
- serving website to local development server: `npm run jekyll-serve` plus go to [localhost:2038](localhost:2038)

If you want to add blog posts, just create a new one at `_posts` directory and push a commit to `master` branch. GitHub builds Jekyll automatically.
