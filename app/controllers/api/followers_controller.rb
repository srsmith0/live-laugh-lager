class Api::FollowersController < ApplicationController
  def create

    user = Follower.new(follower_params)
    if user.save
      render json: user
    else 
      render json: user.errors, status: 422
    end
  end


  private

  def follower_params
    params.require(:follower).permit(:user_id)
  end


end
