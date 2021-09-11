Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users, only: %i[new create]
  resource :session, only: %i[new create destroy]
  resources :subs, except: %i[destroy]
  resources :posts, except: %i[index destroy] do
    resources :comments, only: %i[new]
  end
  resources :comments, except: %i[new index destroy]
end
