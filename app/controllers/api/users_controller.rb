class Api::UsersController < ApplicationController
  def index
    @users = List.find(params[:id]).users
    render :index
  end

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in(@user)
      render :show
    else
      render :json => { :errors => @user.errors.full_messages }, :status => 422
    end
  end

  def update
    @user = User.find(params[:id])

    if @user.update_attributes(user_params)
      render :show
    else
      render :json => { :errors => @user.errors.full_messages }, :status => 422
    end
  end

  def show
    @user = User.find(params[:id])
  end

  private
  def user_params
    params.require(:user).permit(:email, :username, :password)
  end
end
