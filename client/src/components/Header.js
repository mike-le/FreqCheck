import React from 'react'

export default function Header(props) {
    return (
        <div>
            <header className = 'header'>
            <div className="container">          
                FreqCheck
            </div>
            </header>
            <div className='title'>
                Word Frequency Counter
            </div>
            <div className='subtitle'>
                Upload text document and find the most frequently used words
            </div>
        </div>
    );
}

