Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users, only: %i[create new show]
  resource :session, only: %i[create new destroy]

  resources :bands do
    resources :albums, only: [:new]
  end

  resources :albums, except: [:new, :index]

  root to: 'sessions#new'
end
