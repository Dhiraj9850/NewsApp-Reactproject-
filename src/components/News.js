import React,{useEffect,useState} from 'react'
import Newsitem from './Newsitem'
import Spineer from './Spineer';
import PropTypes from 'prop-types'

const News=(props)=> {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
  
   const capitalizeFirstLetter=(string)=>{
         return string.charAt(0).toUpperCase()+string.slice(1);

    }
    // document.title = `${capitalizeFirstLetter(props.category)}-NewSFox`
 
    const UpdateNews =async()=>{
        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apikey=f4826d7459454b8f80567b33de82f97d&page=${page}&pageSize=${props.pageSize}`;
      
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        console.log(parsedData);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
       
        props.setProgress(100);
    }
    useEffect(() => {
      UpdateNews();
    }, [])
    
  
    // functions for previous and next buttons 
    const handlePrevClick = async ()=>{
       console.log("previous");
  
 
    setPage(page-1)
    UpdateNews();
    }
    const handleNextClick = async ()=>{
        console.log("next");
      
       
        setPage(page+1)
        UpdateNews();
        // }

    }
        return (
            <div className="container my-3">
   
                <h2 className="text-center">NewSFox-TOP {capitalizeFirstLetter(props.category)} News</h2>
                {loading && <Spineer/>}            
                <div className="row">
                    {!loading&&articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} autor={element.author} date={element.publishedAt} source={element.source.name}/>
                        </div>
                    })}


                </div>
                <div className="container d-flex justify-content-between my-4">
                    <button disabled={page<=1} type="button" className="btn btn-sm btn-dark" onClick={handlePrevClick}>&larr;Previous</button>
                    <button disabled={page + 1 > Math.ceil(totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next&rarr;</button>
                </div>

            </div>
        )
    

}
News.defaultProps = {
    country:'in',
    pageSize:8,
    category:'general'
}
 News.propTypes = {
     country:PropTypes.string,
     pageSize:PropTypes.number,
     category:PropTypes.string
 }
export default News