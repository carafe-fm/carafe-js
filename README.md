# Carafe

## Packages

See https://soliantconsulting.github.io/carafe/

## Quickstart

- Open the companion FileMaker file in FileMaker 16+
- Follow the Install Instructions on the Welcome screen

## Basic Implementer Documentation

- Explanation of Carafe `getData` function
- Define a JSON data source that matches one of the provided example formats
- Working with JSFiddle
- Creating your own sample data in JSFiddle
  - e.g.: `Carafe.setData([["Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750"],]);`
- Implementing custom HTML
- Implementing custom JavaScript
- Implementing custom CSS

## Advanced Implementer Documentation

- Working with the Carafe debug console
- Advanced use of Carafe `getData` and `setData` functions
- Using Carafe to check if the runtime context `isFileMakerWebViewer`
- Working with Carafe and FM WebViewer Bridge


## Package Development

To run the project in development, you need to have [Docker](https://www.docker.com/) and
[Docker Compose](https://docs.docker.com/compose/) installed.

### Development Quick Start (See devrefresh for more info)
  - Shorthand Development Environment Refresh
    - Runs a subset of above commands to quickly refresh dev after changes have been made.
      - `./bin/devrefresh.sh`
    - To force all the Docker images to update, you can run it with the `--hard` switch
      - `./bin/devrefresh.sh --hard`

You can now preview all the Carafe packages at [http://0.0.0.0:8000](http://0.0.0.0:8000).

# Docker Development Environment

This application is running on a stock `apache2/php7.2` Docker container.
PHP dependencies are managed with Composer in `/composer.json`.
JavaScript and CSS dependencies are managed with NPM in `/package.json`.

## Developing in the /carafe-packages-src directory

While working on Carafe packages, you generally have to call webpack after every edit.
Instead you can run the following command, which will watch the directory for changes and rebuild when required:

```
docker-compose run --rm build webpack --mode development --watch
```

Development changes are output to public, so you can preview them in the development environment by refreshing [http://0.0.0.0:8000](http://0.0.0.0:8000) in your browser.

## Publishing Packages
When a package is ready to be released, run webpack in mode production to minify js and css files and deploy to `/carafe-package`. Then run the php helper script to generate a new index.html page and update the code to build the JS Fiddle links.

```
docker-compose run --rm build webpack --mode production ; docker-compose run --rm web composer build-index
```
