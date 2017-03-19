@items.each do |item|
  json.set! item.id do
    json.extract! item, :id, :name, :user_id, :list_id, :quantity, :purchased
    if item.user
      json.set! :user do
        json.extract! item.user, :id, :username
      end
    end
  end
end
