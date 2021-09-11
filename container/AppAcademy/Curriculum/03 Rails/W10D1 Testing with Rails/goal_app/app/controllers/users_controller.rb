class UsersController < ApplicationController
  def index
    render :index
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render :show
    else
      flash[:errors] = @user.errors.full_messages
      redirect_to :new_user
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end
end
