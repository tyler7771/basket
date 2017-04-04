class Api::CommentsController < ApplicationController
  def index
    @comments = List.find(params[:id]).comments
    render :index
  end

  def show
    @comment = Comment.find(params[:id])
    render :show
  end

  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      render :show
    else
      render :json => { :errors => @comment.errors.full_messages }, :status => 422
    end
  end

  def update
    @comment = Comment.find(params[:id])

    if @comment.update_attributes(comment_params)
      render :show
    else
      render :json => { :errors => @comment.errors.full_messages }, :status => 422
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    render :json => @comment
  end

  private
  def comment_params
    params.require(:comment).permit(:content, :user_id, :list_id, :list_item_id)
  end
end
