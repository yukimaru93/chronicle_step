class CreateHouseholds < ActiveRecord::Migration[7.0]
  def change
    create_table :households do |t|
      t.date :date, null:false
      t.text :item, null:false
      t.integer :amount, null:false
      t.string :purpose, null:false
      t.text :content
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
