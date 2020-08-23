class Review < ApplicationRecord
  belongs_to :user

  def self.set_overall(review)
    overall_score = (review.appearance + review.aroma + review.flavor + review.mouthfeel) / 4
    review.overall = overall_score
  end

end
