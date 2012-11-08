# Be sure to restart your server when you modify this file.

CouchbaseBeer::Application.config.session_store :cookie_store, :key => '_couchbase-beer_session'

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rails generate session_migration")
# CouchbaseBeer::Application.config.session_store :active_record_store

# Use the Couchbase for sessions instead of the cookie-based default,
# Don't forget to create the bucket
#
# require 'action_dispatch/middleware/session/couchbase_store'
# config.session_store :couchbase_store, :namespace => "beer:", :couchbase => {:bucket => 'session'}

