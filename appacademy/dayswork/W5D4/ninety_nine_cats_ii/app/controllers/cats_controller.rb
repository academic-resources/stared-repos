class CatsController < ApplicationController

  before_action :verify_ownership, only: [:edit, :update]

  def index
    @cats = Cat.all
    @on_cat_screen = true
    render :index
  end

  def show
    @cat = Cat.find(params[:id])
    render :show
  end

  def new
    @cat = Cat.new
    render :new
  end

  def create
    @cat = Cat.new(cat_params)
    @cat.user_id = current_user.id
    if @cat.save
      redirect_to cat_url(@cat)
    else
      flash.now[:errors] = @cat.errors.full_messages
      render :new
    end
  end

  def edit
    # @cat = Cat.find(params[:id])
    render :edit
  end

  def update
    # @cat = Cat.find(params[:id])
    if @cat.update_attributes(cat_params)
      redirect_to cat_url(@cat)
    else
      flash.now[:errors] = @cat.errors.full_messages
      render :edit
    end
  end

  private

  def cat_params
    params.require(:cat).permit(:age, :birth_date, :color, :description, :name, :sex)
  end

  def verify_ownership

    @cat = current_user.cats.find_by(id: params[:id])
    if @cat.nil?
      flash[:errors] = ["You can only edit your own cats"]
      redirect_to cat_url(params[:id])
    end

  end

end 
