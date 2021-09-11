class SubsController < ApplicationController
  before_action :require_signed_in!, except: [:index, :show]
  before_action :require_user_owns_sub!, only: [:edit, :update]

  def index
    @subs = Sub.all
    render :index
  end

  def new
    @sub = Sub.new
  end

  def show
    @sub = Sub.find(params[:id])
  end

  def create
    @sub = current_user.subs.new(sub_params)
    if @sub.save
      redirect_to sub_url(@sub)
    else
      flash.now[:errors] = @sub.errors.full_messages
      render :new
    end
  end

  def update
    @sub = Sub.find(params[:id])
    if @sub.update(sub_params)
      redirect_to @sub
    else
      flash.now[:errors] = @sub.errors.full_messages
      render :edit
    end
  end

  def edit
    @sub = Sub.find(params[:id])
  end

  private
  def require_user_owns_sub!
    return if current_user.subs.find_by(id: params[:id])
    render json: 'Forbidden', status: :forbidden
  end

  def sub_params
    params.require(:sub).permit(:name, :description)
  end
end
