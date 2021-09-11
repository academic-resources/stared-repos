class UserMailer < ApplicationMailer
  default from: "everybody@appacademy.io"

  def welcome_email(user)
    @user = user
    @url = "http://ninetyninecats.com/login"
    mail(to: user.username, subject: "Welcome to App Academy and NinetyNine Cats")
  end
end
