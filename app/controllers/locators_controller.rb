class LocatorsController < ApplicationController
  def show
    respond_to do |format|
      format.html
      format.json do
        @breweries = Brewery.points(params.extract!(:bbox))
        render :json => @breweries
      end
    end
  end
end
