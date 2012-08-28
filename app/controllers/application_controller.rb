class ApplicationController < ActionController::Base
  protect_from_forgery

  after_filter do
    expires_in 1.hour, :public => true
  end
end
