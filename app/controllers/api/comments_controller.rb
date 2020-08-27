class Api::CommentsController < ApplicationController
  def index
    post = Post.find(params[:post_id])
    render json: post.comments.all
  end

  def create
    new_comment = current_user.comments.new(comment_params)
    if new_comment.save
      render json: new_comment
    else
      render json: new_comment.errors, status: 422
    end
  end

  def update
    #come back here tomorrow
    binding.pry
  comment = Comment.find(params[:id])
    if comment.update(comment_params)
    render json: comment
      else
      render json: comment.errors, status: 422
    end
  end


  def destroy
    comment = Comment.find(params[:id])
    render json: comment.destroy
  end

  private

  def comment_params
    params.require(:comment).permit(:content, :post_id)
  end

end
