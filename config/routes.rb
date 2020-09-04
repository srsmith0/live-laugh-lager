Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'api/auth'

  namespace :api do
    get '/user/:nickname', to: 'users#find_user'
    get '/followers/:user_id', to: 'follows#show_followers'
    get '/followees/:user_id', to: 'follows#show_followees'
    post '/user/:user_id/follow/:follower_id', to: 'follows#create'
    put '/user/:user_id/follow/:follower_id', to: 'follows#update'
    get '/followed_posts/:user_id', to: 'posts#show_all_followed'
    get '/followed_reviews/:user_id', to: 'reviews#show_all_followed'
    get '/set_user/:user_id', to: 'users#select_user'
    get '/follows/follower/:follower_id/user/:user_id', to: 'follows#show'
    get '/not_followed/:id', to: 'users#find_followees'
    resources :follows, only: [:index, :create, :destroy]
    resources :users do
      resources :reviews
      resources :posts do 
        resources :comments
      end
    end
  end
  get '*other', to: 'static#index'
end
