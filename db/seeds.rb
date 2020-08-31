5.times do |x|
  user = User.create(email: "#{x}-test@test.com", password: "123456", nickname: "brew-boi#{x}")
  8.times do |y|
    post = user.posts.create(title: "#{y}-title", content: Faker::Hipster.sentence, user_name: user.nickname)
    3.times do 
    post.comments.create(content: Faker::TvShows::DumbAndDumber.quote, user_id: rand(1..5), post_id: post.id, user_name: user.nickname)
    end
  end
    4.times do |r|
      user.reviews.create(name: Faker::Beer.name, brewery: "hype-brewery-#{r}", style: Faker::Beer.style, 
      description: "another hazy, mosaic/citra...very original #{r}", appearance: rand(1..5), aroma: rand(1..5),
      flavor: rand(1..5), mouthfeel: rand(1..5), overall: rand(1..5), user_name: user.nickname)
    end
end

puts "seeded!"