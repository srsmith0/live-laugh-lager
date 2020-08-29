Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'

  namespace :api do
    get '/user/:nickname', to: 'users#find_user'
    get 'followers/:user_id', to: 'follows#show_followers'
    post '/follower/:user_id', to: 'followers#create'
    post '/user/:user_id/follow/:follower_id', to: 'follows#create'
    put '/api/user/:user_id/follow/:follower_id', to: 'follows#update'
    get '/api/followed_posts/:user_id', to: 'posts#show_all_followed'
    resources :followers, only: [:index, :create, :destroy]
    resources :follows, only: [:index, :create, :destroy]
    resources :users do
      resources :reviews
      resources :posts do 
        resources :comments
      end
    end
  end
end
