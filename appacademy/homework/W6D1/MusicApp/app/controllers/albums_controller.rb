class AlbumsController < ApplicationController
  before_action :require_user

  def index
    @albums = Album.includes(:band).all
    render :index
  end

  def new
    @album = Album.new
    @bands = Band.all
    @default_band_id = params[:band_id]
    render :new
  end

  def show
    @album = Album.includes(:band).find(params[:id])
    render :show
  end

  def create
    @album = Album.new(album_params)
    if @album.save
      redirect_to albums_url
    else
      flash.now[:errors] = @album.errors.full_messages
      render :new
    end
  end

  def edit
    @album = Album.find(params[:id])
    @bands = Band.all
    render :edit
  end

  def update
    @album = Album.find(params[:id])
    if @album.update(album_params)
      redirect_to albums_url
    else
      flash.now[:errors] = @album.errors.full_messages
      render :edit
    end
  end

  def destroy
    @album = Album.find(params[:id])
    @album.destroy
    redirect_to albums_url
  end

  private

  def album_params
    params.require(:album).permit(:band_id, :title, :year, :live)
  end
end
