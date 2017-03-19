class Api::SearchResultsController < ApplicationController
  def index
    if params[:username] == ""
      @users = []
    else
      @users = User.where("LOWER(username) LIKE LOWER(?)", "%#{params[:username]}%")
    end
    render :index
  end
end
