class SessionsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
    if @user
      login(@user)
      redirect_to user_goals_url(current_user.id)
    else
      flash.now[:errors] = "Invalid username/password"
      render :new
    end
  end

  def destroy
    @user = User.find_by(session_token: current_user.session_token)
    log_out(@user)
    @user.destroy
    redirect_to new_session_url
  end
end
