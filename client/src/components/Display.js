import React from 'react'
import Analysis from './Analysis'

export default function AnalysisList(props) {
    return (
        <div className="list">
            {props.cookie2.reverse().map((pair, i) => 
                <Analysis 
                key={i}
                analysis={pair}
            />)}
            {props.cookie1.reverse().map((pair, i) => 
                <Analysis 
                key={i}
                analysis={pair}
            />)}
        </div>
    );
}

