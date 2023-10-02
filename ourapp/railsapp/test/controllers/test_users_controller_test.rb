require "test_helper"

class TestUsersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @test_user = test_users(:one)
  end

  test "should get index" do
    get test_users_url
    assert_response :success
  end

  test "should get new" do
    get new_test_user_url
    assert_response :success
  end

  test "should create test_user" do
    assert_difference("TestUser.count") do
      post test_users_url, params: { test_user: { bio: @test_user.bio, birthday: @test_user.birthday, gender: @test_user.gender, join_date: @test_user.join_date, location: @test_user.location, name: @test_user.name, password: @test_user.password, preferences: @test_user.preferences } }
    end

    assert_redirected_to test_user_url(TestUser.last)
  end

  test "should show test_user" do
    get test_user_url(@test_user)
    assert_response :success
  end

  test "should get edit" do
    get edit_test_user_url(@test_user)
    assert_response :success
  end

  test "should update test_user" do
    patch test_user_url(@test_user), params: { test_user: { bio: @test_user.bio, birthday: @test_user.birthday, gender: @test_user.gender, join_date: @test_user.join_date, location: @test_user.location, name: @test_user.name, password: @test_user.password, preferences: @test_user.preferences } }
    assert_redirected_to test_user_url(@test_user)
  end

  test "should destroy test_user" do
    assert_difference("TestUser.count", -1) do
      delete test_user_url(@test_user)
    end

    assert_redirected_to test_users_url
  end
end