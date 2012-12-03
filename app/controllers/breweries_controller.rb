class BreweriesController < ApplicationController
  def index
    filter = params.extract!(:start_key, :end_key).reject{|_, v| v.blank?}
    @breweries = Brewery.all(filter).to_a
    if @breweries.size > 30
      @last_key = @breweries.pop.try(:key)
    end
    respond_to do |format|
      format.html
      format.json do
        render :json => {:last_key => @last_key, :items => @breweries}
      end
    end
  end

  def show
    @brewery, *@beers = Brewery.all_with_beers(:start_key => [params[:id]],
                                               :end_key => ["#{params[:id]}\uefff"]).to_a
  end
end
