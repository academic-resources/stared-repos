require 'test_helper'

class TodosControllerTest < ActionDispatch::IntegrationTest
  test "should get api/" do
    get todos_api/_url
    assert_response :success
  end

end
