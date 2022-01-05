import React from 'react'

const Index = ({ alert, type }) => {
    return type
        ? <div className="alert alert-primary" role="alert">
            {alert}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        : (<div className="alert alert-danger" role="alert">
            {alert}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>)
}

export default Index
