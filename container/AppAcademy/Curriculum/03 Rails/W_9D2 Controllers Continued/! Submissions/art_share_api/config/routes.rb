Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :users, only: %i[index show create update destroy] do
    resources :artworks, only: %i[index]
    resources :comments, only: %i[index create]
  end

  resources :artworks, only: %i[show create update destroy] do
    resources :comments, only: %i[index]
  end

  resources :artwork_shares, only: %i[create destroy]

  resources :comments, only: %i[destroy]

  # get '/users', to: 'users#index'
  # get '/users/:id', to: 'users#show', as: 'user'
  # get '/users/new', to: 'users#new'
  # post '/users', to: 'users#create', as: 'new_user'
  # patch '/users/:id', to: 'users#update'
  # delete '/users/:id', to: 'users#destroy'
end
