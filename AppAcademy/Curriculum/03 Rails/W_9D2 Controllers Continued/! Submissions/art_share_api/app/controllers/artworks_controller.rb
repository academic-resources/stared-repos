class ArtworksController < ApplicationController
  def index
    # artwork = Artwork.find_by(id: params[:id])
    # render json: Artwork.all

    user = User.find(params[:user_id])
    artworks_owned = user.artworks
    shared_artworks = user.shared_artworks
    render plain: "Artworks owned:\n #{artworks_owned.to_json}\n
                  Shared Artwork:\n #{shared_artworks.to_json}"
  end

  def show
    artwork = Artwork.find_by(id: params[:id])
    if artwork
      render json: artwork
    else
      render plain: 'Artwork does not exist'
    end
  end

  def create
    artwork = Artwork.new(artwork_params)
    if artwork.save
      render json: artwork
    else
      render json: artwork.error.full_messages, status: :unprocessable_entity
    end
  end

  def update
    artwork = Artwork.find(params[:id])
    if artwork.update(artwork_params)
      render json: artwork
    else
      render json: artwork.error.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    artwork = Artwork.find(params[:id])
    if artwork.destroy
      render json: artwork
    else
      render json: artwork.error.full_messages, status: :unprocessable_entity
    end
  end

  private

  def artwork_params
    params.require(:artworks).permit(:artist_id, :image_url, :title)
  end
end
