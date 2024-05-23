class CreateCalendars < ActiveRecord::Migration[7.0]
  def change
    create_table :calendars do |t|
      t.text :content, null:false
      t.date :date, null:false
      t.references :user,foreign_key: true, null: false
      t.timestamps
    end
  end
end
