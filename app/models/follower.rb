class Follower < ApplicationRecord
  belongs_to :user
  has_many :follows
end
