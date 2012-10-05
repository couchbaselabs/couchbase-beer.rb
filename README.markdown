# Beer.rb

This application demostrate the how to write rails application using
Couchbase 2.0 server.

## Installation & Configuration

1. Install recent Couchbase server 2.0 (beta)

2. Checkout this application

        git clone git://github.com/avsej/couchbase-beer.rb.git beer.rb

3. Install all dependencies

        cd beer.rb
        gem install bundler
        bundle install

4. Update [config/couchbase.yml][1] if needed, or just inspect its contents

        cat config/couchbase.yml
        
5. Run the application. It will use `thin` server, you would like to use 
   another one, you should update Gemfile (comment out the thin gem there). 

        rails server

6. Navigate to `http://localhost:3000`

7. Optionally. If you are going to deploy application using capistrano,
   you should update [config/deploy.rb][2].

## Interesting Points

    app/models/
    ├── beer
    │   ├── all
    │   │   └── map.js
    │   └── by_category
    │       ├── map.js
    │       └── reduce.js
    ├── beer.rb
    ├── brewery
    │   ├── all
    │   │   └── map.js
    │   ├── all_with_beers
    │   │   └── map.js
    │   ├── by_country
    │   │   ├── map.js
    │   │   └── reduce.js
    │   └── points
    │       └── spatial.js
    └── brewery.rb

The application use two models: [Beer][3] and [Brewery][4]. Also it
defines views for them, you can find them in corresponding directories
[app/models/beer][5] and [app/models/brewery][6]. You can read more
about this directory structure in the [README][7] of the
[couchbase-model][8] ruby gem.

Couchbase as a cache storage: there is another bucket should be
configured and mentioned in [config/application.rb:68][9] to replace
default cache store in Rails and use Couchbase server instead.


[1]: https://github.com/avsej/couchbase-beer.rb/blob/master/config/couchbase.yml
[2]: https://github.com/avsej/couchbase-beer.rb/blob/master/config/deploy.rb
[3]: https://github.com/avsej/couchbase-beer.rb/blob/master/app/models/beer.rb
[4]: https://github.com/avsej/couchbase-beer.rb/blob/master/app/models/brewery.rb
[5]: https://github.com/avsej/couchbase-beer.rb/blob/master/app/models/beer
[6]: https://github.com/avsej/couchbase-beer.rb/blob/master/app/models/brewery
[7]: https://github.com/couchbase/couchbase-ruby-model#readme
[8]: https://rubygems.org/gems/couchbase-model
[9]: https://github.com/avsej/couchbase-beer.rb/blob/master/config/application.rb#L68
