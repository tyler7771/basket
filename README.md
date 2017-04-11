# Basket

[Live Site](https://thebasketapp.herokuapp.com)

Basket is a full stack application where users can create lists, add friends
and family to the lists, add items to the list, and comment on the list.

## Features & Implementation

### Lists

#### Creation and Editing

A user can create a list to track the items they need to buy. When created
it is added to their index of lists and a link is created for the list show page.

From the home page they can also view all of the items that have been assigned to them.

![Alt text](http://res.cloudinary.com/dfmvfna21/image/upload/v1478900738/Screen_Shot_2016-11-11_at_1.45.07_PM_2_ly5myc.png)

From the List's show page, users have the ability to edit the title of the list.
Deleting redirects them back to the home page. If updating, a text field is
opened and pre-filled with the list's current information for editing.

![Alt text](http://res.cloudinary.com/dfmvfna21/image/upload/v1478898392/Screen_Shot_2016-11-11_at_1.05.44_PM_2_npvgex.png)

#### List Show

The show page shows all the list's information, email button, a list item
add form, all the lists items, and comments for the list.

The email button opens the users email client and pre fills the email with
the lists users, a subject, and a link to the list.

The users are grabbed from state and put together in a string all separated
by a semicolon.

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

### List View

On each coffee show page there's a check-in button that pulls up a check-in modal. If the user submits without any information it's considered a check-in and doesn't effect the coffee's average rating stats. The user also has the option to review the coffee by adding a description, rating, or both. A rating is then displayed based on the information it's is found in helper functions.

```js
checked (value) {
  if (value === this.props.rating.checkin_rating) {
    return "checked";
  } else {
    return "";
  }
}

descriptionView() {
  if (this.props.rating.description) {
    return (
      <p className="drink-index-description">
        {this.props.rating.description}
      </p>
    );
  }
}

ratingView() {
  if (this.props.rating.checkin_rating) {
    return (
      <div className="rating-details">
        {this.descriptionView()}
        <form id="ratingsForm">
          <div className="beans-rating">
            <input
              type="radio"
              name="bean"
              value="1"
              readOnly
              className="bean-1"
              id="bean-1"
              checked={this.checked(1)}/>
            <label className="bean-1" htmlFor="bean-1">1</label>
            <input
              type="radio"
              name="bean"
              value="2"
              readOnly
              className="bean-2"
              id="bean-2"
              checked={this.checked(2)}/>
            <label className="bean-2" htmlFor="bean-2">2</label>
            <input
              type="radio"
              name="bean"
              value="3"
              readOnly
              className="bean-3"
              id="bean-3"
              checked={this.checked(3)}/>
            <label className="bean-3" htmlFor="bean-3">3</label>
            <input
              type="radio"
              name="bean"
              value="4"
              readOnly
              className="bean-4"
              id="bean-4"
              checked={this.checked(4)}/>
            <label className="bean-4" htmlFor="bean-4">4</label>
            <input
              type="radio"
              name="bean"
              value="5"
              readOnly
              className="bean-5"
              id="bean-5"
              checked={this.checked(5)}/>
            <label className="bean-5" htmlFor="bean-5">5</label>
            <span></span>
          </div>
        </form>
      </div>
    );
  } else if (this.props.rating.description) {
    return (
      <div className="rating-details">
        <p className="drink-index-description">
          {this.props.rating.description}
        </p>
      </div>
    );
  }
}
```


There are 3 different feeds to check out the different coffees tried.

"The Roast" is a global feed of all coffees tried by all users. Each rating links to the
reviewer's page by the profile picture or reviewer's name and links to the reviewed coffee by the coffee title.

![Alt text](http://res.cloudinary.com/dfmvfna21/image/upload/v1478899402/Screen_Shot_2016-11-11_at_1.22.28_PM_2_evfsgf.png)

The "Recent Activity" feed (which is also the page the user is directed to on login) is
a list of the 15 most recent reviews the user has made.

The "Coffee History" is a full list of all coffees reviewed by the user.

The user can update or delete any of their ratings from any of these lists.

### User Search

The user's profile is where they can find a condensed list of their recent
activity. It also includes user information, and coffee stats. The stats includes
the number of coffees reviewed and individual roasts tried. This is calculated the same way that drink stats are calculated except using the user information to find ratings rather than the drink.

If it is the current user's page, there is a button to update their information.