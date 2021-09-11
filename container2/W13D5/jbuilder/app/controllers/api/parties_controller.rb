class Api::PartiesController < ApplicationController
  def index
    @parties = Party.all.includes(:guests)
    render :index
  end

  def show
    @party = Party.includes(guests: [:gifts]).find_by(id: params[:id])
    render :show
  end
end
