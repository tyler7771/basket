class User < ActiveRecord::Base
  validates :email, :username, :password_digest, :session_token, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}
  validates :username, uniqueness: true

  has_many :user_list_associations
  has_many :list_items
  has_many :comments
  has_many :lists, :through => :user_list_associations
  attr_reader :password
  after_initialize :ensure_session_token

  def self.find_by_credintials(username, password)
    user = User.find_by(username: username)
    return nil unless user
    return "password" unless user.is_password?(password)
    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save
    self.session_token
  end

  private
  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end
end
