class CommentsController < ApplicationController
  def index
    user = User.find_by(id: params[:user_id])
    artwork = Artwork.find_by(id: params[:artwork_id])
    # p comment = Comment.find_by(comment_params)
    # p comment_params

    if user && user.comments.to_a.first
      render json: user.comments
    elsif artwork && artwork.comments.to_a.first
      render json: artwork.comments
    else
      render plain: 'No comments here!'
    end
  end

  def create
    comment = Comment.new(comment_params)
    comment.artwork_id = params[:artwork_id]
    if comment.save
      render json: comment
    else
      render json: comment.error.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    comment = Comment.find(params[:id])
    if comment.destroy
      render json: comment
    else
      render json: comment.error.full_messages, status: :unprocessable_entity
    end
  end

  private

  def comment_params
    params.require(:comments).permit(:artwork_id, :user_id, :body)
  end
end
