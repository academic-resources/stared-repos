class SessionsController < ApplicationController

    before_action :redirect_if_logged_in, only: [:new, :create]

    def new
        # @user = User.new
        render :new
    end

    def create
        @user = User.find_by_credentials(params[:user][:user_name], params[:user][:password])
        if @user
            log_in!
        else
            flash.now[:errors] = ["Invalid username/password"]
            render :new
        end
    end
    
    def destroy
        current_user.reset_session_token! if current_user
        session[:session_token] = nil
        flash[:messages] = 'Successfully Logged out'
        redirect_to cats_url
    end

    private

    # def session_params
    #     params.require(:session).permit(:user_name, :password)
    # end
    
end
