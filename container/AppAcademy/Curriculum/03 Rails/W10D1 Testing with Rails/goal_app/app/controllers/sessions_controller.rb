class SessionsController < ApplicationController
  def new
    @user = User.new
    render :new
  end

  def create
    # debugger
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )
    if @user
      session[:session_token] = @user.reset_session_token!
      redirect_to user_url(@user)
    else
      flash.now[:errors] = 'Invalid Credentials'
      render :new
    end
  end

  def destroy
    current_user.reset_session_token!
    session[:session_token] = nil
  end
end
