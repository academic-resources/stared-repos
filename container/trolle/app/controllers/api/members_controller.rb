class Api::MembersController < ApplicationController
  before_action :require_logged_in

  def index
    board = Board.find(params[:board_id])
    @members = board.members
    render :index
  end
end
