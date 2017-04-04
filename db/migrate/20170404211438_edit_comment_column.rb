class EditCommentColumn < ActiveRecord::Migration
  def change
    remove_column :comments, :item_id
    add_column :comments, :list_item_id, :integer
  end
end
