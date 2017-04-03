json.extract! @comment, :id, :content
if @comment.item_id
  json.set! :item do
    json.extract! @comment.item_id, :id, :name
  end
end
json.set! :user do
  json.extract! @comment.user, :id, :username
end
