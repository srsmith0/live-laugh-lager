class Api::UsersController < ApplicationController
  before_action :authenticate_user!

  def update
    if current_user.update (user_params)
      render json: current_user
    else
      render json: {errors: comment.errors}, status: :unprocessble_entity
    end
  end

  def destroy
    render json: current_user.destroy
  end

  private
  def user_params
    params.require(:user).permit(:name, :nickname, :id, :email)
  end

end
