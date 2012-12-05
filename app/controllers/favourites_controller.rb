class FavouritesController < ApplicationController
  before_filter :authenticate!

  def create
    current_user.favourites.add(params[:id])
  end
end

