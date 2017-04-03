class List < ActiveRecord::Base
  validates :name, presence:true
  has_many :user_list_associations
  has_many :list_items
  has_many :comments
  has_many :users, :through => :user_list_associations
end
