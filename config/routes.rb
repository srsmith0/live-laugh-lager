Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'

  namespace :api do
    get '/user/:nickname', to: 'users#find_user'
    post '/follower/:user_id', to: 'followers#create'
    post '/user/:user_id/follow/:follower_id', to: 'follows#create'
    put '/api/user/:user_id/follow/:follower_id', to: 'follows#update'
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
