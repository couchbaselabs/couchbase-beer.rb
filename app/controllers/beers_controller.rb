class BeersController < ApplicationController
  def index
    @beers = Beer.all(:start_key => params[:start_key]).to_a
    @last_key = @beers.pop.try(:key) || filter[:start_key]
    respond_to do |format|
      format.html
      format.json do
        render :json => {:last_key => @last_key, :items => @beers}
      end
    end
  end

  def show
    @beer = Beer.find(params[:id])
  end
end
