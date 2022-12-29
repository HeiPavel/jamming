import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

function TrackList(props) {

    const checkTracks = () => {
        if (!props.tracks) {
            return;
        }
        return props.tracks.map((track) => {
            return (
                <Track 
                    key={track.id}
                    track={track}
                    onAdd={props.onAdd}
                    onRemove={props.onRemove}
                    isRemoval={props.isRemoval}
                />
            );
        });
    };

        return (
            <div className="TrackList" translate="no">
                {checkTracks()}
            </div>
        );
}

export default TrackList;