class ApplicationController < ActionController::Base

    helper_method :current_user, :logged_in?, :log_in!

    def current_user
        @user ||= User.find_by(session_token: session[:session_token])
    end

    def logged_in?
        !!current_user
    end

    def log_in!
        if @user
            @user.reset_session_token!
            session[:session_token] = @user.session_token
            redirect_to cats_url
        else
            redirect_to new_session_url
        end
    end

    def redirect_if_logged_in
        if logged_in?
            redirect_to cats_url
        end
    end

end
