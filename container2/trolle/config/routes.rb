Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :teams, only: [:index, :create]
    resources :boards, only: [:create, :index, :update, :show] do
      resources :lists, only: [:create]
      resources :members, only: [:index]
      member do
        post "star"
        post "unstar"
        post "add_recent"
        get "matching"
        post "share"
      end
    end
    resources :lists, only: [:update] do
      resources :cards, only: [:create]
    end
    resources :cards, only: [:update] do
      member do
        post "move"
      end
    end
  end

  root to: "static_pages#root"
end
