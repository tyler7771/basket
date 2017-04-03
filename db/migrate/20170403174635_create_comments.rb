class CreateComments < ActiveRecord::Migration
  def change
    drop_table :comments
    create_table :comments do |t|
      t.integer :user_id, null:false
      t.integer :list_id, null:false
      t.string :content, null:false
      t.timestamps null: false
    end
  end
end
