class Api::TeamsController < ApplicationController
  before_action :require_logged_in

  def index
    @teams = current_user.teams.includes(:boards).includes(:members)
    render :index
  end

  def create
    @team = Team.new(team_params)
    @team.user_id = current_user.id
    if @team.save
      current_user.team_memberships.create(team_id: @team.id)
      @team = Team.includes(:boards).includes(:members).find(@team.id)
      render :show
    else
      render json: @team.errors.full_messages, status: 422
    end
  end

  private

  def team_params
    params.require(:team).permit(:title, :description)
  end
end
