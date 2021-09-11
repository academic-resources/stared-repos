class UsersController < ApplicationController
  def show
    # render json: User.find(params[:id])
    redirect_to :bands
   end

  def new
    render :new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in_user!(@user)
      flash[:message] = 'Welcome Back'
      # redirect_to user_url(@user)
      redirect_to :bands
      # render :show
    else
      flash[:errors] = @user.errors.full_messages
      redirect_to new_user_url
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
