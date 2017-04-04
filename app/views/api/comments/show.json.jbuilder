json.extract! @comment, :id, :content
if @comment.list_item_id && @comment.list_item_id != 0
  json.set! :item do
    json.extract! @comment.list_item, :id, :name
  end
end
json.set! :user do
  json.extract! @comment.user, :id, :username
end
