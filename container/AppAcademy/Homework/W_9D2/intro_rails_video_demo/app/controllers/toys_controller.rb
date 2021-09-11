class ToysController < ApplicationController
  def index
    # /cats/:cat_id/toys
    cat = Cat.find(params[:cat_id])
    render json: cat.toys
  end

  def show
    # /toys/:id
    render json: Toy.find(self.params[:id])
  end

  def destroy
    # /toys/:id
    toy = Toy.find(params[:id])
    toy.destroy
    render json: toy
  end

  def update
    # /toys/:id
    toy = Toy.find(params[:id])

    success = toy.update(self.toy_params)
    if success
      render json: toy
    else
      render json: toy.errors.full_messages, status: :unprocessable_entity
    end
  end

  def create
    # POST /toys

    # Strong Parameters
    # self.params => Parameters < HashWithIndifferentAccess < Hash
    @toy = Toy.new(self.toy_params)
    @cat = @toy.cat

    if @toy.save
      redirect_to cat_url(@cat)
    else
      render :new
      # render json: toy.errors.full_messages, status: :unprocessable_entity
    end
  end

  def new
    @cat = Cat.find(params[:cat_id])
    @toy = Toy.new
    render :new
  end

  protected
  def toy_params
    self.params[:toy].permit(:cat_id, :name, :ttype)
  end
end
