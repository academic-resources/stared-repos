class PostsController < ApplicationController
  before_action :ensure_ownership, only: [:edit, :update]

  def new
    @sub_id = params[:id]
    @post = Post.new
  end

  def show
    @post = Post.find(params[:id])
  end

  def create
    @post = current_user.posts.new(post_params)
    @post.sub_id = params[:sub_id]
    if @post.save
      redirect_to post_url(@post)
    else
      flash.now[:errors] = @post.errors.full_messages
      @sub_id = params[:sub_id]
      render :new
    end
  end

  def edit
    @sub_id = params[:id]
    # @post = Post.find(params[:id])
  end

  def update
    @post.author_id = current_user.id
    @post.sub_id = params[:sub_id]
    if @post.update(post_params)
      redirect_to post_url(@post)
    else
      flash.now[:errors] = @post.errors.full_messages
      @sub_id = params[:sub_id]
      render :edit
    end
  end

  def destroy
    @post = current_user.posts.find(params[:id])
    @post.destroy
    redirect_to subs_url
  end

  private

  def ensure_ownership
    @post = current_user.posts.find(params[:id])
    redirect_to post_url(params[:id]) unless @post
  end

  def post_params
    params.require(:post).permit(:title, :url, :content)
  end
end
