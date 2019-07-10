import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import CollectionList from './components/CollectionList';
import CollectionDetail from './components/CollectionDetail';
import QuestionDetail from './components/QuestionDetail';
import QuestionEditForm from './components/QuestionEditForm';

const BaseRouter = () => (
    <div>
        <Switch>
            <Route exact path="/" render={() => (<Redirect to="/collections" />)} />
            <Route exact path="/editTest" component={QuestionEditForm} />
            <Route exact path="/collections" component={CollectionList} />
            <Route exact path="/collections/:collectionID" component={CollectionDetail} />
            <Route exact path="/collections/:collectionID/create-new-question" component={QuestionEditForm} />
            <Route exact path="/collections/:collectionID/:questionID" component={QuestionDetail} />
        </Switch>
    </div>
);

export default BaseRouter;
