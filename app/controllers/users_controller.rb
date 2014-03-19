class UsersController < ApplicationController
  #skip_before_filter  :verify_authenticity_token, only: [:create,:update,:destroy]

  respond_to :json, :html

  def index
    @users = User.all
    respond_with @users
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def edit
    @user = User.find(params[:id])

    render json: @user
  end

  def create
    # Respond with and Render json
    @user = User.create(user_params)
    @users = User.all
    render json: @users
  end

  def update
    @user = User.find(params[:id])
    @user.update(user_params)
    @users = User.all
    render json:@users
  end

  def destroy
    @user = User.destroy(params[:id])
    @users = User.all
    render json: @users
  end

  private

  def user_params
    params.require(:user).permit(:firstname,:lastname,:age,:job)
  end
end
