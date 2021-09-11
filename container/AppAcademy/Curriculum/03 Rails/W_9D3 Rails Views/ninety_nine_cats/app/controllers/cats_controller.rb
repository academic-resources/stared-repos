class CatsController < ApplicationController
  def index
    @cats = Cat.all
    render :index
  end

  def show
    @cat = Cat.find_by(id: params[:id])
    if @cat
      render :show
    else
      redirect_to :index
    end
  end

  def new
    @cat = Cat.new
    render :new
  end

  def create
    @cat = Cat.new(cat_params)
    if @cat.save
      render :show
    else
      render json: @cat.errors.full_messages
    end
  end

  def edit
    @cat = Cat.find_by(id: params[:id])
    if @cat
      render :edit
    else
      render json: @cat.errors.full_messages
    end
  end

  def update
    @cat = Cat.find_by(id: params[:id])
    if @cat.update(cat_params)
      render :show
    else
      render json: @cat.errors.full_messages
    end
  end

  def cat_params
    params.require(:cat).permit(:birth_date, :color, :name, :sex, :description)
  end
end
