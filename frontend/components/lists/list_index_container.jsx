import { connect } from 'react-redux';
import ListIndex from './list_index';
import { fetchLists, deleteList, createList } from '../../actions/list_actions';

const mapStateToProps = state => ({
  currentUser: state.session.currentUser,
  lists: Object.keys(state.list.list).map(id => state.list.list[id])
});

const mapDispatchToProps = dispatch => ({
  fetchLists: () => dispatch(fetchLists()),
  createList: (list) => dispatch(createList(list)),
  deleteList: (id) => dispatch(deleteList(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListIndex);
