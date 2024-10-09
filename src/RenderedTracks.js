import React from 'react';
import './RenderedItems.css';

const RenderedTracks = ({tracks}) => {
    console.log(tracks.slice(0,5));
    return (
        <div className='all-item-container'>
            <h2>Top Tracks</h2>
            {tracks.slice(0,5).map((item, index) => (
        <div key={item.id} className='item-container'>
          <div className='item-index'>{index+1}</div>
            {item.album.images.length ? <img className='item-image' src={item.album.images[0].url} alt=""/> : <div>No Image</div>}
            <div className='item-name'>
            {item.name}
              </div>
        </div>))}
        </div>
    );
};

export default RenderedTracks;