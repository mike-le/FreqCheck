import React from "react";
import moment from 'moment';

export default function Analysis(props) {
    return (
        <tr>
            <td> { props.index + 1 } </td>
            <td> { props.analysis['name']} </td>
            <td> { moment(props.analysis['date']).fromNow() } </td>
        </tr>
    );
}