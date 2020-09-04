5.times do |x|
  user = User.create(name: Faker::TvShows::RickAndMorty.character, email: "#{x}-test@test.com", password: "123456", nickname: "testUser-#{x}")
  8.times do |y|
    post = user.posts.create(title: Faker::Beer.hop, content: Faker::Hipster.paragraph(sentence_count: rand(8..20)), user_name: user.nickname)
    3.times do 
    post.comments.create(content: Faker::Lorem.sentence(word_count: rand(5..17)), user_id: rand(1..5), post_id: post.id, user_name: user.nickname)
    end
  end
    4.times do |r|
      user.reviews.create(name: Faker::Beer.name, brewery: Faker::Beer.brand, style: Faker::Beer.style, 
      description: Faker::Food.description, appearance: rand(1..5), aroma: rand(1..5),
      flavor: rand(1..5), mouthfeel: rand(1..5), overall: rand(1..5), user_name: user.nickname)
    end
end

puts "seeded!"