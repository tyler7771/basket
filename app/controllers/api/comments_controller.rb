class Api::CommentsController < ApplicationController
  def index
    @comments = current_user.comments
    render :index
  end

  def show
    @comment = List.find(params[:id])
    @users = @comment.users
    render :show
  end

  def create
    @comment = List.new(comment_params)
    if @comment.save
      UserListAssociation.create(user_id: current_user.id, comment_id: @comment.id)
      @users = @comment.users
      render :show
    else
      render :json => { :errors => @comment.errors.full_messages }, :status => 422
    end
  end

  def update
    @comment = List.find(params[:id])

    if @comment.update_attributes(comment_params)
      @users = @comment.users
      render :show
    else
      render :json => { :errors => @comment.errors.full_messages }, :status => 422
    end
  end

  def destroy
    @comment = List.find(params[:id])
    if @comment.user_comment_associations.length == 1
      @association = @comment.user_comment_associations.first
      @comment.destroy
    else
      @association = UserListAssociation.where(user_id: current_user.id, comment_id: @comment.id)[0]
    end
    @association.destroy
    render :json => @comment
  end

  private
  def comment_params
    params.require(:comment).permit(:content, :user_id, :list_id)
  end
end
