class UsersController < ApplicationController
  before_action :authenticate_user!
  def show
    user = User.find(params[:id])
    @year_time = Time.now.year
    @month_time = Time.now.month
  end
end
