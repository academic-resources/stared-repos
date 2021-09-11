# rubocop:disable all
class BandsController < ApplicationController
  def index
    render :index
  end

  def show
    @band = Band.find_by(id: params[:id])
    render :show
  end

  def new
    @band = Band.new
    render :new
  end

  def create
    @band = Band.new(band_params)
    if @band.save
      redirect_to band_url(@band)
    else
      flash[:errors] = @band.errors.full_messages
      redirect_to bands_url
    end
  end

  def edit
    @band = Band.find_by(id: params[:id])
    render :edit
  end

  def update
    @band = Band.find_by(id: params[:id])
    if @band.update(band_params)
      render :show
    else
      flash[:errors] = @band.errors.full_messages
      redirect_to bands_url
    end
  end

  def destroy
    @band = Band.find_by(id: params[:id])
    @band.delete if @band
    render :index
  end

  private

  def band_params
    params.require(:bands).permit(:name)
  end
end

