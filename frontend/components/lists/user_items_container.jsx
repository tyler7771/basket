import { connect } from 'react-redux';
import UserItems from './user_items';
import { fetchListItems, updateListItem }
  from '../../actions/list_item_actions';
import { fetchLists } from '../../actions/list_actions';

const mapStateToProps = (state, ownProps) => ({
    listItems: Object.keys(state.listItem.listItem).map(id => state.listItem.listItem[id])
});

const mapDispatchToProps = dispatch => ({
    fetchLists: () => dispatch(fetchListItems()),
    fetchListItems: params => dispatch(fetchListItems(params)),
    updateListItem: item => dispatch(updateListItem(item))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (UserItems);
