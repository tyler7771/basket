class Drop < ActiveRecord::Migration
  def change
    drop_table :lists_users_through
  end
end
