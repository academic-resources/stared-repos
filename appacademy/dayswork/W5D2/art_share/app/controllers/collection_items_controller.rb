class CollectionItemsController < ApplicationController
  def index
    render json: CollectionItem.items_in_collection(params[:collection_id])
  end

  def create
    collection_item = CollectionItem.new(collection_item_params)
    if collection_item.save
      render json: collection_item
    else
      render json: collection_item.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    collection_item = CollectionItem.find(params[:id])
    collection_item.destroy
    render json: collection_item
  end

  private

  def collection_item_params
    params.require(:collection_item).permit(:collection_id, :artwork_id)
  end
end
