class ToDosController < ApplicationController
    def index_data
        events = current_user.to_dos.all
        event_data = events.map{|event| { id: event.id, rank: event.rank, content: event.content} }
        new_events = event_data.sort_by{ |i| [i[:rank]] }
        render json: { event: new_events }
    end

    def save_data
        rank = params[:event][:rank]
        content = params[:event][:content]

        to_do = current_user.to_dos.new(
            rank: rank,
            content: content
        )

        if to_do.save
            events = current_user.to_dos.all
            event_data = events.map{|event| { id: event.id, rank: event.rank, content: event.content} }
            new_events = event_data.sort_by{ |i| [i[:rank]] }
            render json: { event: new_events, status: "success", message: "To_do saved successfully." }, status: :ok
        else
            render json: { status: "error", errors: to_do.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def delete_data
        to_do = current_user.to_dos.find(params[:id])

        if to_do.destroy
            render json: { status: "success", message: "Data deleted successfully." }, status: :ok
        else
            render json: { status: "error", errors: to_do.errors.full_messages }, status: :unprocessable_entity
        end
    end
end
