import React, { useState } from 'react';
import './YoutubeSearch.scss';
import axios from 'axios';
import moment from 'moment/moment';

const YoutubeSearch = () => {

    const [videos, setVideos] = useState([]);
    const [query, setQuery] = useState('');

    const handleSearch = async () => {

        let res = await axios({
            method: "GET",
            url: `https://www.googleapis.com/youtube/v3/search`,
            params: {
                part: 'snippet',
                maxResults: '10',
                key: 'AIzaSyAgCCb-zVVmWljC8cKqMmg81bihjZBNqmw',
                q: query,
                type: 'video'
            }
        })

        console.log('>>check res', res)

        if (res && res.data && res.data.items) {
            let raw = res.data.items;
            let result = [];

            if (raw && raw.length > 0) {
                raw.map((item) => {
                    let obj = {};
                    obj.id = item.id.videoId;
                    obj.title = item.snippet.title;
                    obj.createdAt = item.snippet.publishedAt;
                    obj.author = item.snippet.channelTitle;
                    obj.description = item.snippet.description;

                    result.push(obj);
                })
            }
            console.log('>> Check results: ', result)


            setVideos(result);
        }
    }

    return (
        <>
            <div className='ytb-search-container'>
                <input
                    type='text'
                    className='ytb-search'
                    value={query}
                    placeholder='Search'
                    onChange={
                        e => setQuery(e.target.value)
                    }
                />
                <button
                    type='button'
                    className='btn-search'
                    onClick={() => handleSearch()}
                >
                    Search
                </button>
            </div>

            {videos && videos.length > 0 &&
                videos.map(item => {
                    return (
                        <div className='ytb-result' key={item.id}>
                            <div className='left'>
                                <iframe
                                    src={`https://www.youtube.com/embed/${item.id}`}
                                    title="#30.2 Design Giao Diện &amp; Hoàn Thiện Chức Năng &#39;Search Youtube&#39; với Google APIs và React Hook"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    className='ytb-iframe'
                                >
                                </iframe>
                            </div>
                            <div className='right'>
                                <div className='title'>
                                    {item.title}
                                </div>
                                <div className='created-at'>
                                    Created At: {moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                                </div>
                                <div className='author'>
                                    {item.author}
                                </div>
                                <div className='description'>
                                    {item.description}
                                </div>
                            </div>

                        </div>
                    )
                })
            }
        </>
    )
}
export default YoutubeSearch;