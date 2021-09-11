# rubocop:disable all

class CommentsController < ApplicationController
  
  def new
    @comment = Comment.new
    render :new
  end

  def create
    # debugger
    @comment = Comment.new(comment_params)
    @comment.author_id = current_user.id
    # @comment.post_id = params[:post_id]
    # debugger
    if @comment.save
      redirect_to post_url(@comment)
    else
      flash.now[:errors] = @comment.errors.full_messages
      render :new
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:content, :post_id)
  end
end
