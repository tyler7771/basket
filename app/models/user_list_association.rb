class UserListAssociation < ActiveRecord::Base
  validates :user, :list, presence:true
  belongs_to :user
  belongs_to :list
end
