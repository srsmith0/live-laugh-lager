class Api::PostsController < ApplicationController
  def index
    render json: current_user.posts.all 
  end

  def show
    post = Post.find(params[:id])
    render json: post 
  end


  def create
    newPost = current_user.posts.new(post_params)
    if newPost.save
      render json: newPost
    else
      render json: newPost.errors, status: 422
    end
  end

def update
  set_post 
  if @post.update 
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
    @post = current_user.posts.find(params[:id])
  end


  def post_params
    params.require(:post).permit(:title, :content, :image)
  end


end
