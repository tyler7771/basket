class Api::ListItemsController < ApplicationController
  def index
    @items = List.find(params[:id]).list_items.includes(:user)
    render :index
  end

  def show
    @item = ListItem.find(params[:id])
  end

  def create
    @item = ListItem.new(item_params)
    @item.user_id = nil if @item.user_id == ""
    if @item.save
      render :show
    else
      render :json => { :errors => @item.errors.full_messages }, :status => 422
    end
  end

  def update
    @item = ListItem.find(params[:id])

    if @item.update_attributes(item_params)
      render :show
    else
      render :json => { :errors => @item.errors.full_messages }, :status => 422
    end
  end

  def destroy
    @item = ListItem.find(params[:id])
    @item.destroy
    render :json => @item
  end

  private
  def item_params
    params.require(:item)
    .permit(:name, :user_id, :list_id, :quantity, :purchased)
  end
end
