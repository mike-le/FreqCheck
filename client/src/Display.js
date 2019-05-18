import React from 'react'
import Analysis from './components/analysis'

export default function AnalysisList(props) {
    return (
        <div>
        {props.cookie.map((pair, i) => 
            <Analysis key={i} analysis={pair}/>
        )}
        </div>
    );
}
