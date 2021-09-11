Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users, only: [:index, :show, :create, :update, :destroy] do
    resources :artworks, only: [:index]
  end

  resources :artworks, only: [:show, :create, :update, :destroy]
  resources :artwork_shares, only: [:create, :destroy]

  # get "users/:user_id/artworks", to: "artworks#index"

  # get "users", to: "users#index"
  # get "users/:id", to: "users#show"
  # post "users", to: "users#create"
  # patch "users/:id", to: "users#update"
  # put "users/:id", to: "users#update"
  # delete "users/:id", to: "users#destroy"
end
