class CreateToDos < ActiveRecord::Migration[7.0]
  def change
    create_table :to_dos do |t|
      t.integer :rank, null:false
      t.text :content, null:false
      t.references :user, null: false, foreign_key: true
      t.timestamps
    end
  end
end
