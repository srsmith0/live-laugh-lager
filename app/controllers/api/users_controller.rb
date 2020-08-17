class Api::UsersController < ApplicationController
   before_action :authenticate_user! , only: [:update]
  
  def show
    render json: User.find(params[:id])
  end


  def update
    if current_user.update (user_params)
      binding.pry
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
