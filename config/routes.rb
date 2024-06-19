Rails.application.routes.draw do
  devise_for :users
  root to: "calendars#index"
  get 'calendars/calendar_data', to: 'calendars#calendar_data'
  get 'calendars/full_plan', to: 'calendars#full_plan'
  post 'calendars/save_content', to: 'calendars#save_content'
  post 'calendars/delete_content', to: 'calendars#delete_content'
  get 'calendars/next_calendar_data', to: 'calendars#next_calendar_data'
  get 'calendars/last_calendar_data', to: 'calendars#last_calendar_data'
  resources :calendars, only: [:index,:show]
  resources :users, only: :show do
    member do
      get 'show_calc'
      get 'show_toDo'
    end
  end

  post 'households/save_data', to: 'households#save_data'
  get 'households/index_data', to: 'households#index_data'
  post 'households/delete_data', to: 'households#delete_data'
  
  post 'to_dos/save_data', to: 'to_dos#save_data'
  post 'to_dos/delete_data', to: 'to_dos#delete_data'
  get 'to_dos/index_data', to: 'to_dos#index_data'
end
