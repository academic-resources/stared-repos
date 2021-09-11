class CollectionsController < ApplicationController
  def index
    render json: Collection.collections_for_user(params[:user_id])
  end

  def show
    render json: Collection.find(params[:id])
  end

  def create
    collection = Collection.new(collection_params)
    if collection.save
      render json: collection
    else
      render json: collection.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    collection = Collection.find(params[:id])
    if collection.update(collection_params)
      render json: collection
    else
      render json: collection.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    collection = Collection.find(params[:id])
    collection.destroy
    render json: collection
  end

  private

  def collection_params
    params.require(:collection).permit(:user_id, :name)
  end
end
