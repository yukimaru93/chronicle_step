Rails.application.routes.draw do
  devise_for :users
  root to: "calendars#index"
  get 'calendars/calendar_data', to: 'calendars#calendar_data'
  post 'calendars/save_content', to: 'calendars#save_content'
  resources :calendars, only: [:index,:show]
  resources :users, only: :show
end
