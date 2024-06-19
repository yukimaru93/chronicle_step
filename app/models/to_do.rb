class ToDo < ApplicationRecord
    belongs_to :user
    
    with_options presence: true do
        validates :rank
        validates :content
    end
end
