@users.each do |user|
  json.set! user.id do
    json.extract! user, :email, :username, :id
  end
end
  
