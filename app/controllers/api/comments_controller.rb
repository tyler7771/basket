class Api::CommentsController < ApplicationController
  def index
    @lists = current_user.lists
    render :index
  end

  def show
    @list = List.find(params[:id])
    @users = @list.users
    render :show
  end

  def create
    @list = List.new(list_params)
    if @list.save
      UserListAssociation.create(user_id: current_user.id, list_id: @list.id)
      @users = @list.users
      render :show
    else
      render :json => { :errors => @list.errors.full_messages }, :status => 422
    end
  end

  def update
    @list = List.find(params[:id])

    if @list.update_attributes(list_params)
      @users = @list.users
      render :show
    else
      render :json => { :errors => @list.errors.full_messages }, :status => 422
    end
  end

  def destroy
    @list = List.find(params[:id])
    if @list.user_list_associations.length == 1
      @association = @list.user_list_associations.first
      @list.destroy
    else
      @association = UserListAssociation.where(user_id: current_user.id, list_id: @list.id)[0]
    end
    @association.destroy
    render :json => @list
  end

  private
  def list_params
    params.require(:list)
    .permit(:name)
  end
end
