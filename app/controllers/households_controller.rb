class HouseholdsController < ApplicationController
    def save_data
        year = params[:event][:year].to_i
        month = params[:event][:month].to_i
        day = params[:event][:day].to_i
        item = params[:event][:item].to_i
        amount = params[:event][:amount].to_i
        purpose = params[:event][:purpose].to_i
        content = params[:event][:content].to_i

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
            event_data = events.map{|event| {date: event.date, item: event.item, amount: event.amount, purpose: event.purpose, content: event.content} }
            event_spending_data = events.map{|event| event.amount }
            render json: { event: event_data, spending_data: event_spending_data, status: "success", message: "Household saved successfully." }, status: :ok
        else
            render json: { status: "error", errors: household.errors.full_messages }, status: :unprocessable_entity
        end
    end
end
