class NotesController < ApplicationController
  before_action :require_user!

  def create
    note = current_user.notes.new(note_params)
    note.save
    flash[:errors] = note.errors.full_messages

    redirect_to track_url(note.track_id)
  end

  def destroy
    note = current_user.notes.find(params[:id])
    note.destroy
    redirect_to track_url(note.track_id)
  end

  private
  
  def note_params
    params.require(:note).permit(:content, :track_id)
  end
end
