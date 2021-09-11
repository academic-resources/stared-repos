# rubocop:disable all

class SessionsController < ApplicationController
  def new
    render :new
  end

  def create
    @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
    if @user
      # debugger
      login
      flash[:message] = "Welcome back #{@user.username}!"
      redirect_to :cats
    else
      flash[:errors] = 'Error creating session'
      render :new
    end
  end

  def destroy
    # debugger
    if current_user
      logout
      flash[:message] = "You've logged out."
      redirect_to :cats
    end
  end
end
