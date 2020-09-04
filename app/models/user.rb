# frozen_string_literal: true

class User < ActiveRecord::Base
  extend Devise::Models
  has_many :posts, dependent: :destroy
  has_many :reviews, dependent: :destroy 
  has_many :comments, dependent: :destroy
  has_many :follows, dependent: :destroy

  
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  def self.all_users(id)
    all_users = User.all
    users=[]
    all_users.each do |u|
      if u.id != id
        users << u 
      end
    end
    return users
  end

end
