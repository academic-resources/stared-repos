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

ActiveRecord::Schema.define(version: 20170703203953) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.text "body", null: false
    t.integer "parent_comment_id"
    t.integer "post_id", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["parent_comment_id"], name: "index_comments_on_parent_comment_id"
    t.index ["post_id"], name: "index_comments_on_post_id"
    t.index ["user_id"], name: "index_comments_on_user_id"
  end

  create_table "post_subs", force: :cascade do |t|
    t.integer "post_id", null: false
    t.integer "sub_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["post_id", "sub_id"], name: "index_post_subs_on_post_id_and_sub_id", unique: true
    t.index ["post_id"], name: "index_post_subs_on_post_id"
    t.index ["sub_id"], name: "index_post_subs_on_sub_id"
  end

  create_table "posts", force: :cascade do |t|
    t.string "title", null: false
    t.string "url"
    t.text "content"
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_posts_on_user_id"
  end

  create_table "subs", force: :cascade do |t|
    t.integer "moderator_id", null: false
    t.string "name", null: false
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["moderator_id"], name: "index_subs_on_moderator_id"
    t.index ["name"], name: "index_subs_on_name", unique: true
  end

  create_table "user_votes", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "value", null: false
    t.integer "votable_id", null: false
    t.string "votable_type", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "votable_type", "votable_id"], name: "index_user_votes_on_user_id_and_votable_type_and_votable_id", unique: true
    t.index ["user_id"], name: "index_user_votes_on_user_id"
    t.index ["votable_type", "votable_id"], name: "index_user_votes_on_votable_type_and_votable_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_users_on_name", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

end
