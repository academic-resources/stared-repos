# rubocop:disable all

class SessionsController < ApplicationController
  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )
    if @user
      login(@user)
      redirect_to subs_url
    else
      # render :json @user.errors.full_messages
      flash.now[:errors] = ["Please check username or password"]
      render :new
    end
  end

  def destroy
    logout
    redirect_to :subs
  end
end
