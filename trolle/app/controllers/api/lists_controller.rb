class Api::ListsController < ApplicationController
  def create
    @board = Board.find(params[:board_id])
    @board.lists.create(list_params)
    @board = Board.find(params[:board_id])
    render "api/boards/show.json.jbuilder"
  end

  def update
    @list = List.find(params[:id])
    @list.update(list_params)
    @board = Board.find(@list.board_id)
    render "api/boards/show.json.jbuilder"
  end

  private

  def list_params
    params.require(:list).permit(:title)
  end
end
