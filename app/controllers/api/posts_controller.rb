class Api::PostsController < ApplicationController
  def index
    render json: current_user.posts.all 
  end


  private
  
  def set_user
    @user = User.find(params[:user_id])
  end

end
