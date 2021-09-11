class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_user
    # fetches the user we've logged in as
    return nil if self.session[:session_token].nil?
    @user ||= User.find_by(session_token: self.session[:session_token])
  end

  def log_in!(user)
    # force other clients to log out by regenerating token
    user.reset_session_token!
    # log this client in
    self.session[:session_token] = user.session_token
  end

  def log_out!
    self.session[:session_token] = nil
  end
end
