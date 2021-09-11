class CommentsController < ApplicationController
  def index
    # render json: comment_params
    render json: Comment.comments_for_user_or_artwork(comment_params)
  end

  def create
    comment = Comment.new(comment_params)
    if comment.save
      render json: comment
    else
      render json: comment.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    comment = Comment.find(params[:id])
    comment.destroy
    redirect_to :comments
  end

  private

  def comment_params
    params.require(:comment).permit(:user_id, :artwork_id, :body)
  end
end
