json.set! @list.id do
  json.extract! @list, :id, :name
  @users.each do |user|
    json.set! user.id do
      json.extract! user, :id, :username
    end
  end
end
