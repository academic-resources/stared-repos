class GoalsController < ApplicationController
  before_action :ensure_logged_in

  def index
    @goals = Goal.includes(:user).excluding_other_privates(current_user.id).all
  end

  def new
    @goal = Goal.new
  end

  def create
    @goal = Goal.new(goal_params)
    @goal.user_id = current_user.id
    if @goal.save
      redirect_to user_goals_url(current_user.id)
    else
      flash.now[:errors] = @goal.errors.full_messages
      render :new
    end
  end

  def edit
    @goal = current_user.goals.find_by(id: params[:id])
  end

  def update
    @goal = current_user.goals.find_by(id: params[:id])
    if @goal.update(goal_params)
      redirect_to user_goals_url(current_user.id)
    else
      flash.now[:errors] = @goal.errors.full_messages
      render :edit
    end
  end

  def destroy
    @goal = Goal.find_by(id: params[:id])
    @goal.destroy
    redirect_to user_goals_url(current_user.id)
  end

  private

  def goal_params
    params.require(:goal).permit(:title, :private, :completed)
  end
end
