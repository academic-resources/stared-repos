class UsersController < ApplicationController

    before_action :redirect_if_logged_in

    def new
        # @user = User.new
        render :new
    end

    def create
        @user = User.new(user_params)
        if @user.save
            log_in!
        else
            flash.now[:errors] = ['Invalid username / password']
            render :new
        end
    end

    private

    def user_params
        params.require(:user).permit(:user_name, :password)
    end

end
