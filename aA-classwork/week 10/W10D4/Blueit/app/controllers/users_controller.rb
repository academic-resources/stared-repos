class UsersController < ApplicationController

    def new

    end

    def create
        @user = User.new(user_params)
        if @user.save
            log_in!(@user)
            redirect_to subs_url
        else
            flash.now[:errors] = @user.errors.full_messages
            render :new
        end
    end

    private

    def user_params
        params.require(:user).permit(:username, :password)
    end
end
