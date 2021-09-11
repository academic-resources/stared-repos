class SessionsController < ApplicationController

    skip_before_action :redirect_unless_logged_in, only: [:new, :create]

    def new
        render :new
    end

    def create
        user = User.find_by_credentials(params[:user][:email], params[:user][:password])
        if user
            log_in_user!(user)
            redirect_to bands_url
        else
            flash.now[:errors] = ["Invalid username or password"]
            render :new
        end
    end

    def destroy
        current_user.reset_session_token!
        session[:session_token] = nil
        @current_user = nil
        render :new
    end


    private

    def session_params
        params.require(:user).permit(:email, :password)
    end

end