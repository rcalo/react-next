import React, {PureComponent} from 'react';
import Link from 'next/link'

class PodcastList extends PureComponent{
    render(){

        const {audios, title, onClickPodcast} = this.props

        return(
            <div className="row">
                
                <h2 className="Title">{title}</h2>

                { audios.map((audio) => (
                    <Link href={`/podcast?id=${audio.id}`} prefetch key={audio.id}>
                        <a 
                            className='podcast'
                            onClick={ (event) => onClickPodcast(event, audio)}
                        >
                            <div className="col-sm-2">
                                { audio.urls.post_image && 
                                    <img src={audio.urls.post_image.original} className="thumbnail"></img>  
                                }
                            </div>
                            <div className="col-sm-10">
                                <h4>{ audio.title }</h4>
                                <div className='meta'>
                                    { Math.ceil(audio.duration / 60) } minutes
                                </div>
                            </div>
                        </a>
                    </Link>
                 ))
                }

                <style jsx>{`
                    .podcast {
                        display: flex;
                        text-decoration: none;
                        color: #333;
                        padding: 15px;
                        border-bottom: 1px solid rgba(0,0,0,0.2);
                        cursor: pointer;
                    }
                    .podcast:hover {
                        color: #000;
                    }
                    .podcast h4 {
                        margin: 0 auto;
                    }
                    .podcast .meta {
                        color: #666;
                        margin-top: 0.5em;
                        font-size: 0.8em;
                    }

                    .podcast .thumbnail {
                        width: 50%;
                        border-radius: 3px;
                        box-shadow: 0px 2px 6px rgba(0,0,0,0,.15);
                        width: 50px;
                        display: block;
                    }

                    .Title{
                        padding: 5px;
                        font-size: 1.3em;
                        font-weight: 600;
                        margin: 0;
                        text-align: center;
                    }
                `}</style>
            </div>
        )
    }
}

export default PodcastList;