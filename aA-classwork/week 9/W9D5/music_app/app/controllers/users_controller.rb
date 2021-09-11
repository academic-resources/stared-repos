class UsersController < ApplicationController
    skip_before_action :redirect_unless_logged_in, only: [:new, :create]
    
    def new
        render :new
    end

    def create
        @user = User.new(user_params)
        if @user.save
            @user.reset_session_token!
            session[:session_token] = @user.session_token
            redirect_to bands_url
        else
            flash.now[:errors] = @user.errors.full_messages
            render :new
        end
    end

    def show
        @user = User.find(params[:id])
        render :show
    end



    private

    def user_params
        params.require(:user).permit(:email, :password)
    end

end