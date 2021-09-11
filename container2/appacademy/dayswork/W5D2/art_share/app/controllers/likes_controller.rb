class LikesController < ApplicationController
  def index
    if params[:artwork_id]
      result = Like.users_liking_artwork(params[:artwork_id])
    elsif params[:comment_id]
      result = Like.users_liking_comment(params[:comment_id])
    elsif params[:user_id]
      result = Like.items_liked_by_user(params[:user_id])
    else
      result = []
    end
    render json: result
  end

  def create
    if like_params[:artwork_id]
      likeable = Artwork.find(like_params[:artwork_id])
    else
      likeable = Comment.find(like_params[:comment_id])
    end
    like = Like.new(
      {
        user_id: like_params[:user_id],
        likeable: likeable,
      }
    )
    if like.save
      render json: like
    else
      render json: like.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    like = Like.find(params[:id])
    like.destroy
    render json: like
  end

  private

  def like_params
    params.require(:like).permit(:user_id, :artwork_id, :comment_id)
  end
end
