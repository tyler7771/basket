class CreateListItems < ActiveRecord::Migration
  def change
    create_table :list_items do |t|
      t.integer :user_id
      t.integer :list_id, null:false
      t.integer :quantity, null:false
      t.string :name, null:false
      t.boolean :purchased
      t.timestamps null: false
    end
  end
end
