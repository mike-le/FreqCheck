import React from "react";

export default function Analysis(props) {
    return (
        props.analysis.map((pair, i) =>
            <div key={i} className='fadein'>
                <div>
                    {i+1}. {Object.keys(pair)[0]}: {Object.values(pair)[0]} 
                </div>
            </div>
        )
    );
}