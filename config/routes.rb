Rails.application.routes.draw do
  devise_for :users
  root to: "calendars#index"
  get 'calendars/calendar_data', to: 'calendars#calendar_data'
  post 'calendars/save_content', to: 'calendars#save_content'
  get 'calendars/next_calendar_data', to: 'calendars#next_calendar_data'
  get 'calendars/last_calendar_data', to: 'calendars#last_calendar_data'
  resources :calendars, only: [:index,:show]
  resources :users, only: :show
end
