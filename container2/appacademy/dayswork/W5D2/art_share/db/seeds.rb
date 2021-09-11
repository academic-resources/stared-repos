# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

ArtworkShare.destroy_all
Artwork.destroy_all
User.destroy_all

User.create(username: "civicdrainer")
User.create(username: "brightonzenyatta")
User.create(username: "zirconnail")
User.create(username: "congolesepager")
User.create(username: "concavebrady")
User.create(username: "toasteddroppings")
User.create(username: "borealisharris")
User.create(username: "goutcabbage")

#  Artwork
#  title      :string           not null
#  image_url  :string           not null
#  artist_id  :integer          not null

all_users = User.all

Artwork.create(title: "Stockton", image_url: "http://Stockton.com", artist_id: all_users.sample.id)
Artwork.create(title: "CaliforniaOakland", image_url: "http://CaliforniaOakland.com", artist_id: all_users.sample.id)
Artwork.create(title: "CaliforniaLexington-Fayette", image_url: "http://CaliforniaLexington-Fayette.com", artist_id: all_users.sample.id)
Artwork.create(title: "KentuckyOmaha", image_url: "http://KentuckyOmaha.com", artist_id: all_users.sample.id)
Artwork.create(title: "NebraskaMiami", image_url: "http://NebraskaMiami.com", artist_id: all_users.sample.id)
Artwork.create(title: "FloridaAlbuquerque", image_url: "http://FloridaAlbuquerque.com", artist_id: all_users.sample.id)
Artwork.create(title: "New MexicoLincoln", image_url: "http://New MexicoLincoln.com", artist_id: all_users.sample.id)
Artwork.create(title: "NebraskaNorfolk", image_url: "http://NebraskaNorfolk.com", artist_id: all_users.sample.id)
Artwork.create(title: "VirginiaAnchorage", image_url: "http://VirginiaAnchorage.com", artist_id: all_users.sample.id)
Artwork.create(title: "AlaskaLubbock", image_url: "http://AlaskaLubbock.com", artist_id: all_users.sample.id)
Artwork.create(title: "Texas", image_url: "http://Texas.com", artist_id: all_users.sample.id)

all_artwork = Artwork.all
40.times { ArtworkShare.create(artwork_id: all_artwork.sample.id, viewer_id: all_users.sample.id) }
