IntroRailsVideoDemo::Application.routes.draw do
  resources :cats do
    # /cats/:cat_id/toys
    resources :toys, only: [:index, :new]
  end

  # /toys/:id
  resources :toys, only: [:create, :show, :update, :destroy] do
    # /toys/:id/memories
    # 2 levels deep
    # resources :memories, only: :index
  end

  root to: redirect("/cats")
end
