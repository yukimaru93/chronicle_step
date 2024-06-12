class HouseholdsController < ApplicationController
    def index_data
        year = params[:year].to_i
        month = params[:month].to_i
        events = current_user.households.where(date: Date.new(year, month, 1)..Date.new(year, month, -1))
        event_data = events.map{|event| { id: event.id, date: event.date, item: event.item, amount: event.amount, purpose: event.purpose, content: event.content} }
        event_spending_data = events.map{|event| event.amount }
        render json: { event: event_data, spending_data: event_spending_data }
    end

    def save_data
        year = params[:event][:year].to_i
        month = params[:event][:month].to_i
        day = params[:event][:day].to_i
        item = params[:event][:item]
        amount = params[:event][:amount].to_i
        purpose = params[:event][:purpose]
        content = params[:event][:content]

        date = Date.new(year, month, day)

        household = current_user.households.new(
            date: date,
            item: item,
            amount: amount,
            purpose: purpose,
            content: content
        )

        if household.save
            events = current_user.households.all
            event_data = events.map{|event| { id: event.id, date: event.date, item: event.item, amount: event.amount, purpose: event.purpose, content: event.content} }
            event_spending_data = events.map{|event| event.amount }
            render json: { event: event_data, spending_data: event_spending_data, status: "success", message: "Household saved successfully." }, status: :ok
        else
            render json: { status: "error", errors: household.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def delete_data
        household = current_user.households.find(params[:id])

        if household.destroy
            render json: { status: "success", message: "Household deleted successfully." }, status: :ok
        else
            render json: { status: "error", errors: household.errors.full_messages }, status: :unprocessable_entity
        end
    end
end
