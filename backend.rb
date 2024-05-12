Rails.application.routes.draw do
    resources :users, only: [:create, :login]
  end

  class UsersController < ApplicationController
    def create
      user = User.new(user_params)
      if user.save
        render json: { message: 'User created successfully' }, status: :created
      else
        render json: { error: user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    def login
      user = User.find_by(email: params[:email])
      if user && user.authenticate(params[:password])
        render json: { message: 'Login successful', user_id: user.id }, status: :ok
      else
        render json: { error: 'Invalid email or password' }, status: :unauthorized
      end
    end
  
    private
  
    def user_params
      params.require(:user).permit(:email, :password)
    end
  end

  Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins 'chrome-extension:extension-id'
      resource '*', headers: :any, methods: [:get, :post, :options]
    end
  end
  