class Api::UsersController < ApplicationController
   before_action :authenticate_user! , only: [:update]

  def select_user
    user = User.find(params[:user_id])
    render json: user 
  end

  def find_user
    users = User.all 
    @user = users.find_by(nickname: params[:nickname])
    render json: @user
  end

  def update
    if current_user.update (user_params)
      render json: current_user
    else
      render json: {errors: comment.errors}, status: :unprocessble_entity
    end
  end

  def destroy
    user = User.find(params[:id])
    render json: user.destroy
  end

  private
  def user_params
    params.require(:user).permit(:name, :nickname, :id, :email, :password)
  end

end
