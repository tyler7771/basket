class CreateListsUsersThroughTable < ActiveRecord::Migration
  def change
    create_table :lists_users_through do |t|
      t.integer :user_id, null:false
      t.integer :list_id, null:false
    end
  end
end
