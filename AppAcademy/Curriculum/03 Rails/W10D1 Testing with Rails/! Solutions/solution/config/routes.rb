Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'users#index'

  resource :session, only: [:new, :create, :destroy]
  resources :users, only: [:index, :show, :new, :create]
  resources :goals do
    resources :cheers, only: [:create]
  end
  resources :cheers, only: [:index]
  resources :comments, only: [:create]
end
