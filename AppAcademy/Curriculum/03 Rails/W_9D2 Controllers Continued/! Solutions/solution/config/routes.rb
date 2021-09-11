Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :artworks, only: [:create, :destroy, :show, :update]

  resources :artwork_shares, only: [:create, :destroy]

  resources :users, only: [:create, :destroy, :index, :show, :update] do
    resources :artworks, only: [:index]
  end

  resources :comments
end
