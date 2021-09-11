Rails.application.routes.draw do
  resources :books, only: [:index, :show, :new, :create, :edit, :update]
end
