# rubocop:disable all

require 'json'

class Flash
  
  def initialize(req)

    if req.cookies["_rails_lite_app_flash"]
      @first_cookie_hash = JSON.parse(req.cookies["_rails_lite_app_flash"])
      @next_cookie_hash = {}
    else
      @first_cookie_hash = {}
      @next_cookie_hash = {}
    end
  end

  def [](key)
    unless @first_cookie_hash[key.to_s].nil?
      @first_cookie_hash[key.to_s]
    else
      @next_cookie_hash[key.to_s]
    end
  end
  
  def []=(key, message)
    @next_cookie_hash[key.to_s] = message
  end
  
  def store_flash(res)
    res.set_cookie('_rails_lite_app_flash', { path: '/', value: @next_cookie_hash.to_json })
  end

  def now #durates 1 cycle
    @first_cookie_hash
  end
end
