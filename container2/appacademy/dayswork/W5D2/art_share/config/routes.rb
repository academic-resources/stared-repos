Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users, only: [:index, :show, :create, :update, :destroy] do
    resources :artworks, only: [:index]
    resources :likes, only: [:index]
    resources :collections, only: [:index]
  end

  resources :artworks, only: [:show, :create, :update, :destroy] do
    resources :likes, only: [:index]
  end

  resources :comments, only: [:index, :create, :destroy] do
    resources :likes, only: [:index]
  end

  resources :artwork_shares, only: [:create, :destroy]

  resources :likes, only: [:create, :destroy]

  resources :collections, only: [:show, :create, :destroy, :update] do
    resources :artworks, only: [:index]
    resources :collection_items, only: [:index]
  end

  resources :collection_items, only: [:create, :destroy]

  # get "users/:user_id/artworks", to: "artworks#index"

  # get "users", to: "users#index"
  # get "users/:id", to: "users#show"
  # post "users", to: "users#create"
  # patch "users/:id", to: "users#update"
  # put "users/:id", to: "users#update"
  # delete "users/:id", to: "users#destroy"
end
