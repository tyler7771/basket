@comments.each do |comment|
  json.set! comment.id do
    json.extract! comment, :id, :content
    if comment.list_item_id
      json.set! :item do
        json.extract! comment.list_item, :id, :name
      end
    end
    json.set! :user do
      json.extract! comment.user, :id, :username
    end
  end
end
