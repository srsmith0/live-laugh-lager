class Api::FollowsController < ApplicationController
  def create
    follows = Follow.new(follow_params)
    if follows.save
      render json: follows
    else
      render json: follows.errors, status: 422
    end
  end

  private

  def follow_params
    params.require(:follow).permit(:user_id, :follower_id)
  end

end
