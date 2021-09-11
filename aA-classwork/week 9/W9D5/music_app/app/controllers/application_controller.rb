class ApplicationController < ActionController::Base
    helper_method :current_user, :logged_in?, :log_in_user!

    before_action :redirect_unless_logged_in
    
    def current_user
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def logged_in?
        !!current_user
    end

    def log_in_user!(user)
        session[:session_token] = user.reset_session_token!
    end

    def redirect_unless_logged_in
        redirect_to new_session_url unless logged_in?
    end
end
