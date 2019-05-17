import React from 'react'

export default props => 
    props.images.map((image, i) =>
        <div key={i} className='fadein'>
            <div>
                {image[i].name}
            </div>
        </div>
    )