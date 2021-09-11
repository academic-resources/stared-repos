class SubsController < ApplicationController
  before_action :ensure_ownership, only: [:edit, :update]

  def index
    @subs = Sub.all
    render :index
  end

  def new
    @sub = Sub.new
    render :new
  end

  def create
    @sub = current_user.subs.new(sub_params) #creating a new sub which automatically belongs to this user through an association. 
    if @sub.save
      redirect_to subs_url
    else
      flash.now[:errors] = @sub.errors.full_messages
      render :new
    end
  end

  def show
    @sub = Sub.find(params[:id])
  end

  def edit
    @sub ||= current_user.subs.find(params[:id])
  end

  def update
    @sub ||= current_user.subs.find(params[:id])
    if (@sub && @sub.update(sub_params))
      redirect_to sub_url(@sub)
    else
      flash.now[:errors] = @sub.errors.full_messages
      render :edit
    end
  end

  private
  
  def ensure_ownership
    @sub = current_user.subs.find(params[:id])
    redirect_to sub_url(params[:id]) unless @sub
  end

  def sub_params
    params.require(:sub).permit(:title, :description)
  end
end
