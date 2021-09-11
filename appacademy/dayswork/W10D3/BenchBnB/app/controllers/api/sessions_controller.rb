class Api::SessionsController < ApplicationController


  def create
    @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
    if @user
      login(@user)
      render :show
    else
      render json: {errors: 'Invalid username or password'}, status: 422
    end
  end


  def destroy
    if !logged_in?
      render json: {errors: 'No user to logout'}, status: 404
    end
    logout
    render json: {}
  end



end
