Rails.application.routes.draw do
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :index, :update, :show]
    resources :search_results, only: [:index]
    resource :session, only: [:create, :destroy]
    resources :lists, only: [:show, :index, :create, :destroy, :update]
    resources :list_items, only: [:show, :index, :create, :destroy, :update]
    resources :user_list_association, only: [:create, :destroy]
  end
  root to: 'static_pages#root'
end
