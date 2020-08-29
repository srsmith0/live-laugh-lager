class Follow < ApplicationRecord
  belongs_to :user

  def self.set_followers(user_id)
    select("follows.follower_id, follows.user_id, follows.id")
    .joins("INNER JOIN users ON users.id = follows.user_id")
    .where("users.id = #{user_id}")
  end

  def self.sort_followers(find)
    users = User.all
    usernames = []
    find.each do |f|
      users.each do |u|
        if f.follower_id == u.id 
          usernames << u 
        end
      end
  end
  return usernames
end



end
