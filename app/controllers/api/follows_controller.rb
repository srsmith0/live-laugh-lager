class Api::FollowsController < ApplicationController
#list of people that current_users follows: find follow models by follower_id. Itterate over by user_id, match with user.all. render that
#list of followers of current_user, find follow models by user_id, itterate over by follower_id, match with user.all. render results

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

  def show_followers
    find_followers = Follow.set_followers(current_user.id)
    my_followers = Follow.sort_followers(find_followers)
    render json: my_followers
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
  render json: Follow.find(params[:user_id][:follower_id]).destroy
end


  private

  def all_follows
    @all_follows = Follow.all
  end


  def follow_params
    params.require(:follow).permit(:user_id, :follower_id)
  end

end
