class SessionsController < ApplicationController
  # before_action :require_no_user, only: [:new, :create]

  def new
    render :new
  end

  def create
    user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    if user
      login_user!(user)
      redirect_to user_url(user)
    else
      flash.now[:errors] = ["Bad username and/or password "]
      render :new
    end
  end

  def destroy
    logout!
    redirect_to new_session_url
  end
end
