class Api::NotesController < ApplicationController

  before_action :require_logged_in
  before_action :proper_ownership, except: [ :index, :create]

  def index
    @notes = Note.where(user_id: current_user.id)
  end


  def show
    @note = Note.find_by(id: params[:id])
  end


  def create
    @note = Note.new(note_params)
    @note.user_id = current_user.id
    if @note.save
      render :show
    else
      render json: @note.errors.full_messages, status: 422
    end
  end


  def update
    @note = Note.find(params[:id])
    if @note.update(note_params)
      render :show
    else
      render json: @note.error.full_messages, status: 422
    end
  end


  def destroy
    @note = Note.find(params[:id])
    @note.destroy
    render :show
  end


  private

  def note_params
    params.require(:note).permit(:title, :content, :plain_text, :notebook_id)
  end

  def owns_note?(note)
    current_user.id == note.user_id
  end

  def proper_ownership
    unless owns_note?(Note.find(params[:id]))
      render json: ['Permission denied: you do not own this note.'], status: 401
    end
  end


end
