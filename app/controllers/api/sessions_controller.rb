class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credintials(
      params[:user][:username],
      params[:user][:password]
    )

    if @user == "password"
      render :json => { :errors => ["Password incorrect"] }, :status => 401
    elsif @user.nil?
      render :json => { :errors => ["Username not found"] }, :status => 404
    else
      sign_in(@user)
      render './api/users/show'
    end
  end

  def destroy
    if current_user
      sign_out
      render json: {}
    else
      render :json => { :errors => ["User not found"] }, :status => 404
    end
  end
end
