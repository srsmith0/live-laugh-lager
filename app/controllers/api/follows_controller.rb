 class Api::FollowsController < ApplicationController

  def index
    my_follows = []
    follows = Follow.all
    follows.each do |f|
      if f.follower_id == current_user.id
      my_follows << f
      end
    end
    render json: my_follows 
  end
  
    def show
      follow = Follow.find_by(user_id: params[:user_id], follower_id: params[:follower_id])
      render json: follow
    end
  
  def show_followers
    find_followers = current_user.follows.all
    my_followers = Follow.sort_followers(find_followers)
    render json: my_followers
  end
  
  def show_followees
        find_followees = Follow.all
        my_followees = Follow.sort_followees(find_followees, current_user.id)
        render json: my_followees
      end
  
  
  def create
      follows = Follow.new(follow_params)
      result = Follow.all.any? { |f| (f.user_id == follows.user_id  && f.follower_id == follows.follower_id) }
      if result == false 
        if follows.save
          render json: follows
        else
          render json: follows.errors, status: 422
        end
      else
      render json: { message: "User is already followed"}
     end
   end
  
  def destroy         
  render json: Follow.find(params[:id]).destroy
  end
  
  
  private
  
    def all_follows
      @all_follows = Follow.all
    end
  
  
    def follow_params
      params.require(:follow).permit(:user_id, :follower_id)
    end
  
  end
