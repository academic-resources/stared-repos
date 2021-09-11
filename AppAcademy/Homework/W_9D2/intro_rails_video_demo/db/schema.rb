# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20140715044720) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cats", force: true do |t|
    t.string   "name",        null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "skill"
    t.string   "coat_color",  null: false
    t.text     "description", null: false
  end

  create_table "taggings", force: true do |t|
    t.integer  "cat_id",     null: false
    t.integer  "tag_id",     null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "taggings", ["cat_id", "tag_id"], name: "index_taggings_on_cat_id_and_tag_id", unique: true, using: :btree
  add_index "taggings", ["cat_id"], name: "index_taggings_on_cat_id", using: :btree
  add_index "taggings", ["tag_id"], name: "index_taggings_on_tag_id", using: :btree

  create_table "tags", force: true do |t|
    t.string   "name",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "tags", ["name"], name: "index_tags_on_name", unique: true, using: :btree

  create_table "toys", force: true do |t|
    t.integer  "cat_id",     null: false
    t.string   "name",       null: false
    t.string   "ttype",      null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
