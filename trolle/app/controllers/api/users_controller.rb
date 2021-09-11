class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    @user.username = (@user.email ? @user.email.split("@")[0] : "") + rand(10000).to_s

    if @user.save
      login(@user)
      @user = User.includes(:recently_viewed_boards).includes(:starred_boards).find(@user.id)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :name)
  end
end
