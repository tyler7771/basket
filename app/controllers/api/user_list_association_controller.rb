class Api::UserListAssociationController < ApplicationController
  def create
    @association = UserListAssociation.new(association_params)
    if @association.save
      render :json => {:status => 200}
    else
      render :json => { :errors => @association.errors.full_messages }, :status => 422
    end
  end

  def destroy
    @association = UserListAssociation.find(params[:id])
    @association.destroy
    render :json => @association
  end

  private
  def association_params
    params.require(:association).permit(:user_id, :list_id)
  end
end
