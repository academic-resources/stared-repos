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
      flash.now[:message] = 'Welcome Back'
      redirect_to user_url(@user)
      # render :show
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
