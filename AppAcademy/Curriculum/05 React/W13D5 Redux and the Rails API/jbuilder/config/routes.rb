Rails.application.routes.draw do
  # Your routes here!
  namespace :api, defaults: { format: :json } do
    resources :guests, only: %i[show index] do
      resources :gifts, only: %i[index]
    end
    resources :gifts, only: %i[show]
    resources :parties, only: %i[show index]
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
