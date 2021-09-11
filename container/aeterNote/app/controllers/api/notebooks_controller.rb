class Api::NotebooksController < ApplicationController

  before_action :require_logged_in
  before_action :proper_ownership, except: [ :index, :create ]

  def index
    @notebooks = Notebook.where(user_id: current_user.id)
  end

  def show
    @notebook = Notebook.find_by(id: params[:id])
  end

  def create
    @notebook = Notebook.new(notebook_params)
    @notebook.user_id = current_user.id
    if @notebook.save
      render :show
    else
      render json: @notebook.errors.full_messages, status: 422
    end
  end

  def update
    @notebook = Notebook.find(params[:id])
    if @notebook.update(notebook_params)
      render :show
    else
      render json: @notebook.errors.full_messages, status: 422
    end
  end

  def destroy
    @notebook = Notebook.find(params[:id])
    @notebook.destroy
    render :show
  end

  private

  def notebook_params
    params.require(:notebook).permit(:title)
  end

  def owns_notebook?(notebook)
    current_user.id == notebook.user_id
  end

  def proper_ownership
    unless owns_notebook?(Notebook.find(params[:id]))
      render json: ['Permission denied: you do not own these notebooks'], status: 401
    end
  end
end
