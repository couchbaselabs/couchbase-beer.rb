class BeersController < ApplicationController
  def index
    filter = params.extract!(:start_key, :end_key).reject{|_, v| v.blank?}
    @beers = Beer.all(filter).to_a
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

  def edit
    @beer = Beer.find(params[:id])
  end

  def update
    @beer = Beer.find(params[:id])
    @beer.update(params[:beer], params[:cas].to_i)
    redirect_to @beer
  end
end
