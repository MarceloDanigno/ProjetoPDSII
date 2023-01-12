import React, { useState, useEffect } from "react";

export const Homepage = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let contentArray = [""];
    const [content, setContent] = useState("");
    const [inContent, setinContent] = useState(false);

    async function getData(url = '') {
        console.log("fetching...");
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    }

    async function handleSubmit() {
        console.log(inContent);
        if (!(inContent)) {
            console.log("Function called!");
            getData('HTTP://localhost:3001/commuList')
                .then((data) => {
                    console.log("Data received!");
                    for (const comm in data) {
                        let currentPosts = eval(data[comm].posts);
                        let prop1 = {
                            title: currentPosts[0].postTitle, author: currentPosts[0].postAuthor,
                            date: currentPosts[0].postData.toUTCString(), description: currentPosts[0].postDesc,
                            karma: currentPosts[0].postKarma, community: data[comm].nameCommunity
                        }
                        let prop2 = {
                            title: currentPosts[1].postTitle, author: currentPosts[1].postAuthor,
                            date: currentPosts[1].postData.toUTCString(), description: currentPosts[1].postDesc,
                            karma: currentPosts[1].postKarma, community: data[comm].nameCommunity
                        }
                        let prop3 = {
                            title: currentPosts[2].postTitle, author: currentPosts[2].postAuthor,
                            date: currentPosts[2].postData.toUTCString(), description: currentPosts[2].postDesc,
                            karma: currentPosts[2].postKarma, community: data[comm].nameCommunity
                        }
                        contentArray.push(childrenPost(prop1));
                        contentArray.push(childrenPost(prop2));
                        contentArray.push(childrenPost(prop3));
                    };
                    setContent(contentArray);
                    setinContent(true);
                });
        }
    }

    function childrenPost(props) {
        return (
            <div className="homepage-post">
                <div style={{ backgroundImage: 'url(backgroundHome.png)' }}></div>
                <h3> {props.community} </h3>
                <h2> {props.title} por {props.author} em {props.date} </h2>
                <p> {props.description} </p>
                <p className="homepage-post_karma">  {props.karma} </p>
            </div>
        );
    }

    useEffect(() => { handleSubmit(); });

    return (
        <div className="homepage-container">
            <h2>HeadIt</h2>
            <button className="link-btn" onClick={() => props.onFormSwitch('login')}> Login </button>
            <div className="homepage-container_post-history">
                {content}
            </div>

        </div>
    )
} 
