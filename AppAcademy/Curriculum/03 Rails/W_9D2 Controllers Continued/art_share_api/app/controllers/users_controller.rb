class UsersController < ApplicationController
  def index
    search_string = params[:username]
    list = User.where("users.username iLIKE '%#{search_string}%'")
    if list.empty?
      render json: User.all
    else
      render json: list
    end
  end

  def show
    user = User.find_by(id: params[:id])
    if user
      render json: user
    else
      render plain: 'User does not exist'
    end
  end

  def create
    user = User.new(user_params)
    # replace the `user_attributes_here` with the actual attribute keys
    if user.save
      render json: user
    else
      render json: user.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    user = User.find(params[:id])
    if user.update(user_params)
      render json: user
    else
      render json: user.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    user = User.find(params[:id])
    if user.destroy
      # redirect_to :users
      render json: user
    else
      render json: user.errors.full_messages, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:users).permit(:username)
  end
end
