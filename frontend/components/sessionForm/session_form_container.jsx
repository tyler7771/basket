import { connect } from 'react-redux';
import SessionForm from './session_form';
import { login, signup } from '../../actions/session_actions';


const mapStateToProps = (state, ownProps) => ({
    errors: state.session.errors
});

const mapDispatchToProps = (dispatch, formType) => {
  const processForm = (formType === 'Log in') ? login : signup;

  return {
    processForm: user => dispatch(processForm(user)),
    formType
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
