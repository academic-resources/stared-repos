class UsersController < ApplicationController
  def new
    render :new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      # user needs to receive flash that they've been logged in
      redirect_to :cats
    else
      flash.now[:errors] = 'Error creating user'
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
