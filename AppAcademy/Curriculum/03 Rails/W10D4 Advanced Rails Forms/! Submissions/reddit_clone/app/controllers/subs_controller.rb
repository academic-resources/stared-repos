# rubocop:disable all
class SubsController < ApplicationController
  before_action :ensure_logged_in, except: %i[index show]

  def new
    @sub = Sub.new
    render :new
  end

  def create
    @sub = Sub.new(sub_params)
    @sub.moderator_id = current_user.id
    
    if @sub.save
      redirect_to sub_url(@sub)
    else
      flash.now[:errors] = @sub.errors.full_messages
      render :new
    end
  end

  def index
    render :index
  end

  def show
    @sub = Sub.find(params[:id])
    render :show
  end

  def edit
    @sub = Sub.find(params[:id])
    render :edit
  end

  def update
    @sub = Sub.find(params[:id])
    @sub.moderator_id = current_user.id
    if @sub.update(sub_params)
      redirect_to sub_url(@sub)
    else
      flash[:errors] = @sub.errors.full_messages
      if logged_in?
        redirect_to edit_sub(@sub)
      else
        redirect_to new_session_url
      end
    end
  end

  private

  def sub_params
    params.require(:sub).permit(:title, :description)
  end
end