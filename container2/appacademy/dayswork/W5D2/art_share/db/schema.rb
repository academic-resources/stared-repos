# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_04_09_212210) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "artwork_shares", force: :cascade do |t|
    t.integer "artwork_id", null: false
    t.integer "viewer_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["artwork_id"], name: "index_artwork_shares_on_artwork_id"
    t.index ["viewer_id", "artwork_id"], name: "index_artwork_shares_on_viewer_id_and_artwork_id", unique: true
    t.index ["viewer_id"], name: "index_artwork_shares_on_viewer_id"
  end

  create_table "artworks", force: :cascade do |t|
    t.string "title", null: false
    t.string "image_url", null: false
    t.integer "artist_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["artist_id"], name: "index_artworks_on_artist_id"
    t.index ["image_url"], name: "index_artworks_on_image_url", unique: true
    t.index ["title", "artist_id"], name: "index_artworks_on_title_and_artist_id", unique: true
  end

  create_table "collection_items", force: :cascade do |t|
    t.integer "collection_id", null: false
    t.integer "artwork_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["artwork_id"], name: "index_collection_items_on_artwork_id"
    t.index ["collection_id", "artwork_id"], name: "index_collection_items_on_collection_id_and_artwork_id", unique: true
  end

  create_table "collections", force: :cascade do |t|
    t.integer "user_id", null: false
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_collections_on_name"
    t.index ["user_id"], name: "index_collections_on_user_id"
  end

  create_table "comments", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "artwork_id", null: false
    t.string "body", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["artwork_id"], name: "index_comments_on_artwork_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "likes", force: :cascade do |t|
    t.string "likeable_type"
    t.bigint "likeable_id"
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["likeable_id", "user_id", "likeable_type"], name: "index_likes_on_likeable_id_and_user_id_and_likeable_type", unique: true
    t.index ["likeable_type", "likeable_id"], name: "index_likes_on_likeable_type_and_likeable_id"
    t.index ["user_id"], name: "index_likes_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["username"], name: "index_users_on_username", unique: true
  end
end
