import React from 'react'

export default props => 
    props.wordCount.map((pair, i) =>
        <div key={i} className='fadein'>
            <div>
                {i+1}. {Object.keys(pair)[0]}: {Object.values(pair)[0]} 
            </div>
        </div>
    )