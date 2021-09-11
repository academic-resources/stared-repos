# rubocop:disable all

class PostsController < ApplicationController
  before_action :ensure_logged_in

  def new
    @post = Post.new
    render :new
  end

  def create
    # debugger
    @post = Post.new(post_params)
    @post.author_id = current_user.id
    if @post.save
      redirect_to post_url(@post)
    else
      flash.now[:errors] = @post.errors.full_messages
      render :new
    end
  end

  def show
    @post = Post.find(params[:id])
    render :show
  end

  def edit
    @post = Post.find(params[:id])
    render :edit
  end

  def update
    @post = Post.find(params[:id])
    @post.author_id = current_user.id

    if @post.update(post_params)
      redirect_to post_url(@post)
    else
      flash[:errors] = @post.errors.full_messages
      redirect_to edit_post_url(@post)
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :url, :content, sub_ids:[])
  end


end
