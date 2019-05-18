import React from 'react'
import Analysis from './components/analysis'

export default function AnalysisList(props) {
    return (
        <table className="mainTable">
        <thead className='thead-dark'>
          <tr>
            <th scope='col'>Id</th>
            <th scope="col">Name</th>
            <th scope="col">Date</th>            
          </tr>
        </thead>
        <tbody>
            {props.cookie.map((pair, i) => 
                <Analysis 
                key={i}
                index={i}
                analysis={pair}
            />)}
        </tbody>
      </table>
    );
}
