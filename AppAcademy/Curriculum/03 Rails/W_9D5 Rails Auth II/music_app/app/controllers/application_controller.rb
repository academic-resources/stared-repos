# rubocop:disable all

class ApplicationController < ActionController::Base
  # L CELL
  helper_method :current_user, :logged_in?, :logout

  def log_in_user!(user)
    @user = user
    session[:session_token] = user.reset_session_token!
   end

  def current_user
    @user ||= User.find_by(session_token: session[:session_token])
  end

  def ensure_logged_in
    redirect_to new_session_url unless logged_in?
  end

  def logged_in?
    !!current_user
  end

  def logout
    current_user.reset_session_token!
    session[:session_token] = nil
   end
end
