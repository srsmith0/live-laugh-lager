class Api::ReviewsController < ApplicationController
  def index
    render json: current_user.reviews.all.order(:created_at)
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


  private
  def review_params
    params.require(:review).permit(:name, :brewery, :style, :description, :appearance, :aroma, :flavor, :mouthfeel, :overall)
  end

end
