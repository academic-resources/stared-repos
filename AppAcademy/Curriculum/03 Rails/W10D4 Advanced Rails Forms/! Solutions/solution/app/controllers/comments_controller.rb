class CommentsController < ApplicationController
  before_action :require_signed_in!, only: [:new, :create]

  def new
    @comment = Comment.new(post_id: params[:post_id])
  end

  def create
    @comment = current_user.comments.new(comment_params)

    if @comment.save!
      redirect_to post_url(@comment.post_id)
    else
      flash[:errors] = @comment.errors.full_messages
      redirect_to new_post_comment_url(@comment.post_id)
    end
  end

  def show
    @comment = Comment.find(params[:id])
    @new_comment = @comment.child_comments.new
  end

  def downvote
    vote(-1)
  end

  def upvote
    vote(1)
  end

  private
  def comment_params
    params.require(:comment).permit(:body, :post_id, :parent_comment_id)
  end

  def vote(direction)
    @comment = Comment.find(params[:id])
    @user_vote = @comment.user_votes.find_or_initialize_by(user: current_user)

    unless @user_vote.update(value: direction)
      flash[:errors] = @user_vote.errors.full_messages
    end

    redirect_to comment_url(@comment)
  end
end
