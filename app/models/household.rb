class Household < ApplicationRecord
    belongs_to :user
    
    with_options presence: true do
        validates :date
        validates :item
        validates :amount
        validates :purpose
    end
end
