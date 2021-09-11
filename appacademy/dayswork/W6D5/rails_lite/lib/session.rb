require "json"

class Session
  # find the cookie for this app
  # deserialize the cookie into a hash
  def initialize(req)
    @rl_cookie = req.cookies["_rails_lite_app"] ? JSON.parse(req.cookies["_rails_lite_app"]) : {}
  end

  def [](key)
    @rl_cookie[key]
  end

  def []=(key, val)
    @rl_cookie[key] = val
  end

  # serialize the hash into json and save in a cookie
  # add to the responses cookies
  def store_session(res)
    res.set_cookie("_rails_lite_app", {
      path: "/",
      value: @rl_cookie.to_json,
    })
  end
end
