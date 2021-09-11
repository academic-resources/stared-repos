# json.currentUser do
  json.extract! @user, :id, :email, :notebook_ids
# end
#
# json.notebooks do
#   @user.notebooks.each do |notebook|
#     json.set! notebook.id do
#       json.partial! 'api/notebooks/notebook', notebook: notebook
#     end
#   end
# end
