CouchbaseBeer::Application.routes.draw do
  root :to => 'welcome#index'
  resource :locator
  resources :beers
  resources :breweries
  resources :countries
end
