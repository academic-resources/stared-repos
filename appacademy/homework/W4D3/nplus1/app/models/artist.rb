class Artist < ApplicationRecord
  has_many :albums,
    class_name: "Album",
    foreign_key: :artist_id,
    primary_key: :id

  has_many :tracks,
    through: :albums,
    source: :tracks

  def n_plus_one_tracks
    albums = self.albums
    tracks_count = {}
    albums.each do |album|
      tracks_count[album.title] = album.tracks.length
    end

    tracks_count
  end

  def better_tracks_query
    self.tracks.count
  end
end
