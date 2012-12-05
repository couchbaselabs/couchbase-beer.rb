class DashboardsController < ApplicationController
  before_filter :authenticate!

  def show
    @favourites = Favourites.find_or_create_by_user_id(current_user.id)
  end
end
