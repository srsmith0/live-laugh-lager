class Api::UsersController < ApplicationController
   before_action :authenticate_user! , only: [:update]

  def index
    render json: User.all_users(current_user.id)
  end


  def select_user
    user = User.find(params[:user_id])
    render json: user 
  end

  def find_user
    users = User.all 
    @user = users.find_by(nickname: params[:nickname])
    render json: @user
  end

  def update
    if current_user.update (user_params)
      render json: current_user
    else
      render json: {errors: comment.errors}, status: :unprocessble_entity
    end
  end

  def destroy
    user = User.find(params[:id])
    render json: user.destroy
  end

  def get_breweries()
    find_state(params[:brewery_state])
  end

  private

  def request_api(url)
    response = Excon.get(
      url,
      headers: {
        'x-rapidapi-host': ENV['API_HOST'],
				'x-rapidapi-key': ENV['BREWERY_KEY'] 
      }
    )
    return nil if response.status != 200
    render json: JSON.parse(response.body)
  end

  def find_state(brewery_state)
    request_api(
      "https://brianiswu-open-brewery-db-v1.p.rapidapi.com/breweries?by_state=#{URI.encode(brewery_state)}"
    )
  end

  def user_params
    params.require(:user).permit(:name, :nickname, :id, :email, :password)
  end

end
