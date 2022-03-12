import React  from 'react'

const Newsitem=(props)=> {

    
        let { title, description, imageUrl, newsUrl, autor, date, source } = props
        return (
            <div className="my-3">
                <div className="card" >
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-success" style={{left:'90%' ,zIndex:1}}>
                        {source}

                    </span>
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title} </h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">by {autor} at {date}</small></p>
                        <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read more</a>
                    </div>
                </div>
            </div>
        )
    
}

export default Newsitem