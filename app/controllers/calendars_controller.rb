class CalendarsController < ApplicationController
  require "date"

  def index
    @year_time = Time.now.year
    @month_time = Time.now.month
    @date_time = Time.now.day
  end

  def calendar_data
    # 現在の年月を取得してカレンダーデータを生成 ⇒ 送られてきたパラメータに応じて年月を取得へ変更5/25
    year = params[:year].to_i
    month = params[:month].to_i
    year = Time.now.year if year == 0
    month = Time.now.month if month == 0

    # Push クラスを使ってデータを生成
    push = Push.new(year, month)
    calendar_data = push.array_pass
    

    events = current_user.calendars.where(date: Date.new(year, month, 1)..Date.new(year, month, -1))
    event_data = events.map { |event| { year: event.date.year ,month: event.date.month ,date: event.date.day, content: event.content } }

    render json: { calendar: calendar_data, events: event_data }
  end

  def save_content
    year = params[:event][:year].to_i
    month = params[:event][:month].to_i
    day = params[:event][:date].to_i

    
    date = Date.new(year, month, day)
    
    calendar = current_user.calendars.new(
      date: date,
      content: params[:event][:content]
    )

    if calendar.save
      render json: { status: "success", message: "Content saved successfully." }, status: :ok
    else
      render json: { status: "error", errors: calendar.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def next_calendar_data
     # 現在の年月を取得してカレンダーデータを生成 ⇒ 送られてきたパラメータに応じて年月を取得へ変更5/25
    year = params[:year].to_i
    month = params[:month].to_i

    if month > 12
      month = 1
      year = year + 1
    end     
 
     # Push クラスを使ってデータを生成
    push = Push.new(year, month)
    calendar_data = push.array_pass
     
    events = current_user.calendars.where(date: Date.new(year, month, 1)..Date.new(year, month, -1))
    event_data = events.map { |event| { date: event.date.day, content: event.content } }
 
    render json: { calendar: calendar_data, events: event_data }
  end

  def last_calendar_data
     # 現在の年月を取得してカレンダーデータを生成 ⇒ 送られてきたパラメータに応じて年月を取得へ変更5/25
    year = params[:year].to_i
    month = params[:month].to_i

    if month < 1
      month = 12
      year = year - 1
    end     
 
     # Push クラスを使ってデータを生成
    push = Push.new(year, month)
    calendar_data = push.array_pass
     
    events = current_user.calendars.where(date: Date.new(year, month, 1)..Date.new(year, month, -1))
    event_data = events.map { |event| { date: event.date.day, content: event.content } }
 
    render json: { calendar: calendar_data, events: event_data }
  end

  private

  def event_params
    params.require(:event).permit(:date, :content).merge(user_id: current_user.id)
  end
end
