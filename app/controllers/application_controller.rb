class ApplicationController < ActionController::API
        include DeviseTokenAuth::Concerns::SetUserByToken
    

        protected
       
        def configure_permitted_parameters
           devise_parameter_sanitizer.permit(:sign_up, keys: [:name, :nickname, :email, :password])
           devise_parameter_sanitizer.permit(:sign_in, keys: [:session])
        end
       
end
