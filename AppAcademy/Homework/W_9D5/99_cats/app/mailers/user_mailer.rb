class UserMailer < ApplicationMailer
  default from: 'admin@99cats.com'

  def welcome_email(user)
    @user = user
    mail(to: @user.username,
    subject: 'Welcome to 99 Cats!  SOooo many Cats!')
  end
end
