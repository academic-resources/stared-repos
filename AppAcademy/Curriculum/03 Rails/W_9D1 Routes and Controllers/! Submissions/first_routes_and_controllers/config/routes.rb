# frozen_string_literal: true

Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # resources :users

  get '/users', to: 'users#index'
  get '/users/:id', to: 'users#show', as: 'user'
  get '/users/new', to: 'users#new'
  post '/users', to: 'users#create', as: 'new_user'
  patch '/users/:id', to: 'users#update'
  delete '/users/:id', to: 'users#destroy'
end
