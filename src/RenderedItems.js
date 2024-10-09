import React from 'react';

const RenderedItems = ({items}) => {
    return (
        <div>
            {items.slice(0,5).map((item, index) => (
        <div key={item.id} style={{display:'flex', marginBottom: '10px', justifyContent:'flex-start', width:'500px'}}>
          <div style={{fontSize:'24px', marginRight:'10px', textAlign:'left'}}>{index+1}</div>
            {item.images.length ? <img style={{width: '125px', height: '125px', objectFit:'cover', marginRight:'20px'}} src={item.images[0].url} alt=""/> : <div>No Image</div>}
            <div style={{fontSize:'30px', textAlign:'left', width: '200px'}}>
            {item.name}
              </div>
        </div>))}
        </div>
    );
};

export default RenderedItems;