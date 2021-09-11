class CatsController < ApplicationController
  def create
    p 'THESE ARE THE PARAMS'
    p params
    p 'THESE ARE THE CAT PARAMS'
    p cat_params

    Cat.create!(cat_params)

    redirect_to cats_url
  end

  def index
    @cats = Cat.all

    render :index
  end

  def new
    render :new
  end

  def cat_params
    params.require(:cat).permit(:name, :age, :sex, :biography, :coat_color, :birth_date)
  end
end
