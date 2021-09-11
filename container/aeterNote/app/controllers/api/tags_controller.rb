class Api::TagsController < ApplicationController

  before_action :require_logged_in
  before_action :proper_ownership, only: [:show, :update, :destroy]


  def index
    @tags = Tag.where(user_id: current_user.id)
  end

  def show
    @tag = Tag.find(params[:id])
  end

  def create
    @tag = Tag.new(tag_params)
    @tag.user_id = current_user.id
    if @tag.save
      if params[:note_id]
        Tagging.create(note_id: params[:note_id], tag_id: @tag.id)
      end
      render :show
    else
      render json: @tag.errors.full_messages, status: 422
    end
  end

  def update
    @tag = Tag.find(params[:id])
    if @tag.update(tag_params)
      render :show
    else
      render json: @tag.errors.full_messages, status: 422
    end
  end

  def destroy
    @tag = Tag.find(params[:id])
    @tag.destroy
    render :show
  end

  def add_tagging
    @tagging = Tagging.new(tagging_params)
    if @tagging.save
      @tags = Tag.where(user_id: current_user.id)
      @tag_message = ['Tag Added']
      render :tagging
    else
      render json: @tagging.errors.full_messages, status: 422
    end
  end

  def remove_tagging
    @tagging = Tagging.find_by(note_id: tagging_params[:note_id], tag_id: tagging_params[:tag_id])
    if @tagging.destroy
      @tags = Tag.where(user_id: current_user.id)
      @tag_message = ['TagRemoved']
      render :tagging
    else
      render json: @tagging.errors.full_messages, status: 422
    end
  end



private

def tag_params
  params.require(:tag).permit(:label, :user_id)
end

def tagging_params
  params.require(:tagging).permit(:tag_id, :note_id)
end

def owns_tag?(tag)
  current_user.id == tag.user_id
end

def proper_ownership
  unless owns_tag?(Tag.find(params[:id]))
    render json: ['Permission denied: you do not own these tags'], status: 401
  end
end



end
