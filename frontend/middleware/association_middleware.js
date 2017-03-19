import { CREATE_ASSOCIATION } from '../actions/association_actions';
import { createAssociation } from '../util/association_api_util';
import { hashHistory } from 'react-router';

const AssociationsMiddleware = ({ getState, dispatch }) => next => action => {
  const createAssociationSuccess = association => {

  };

  switch (action.type) {
    case CREATE_ASSOCIATION:
      createAssociation(action.association, createAssociationSuccess);
      return next(action);
    default:
      next(action);
  }
};

export default AssociationsMiddleware;
