class Comment < ActiveRecord::Base
  validates :content, :list_id, :user_id, presence:true

  belongs_to :user
  belongs_to :list
end
