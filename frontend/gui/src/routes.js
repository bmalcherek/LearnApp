import React from 'react';
import { Route } from 'react-router-dom';

import CollectionList from './components/CollectionList';
import CollectionDetail from './components/CollectionDetail';

const BaseRouter = () => (
    <div>
        <Route exact path="/" component={CollectionList} />
        <Route exact path="/:collectionID" component={CollectionDetail} />
    </div>
);

export default BaseRouter;
