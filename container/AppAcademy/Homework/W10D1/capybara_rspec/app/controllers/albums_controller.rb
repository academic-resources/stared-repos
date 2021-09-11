# rubocop:disable all
class AlbumsController < ApplicationController
  def show
    @album = Album.find_by(id: params[:id])
    render :show
  end

  def new
    @album = Album.new
    render :new
  end

  def create
    @album = Album.new(album_params)
    if @album.save
      redirect_to album_url(@album)
    else
      flash[:errors] = @album.errors.full_messages
      redirect_to albums_url
    end
  end

  def edit
    @album = Album.find_by(id: params[:id])
    render :edit
  end

  def update
    @album = Album.find_by(id: params[:id])
    if @album.update(album_params)
      render :show
    else
      flash[:errors] = @album.errors.full_messages
      redirect_to albums_url
    end
  end

  def destroy
    @album = Album.find_by(id: params[:id])
    if @album
      @band = @album.band
      @album.delete 
      redirect_to band_url(@band)
    else
      flash[:errors] = ["Problem with deleting Album"]
      render :show
    end
  end

  private

  def album_params
    params.require(:album).permit(:band_id, :title, :year, :performed)
  end
end
