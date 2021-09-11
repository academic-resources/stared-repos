module ApplicationHelper
  def highlight(text)
    "<strong class=\"highlight\">#{h(text)}</strong>".html_safe
  end

  def picture_for(user)
    html = '<div class="user-picture">'
    html += "<img src=\"#{user.picture_url}\" alt=\"#{h(user.name)}\">"
    html += '</div>'

    html.html_safe
  end

  def long_quote(author, &block)
    text = capture(&block)

    html = "<blockquote cite=\"#{h(author)}\">"
    html += text
    html += '</blockquote>'

    html.html_safe
  end
end
