class Api::CommentsController < ApplicationController
  def index
    render json: Comment.find(params[:post_id])
  end

  def create
  end

  def destroy
  end

end
