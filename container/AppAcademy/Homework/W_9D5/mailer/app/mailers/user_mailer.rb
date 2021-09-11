class UserMailer < ApplicationMailer
  default from: 'notifications@example.com'

  def welcome_email(user)
    attachments['filename.jpg'] = File.read('/path/to/filename.jpg')
    @user = User
    @url = 'http://example.com/login'
    mail(to: user.email,
    subject: 'Welcome to My Awesome Site')
  end

  def reminder_email(user); end
end
