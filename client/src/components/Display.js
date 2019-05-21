import React from 'react'
import Analysis from './Analysis'

export default function AnalysisList(props) {
    return (
        <div className="list">
            {props.cookie2.reverse().map((pair, i) => 
                <Analysis 
                key={i}
                id={i}
                analysis={pair}
                cookie={2}
            />)}
            {props.cookie1.reverse().map((pair, i) => 
                <Analysis 
                key={i}
                id={i}
                analysis={pair}
                cookie={1}
            />)}
        </div>
    );
}

