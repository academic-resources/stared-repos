Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: redirect('/bands')

  resource :session, only: [:new, :create, :destroy]

  resources :users, only: [:show, :new, :create] do
    get :activate, on: :collection
  end

  resources :bands do
    resources :albums, only: [:new]
  end

  resources :albums, only: [:show, :create, :edit, :update, :destroy] do
    resources :tracks, only: [:new]
  end

  resources :tracks, only: [:show, :create, :edit, :update, :destroy,]

  resources :notes, only: [:create, :destroy]
end
