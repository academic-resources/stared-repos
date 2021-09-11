class ApplicationController < ActionController::Base
  helper_method :current_user

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def login(user)
    @current_user = user
    @current_user.reset_session_token!
    session[:session_token] = @current_user.session_token
  end

  def log_out(user)
    user.reset_session_token!
    session[:session_token] = nil
    @current_user = nil
  end

  def ensure_logged_in
    redirect_to new_session_url unless !!current_user
  end
end
