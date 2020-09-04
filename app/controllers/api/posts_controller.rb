class Api::PostsController < ApplicationController
  def index
    set_user
    render json: @user.posts.all 
  end

  def show
    render json: Post.find(params[:id])
  end


  def show_all_followed
    followed = []
    Follow.all.each do |f|
      if f.follower_id == current_user.id
        followed << f
      end
    end
    followed_posts =[]
    followed.each do |f|
      Post.all.each do |p|
        if f.user_id == p.user_id 
          followed_posts << p 
        end
      end
  end
  render json: followed_posts
end


  def create
    new_post = current_user.posts.new(post_params)
    if new_post.save
      render json: new_post
    else
      render json: new_post.errors, status: 422
    end
  end

def update
  set_post 
  if @post.update(post_params)
    render json: @post
  else
    render json: @post.errors, status: 422
  end
end

def destroy
  set_post 
  render json: @post.destroy 
end



  private
  
  def set_user
    @user = User.find(params[:user_id])
  end

  def set_post
    @post = Post.find(params[:id])
  end


  def post_params
    params.require(:post).permit(:title, :content, :image, :user_name)
  end


end
