class ListItem < ActiveRecord::Base
  validates :name, :list_id, :quantity, presence:true

  belongs_to :user
  belongs_to :list
  has_many :comments
end
