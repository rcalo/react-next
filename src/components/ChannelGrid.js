import React, { Component } from 'react';
import {Link} from '../../routes';
import 'isomorphic-fetch';
import slug from '../helper/slug';

class ChannelsGrid extends Component{
    render(){
        const {channels, title} = this.props 
        return( 
            <div>
                <h2 className="Title">{title}</h2>
                
                <div className="channels">
                    { channels.map( (item) => {
                        return (
                            <Link 
                                route='channel'
                                params={{
                                    slug: slug(item.title),
                                    id: item.id
                                }} 
                                prefetch key={item.id}
                            >
                                <a className="channel">
                                    <img src={item.urls.logo_image.original}></img>
                                    <h2>{item.title}</h2>
                                </a>
                            </Link>
                            )
                        })
                    }
                </div>

                <style jsx>{`
                    header {
                        color: #fff;
                        background: #8756ca;
                        padding: 15px;
                        text-align: center;
                    }

                    }
                    .channels {
                        display: grid;
                        grid-gap: 15px;
                        padding: 15px;
                        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
                        
                    }
                    .channel {
                        display: block;
                        border-radius: 3px;
                        margin-bottom: 0.5em;
                        color: #333;
                        text-decoration: none;
                    }
                    .channel img {
                        width: 100%;
                        border-radius: 3px;
                        box-shadow: 0px 2px 6px rgba(0,0,0,0,.15);
                        width: 130px;
                        display: block;
                        margin-right: auto;
                        margin-left: auto;
                    }
                    h2 {
                        padding: 5px;
                        font-size: 0.9em;
                        font-weight: 600;
                        maring: 0 auto;
                        text-align: center;
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
        )}
}


export default ChannelsGrid;