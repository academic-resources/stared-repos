class SessionsController < ApplicationController
  before_action :ensure_logged_in, only: %i[destroy]

  def new
    render :new
  end

  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )
    if @user
      log_in_user!(@user)
      redirect_to user_url(@user)
    else
      flash[:errors] = ['User login failed. Check your Email and Password']
      # render plain: 'not logged in something wrong.'
      redirect_to new_session_url
    end
  end

  def destroy
    logout
    # render plain: 'logged out'
    render :new
  end

  private

  # def session_params
  #   params.require(:session).permit(:email, :password, :session_token)
  # end
end
