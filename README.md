# Basket

[Live Site](https://thebasketapp.herokuapp.com)

Basket is a full stack application where users can create lists, add friends
and family to the lists, add items to the list, and comment on the list.

## Features & Implementation

### Lists

#### Creation and Editing

A user can create a list to track the items they need to buy. When created it is added to their index of lists and a link is created for the list show page.

From the home page they can also view all of the items that have been assigned to them.

![Alt text](http://res.cloudinary.com/dfmvfna21/image/upload/v1491884223/Screen_Shot_2017-04-10_at_9.03.53_PM_gbpqoa.png)

From the List's show page, users have the ability to edit the title of the list. Deleting redirects them back to the home page. If updating, a text field is opened and pre-filled with the list's current information for editing.

![Alt text](http://res.cloudinary.com/dfmvfna21/image/upload/v1491884224/Screen_Shot_2017-04-10_at_9.03.56_PM_mzqbes.png)

#### List Show

The show page shows all the list's information, email button, a list item add form, all the lists items, and comments for the list.

The email button opens the users email client and pre fills the email with the lists users, a subject, and a link to the list.

The users are grabbed from state and put together in a string all separated by a semicolon.

```js
const emailArray = [];

this.props.users.map(user => (
  emailArray.push(user.email)
  )
);
const emails = emailArray.join(';');
this.setState({emails: emails});
```
An a tag is created for when pushed it opens a mailto with the info retrieved.

```js
mailto:${this.state.emails}?subject=Check Out Our List!&body=${window.location.href}
```

### User Search

From the list's show page you can also add friends and family members to the list from the user search text field.

As a user types an ajax request is sent to the backend. The backend then returns a list of users that match the request.

```ruby
def index
  if params[:username] == ""
    @users = []
    #returns and empty list if the text field is empty
  else
    @users = User.where("LOWER(username) LIKE LOWER(?)", "%#{params[:username]}%")
    #retrieves all users that username includes the results of the text field
  end
  render :index
end
```

A result item is then created for each result and returned to the user.

![Alt text](http://res.cloudinary.com/dfmvfna21/image/upload/v1491884222/Screen_Shot_2017-04-10_at_9.15.52_PM_hfkz8o.png)
