class Api::ReviewsController < ApplicationController
  before_action :set_review, only: [:show, :update, :destroy]
  
  def index
    render json: current_user.reviews.all
  end

  def show
    render json: @review
  end

  def create
    review = current_user.reviews.new(review_params)
    Review.set_overall(review)
    if review.save
      render json: review
    else
      render json: review.errors
    end
  end

  def update
    if @review.update(review_params)
      Review.set_overall(@review)
      render json: @review
    else 
      render json: @review.errors, status: 422
  end
end

  def destroy
    render json: @review.destroy
  end

  
  private
  def review_params
    params.require(:review).permit(:name, :brewery, :style, :description, :appearance, :aroma, :flavor, :mouthfeel, :overall)
  end

  def set_review
    @review = Review.find(params[:id])
  end


end
