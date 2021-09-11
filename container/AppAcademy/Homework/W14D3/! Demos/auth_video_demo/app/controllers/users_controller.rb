class UsersController < ApplicationController
  def create
    # sign up the user
    @user = User.new(user_params)
    if @user.save
      # redirect them to the new user's show page
      log_in!(@user)
      redirect_to user_url
    else
      # input didn't pass validation; re-render sign up form.
      render :new
    end
  end

  def new
    # present form for signup
    @user = User.new # dummy user object
    render :new
  end

  def show
    # show the user's details (just their username)
    if current_user.nil?
      # let them log in
      redirect_to new_session_url
      return
    end

    @user = current_user
    render :show
  end

  protected
  def user_params
    self.params.require(:user).permit(:username, :password)
  end
end
