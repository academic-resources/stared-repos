module ApplicationHelper
# <a href="<%= cat_url(cat) %>">
#   <%= cat.name %>
#   (<%= cat.description.slice(0, 20) %><%= "..." if cat.description.length > 20 %>)
# </a>

  def cat_link(cat)
    short_description = cat.description.slice(0, 20)
    short_description += "..." if cat.description.length > 20

    html = "<a href=\"#{cat_url(cat)}\">"
    html += "#{h(cat.name)} (#{h(short_description)})"
    html += "</a>"

    html.html_safe
  end
end
