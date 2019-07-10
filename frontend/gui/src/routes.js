import React from 'react';
import { Route } from 'react-router-dom';

import CollectionList from './components/CollectionList';
import CollectionDetail from './components/CollectionDetail';
import QuestionDetail from './components/QuestionDetail';

const BaseRouter = () => (
    <div>
        <Route exact path="/" component={CollectionList} />
        <Route exact path="/:collectionID" component={CollectionDetail} />
        <Route exact path="/:collectionID/:questionID" component={QuestionDetail} />
    </div>
);

export default BaseRouter;
