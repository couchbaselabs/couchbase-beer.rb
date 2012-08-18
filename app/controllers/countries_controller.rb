class CountriesController < ApplicationController
  def index
    @countries = Brewery.by_country
  end

  def show
    @breweries = Brewery.by_country(:group => false,
                                    :reduce => false,
                                    :include_docs => true,
                                    :start_key => params[:id],
                                    :end_key => "#{params[:id]}\uefff")
  end
end
