import React from 'react';
import './RenderedItems.css';

const RenderedArtists = ({artists}) => {
    return (
        <div className='all-item-container'>
          <h2>Top Artists</h2>
            {artists.slice(0,5).map((item, index) => (
        <div key={item.id} className='item-container'>
          <div className='item-index'>{index+1}</div>
            {item.images.length ? <img className='item-image' src={item.images[0].url} alt=""/> : <div>No Image</div>}
            <div className='item-name'>
            {item.name}
              </div>
        </div>))}
        </div>
    );
};

export default RenderedArtists;