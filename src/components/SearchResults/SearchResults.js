import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';
import Loading from '../Loading/Loading';

function SearchResults(props) {
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <Loading loading={props.loading} noMatchMessage={props.noMatchMessage} />
                <TrackList tracks={props.searchResults} onAdd={props.onAdd} isRemoval={false} />
            </div>
        );
}

export default SearchResults;