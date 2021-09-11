Rails.application.routes.draw do
  root to: "static_pages#root"
  namespace :api, defaults: { format: :json } do
    resources :todos, except: [:new, :edit] do
      resources :steps, only: [:index, :create]
    end
    resources :steps, only: [:update, :destroy]
  end
end

#                    Prefix Verb   URI Pattern                                                                              Controller#Action
#                      root GET    /                                                                                        static_pages#root
#            api_todo_steps GET    /api/todos/:todo_id/steps(.:format)                                                      api/steps#index {:format=>:json}
#                           POST   /api/todos/:todo_id/steps(.:format)                                                      api/steps#create {:format=>:json}
#                 api_todos GET    /api/todos(.:format)                                                                     api/todos#index {:format=>:json}
#                           POST   /api/todos(.:format)                                                                     api/todos#create {:format=>:json}
#                  api_todo GET    /api/todos/:id(.:format)                                                                 api/todos#show {:format=>:json}
#                           PATCH  /api/todos/:id(.:format)                                                                 api/todos#update {:format=>:json}
#                           PUT    /api/todos/:id(.:format)                                                                 api/todos#update {:format=>:json}
#                           DELETE /api/todos/:id(.:format)                                                                 api/todos#destroy {:format=>:json}
#                  api_step PATCH  /api/steps/:id(.:format)                                                                 api/steps#update {:format=>:json}
#                           PUT    /api/steps/:id(.:format)                                                                 api/steps#update {:format=>:json}
#                           DELETE /api/steps/:id(.:format)                                                                 api/steps#destroy {:format=>:json}
#        rails_service_blob GET    /rails/active_storage/blobs/:signed_id/*filename(.:format)                               active_storage/blobs#show
# rails_blob_representation GET    /rails/active_storage/representations/:signed_blob_id/:variation_key/*filename(.:format) active_storage/representations#show
#        rails_disk_service GET    /rails/active_storage/disk/:encoded_key/*filename(.:format)                              active_storage/disk#show
# update_rails_disk_service PUT    /rails/active_storage/disk/:encoded_token(.:format)                                      active_storage/disk#update
#      rails_direct_uploads POST   /rails/active_storage/direct_uploads(.:format)  

