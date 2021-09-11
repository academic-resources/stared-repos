class Api::PartiesController < ApplicationController
  def index
    @parties = Party.includes(guests: [:gifts]).all
    render :index
  end

  def show
    @party = Party.includes(guests: [:gifts]).find_by(id: params[:id])
    render :show
  end
end
