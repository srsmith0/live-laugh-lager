# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

5.times do |x|
  user = User.create(email: "#{x}-test@test.com", password: "123456", name: "brew-boi#{x}")
  3.times do |y|
    post = user.posts.create(title: "#{y}-title", content: "balkjskejklsdf")
    post.comments.create(content: Faker::TvShows::DumbAndDumber.quote, likes: rand(1..100), user_id: user.id, post_id: post.id)
    4.times do |r|
      user.reviews.create(name: Faker::Beer.name, brewery: "hype-brewery-#{r}", style: Faker::Beer.style, 
      description: "another hazy, mosaic/citra...very original #{r}", appearance: rand(1..5), aroma: rand(1..5),
      flavor: rand(1..5), mouthfeel: rand(1..5), overall: rand(1..5))
    end
  end
end

puts "seeded!"