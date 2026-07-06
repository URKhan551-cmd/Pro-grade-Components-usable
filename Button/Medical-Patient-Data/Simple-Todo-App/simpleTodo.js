// there are Two components which is render inside the home i dvide functionality on each and evry comp
// reusable input comp

// this is simple way to handle data in many comp precisely 




import React, {useState} from "react";
import Input from "./Input";
import PostDisplay from "./PostDisplay";

function Home() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [posts, setPost] = useState([])
 function createHappen(){
  if(!title || !desc) return;

   setPost(prev => [
    ...prev,
     {
    id: Date.now(),
    title: title,
    description: desc,
   }]);

   setDesc("");
   setTitle("");
 }

 const handleDelete = (id) => {
    setPost(Posts => Posts.filter(post => post.id !== id))
 }
  return (
    <div className="text-center ma-20">
      <div className="mb-20">
        <Input setTitle={setTitle} setDesc={setDesc} title={title} desc={desc} />
        <button data-testid="create-button" className="mt-10" onClick={createHappen}>
          Create Post
        </button>
      </div>
      <div className="posts-section">
        <PostDisplay posts={posts} handleDelete={handleDelete}  />
      </div>
    </div>
  );
}

export default Home;



import React from "react";

function Input({setTitle, setDesc, title, desc}) {
  return (
    <div className="layout-column justify-content-center align-items-center">
      <input className="w-100" type="text" placeholder="Enter Title" value={title} data-testid="title-input" onChange={(e) => setTitle(e.target.value)} />
      <textarea className="mt-10 w-100" placeholder="Enter Description" value={desc} data-testid="description-input" onChange={(e) => setDesc(e.target.value)} />
    </div>
  );
}

export default Input;


import React from "react";

function PostDisplay({posts, handleDelete}) {

  // const [post, setPost] = useState([]);
  
  return (
    <div data-testid="posts-container" className="flex wrap gap-10">
     
        {posts.map((post) => (
           <div className="post-box" key={post.id}>
            <h3>{post.title}</h3>
        <p>{post.description}</p>
        <button onClick={() => handleDelete(post.id)}>Delete</button>
      </div>
        ))}
        
    </div>
  );
}

export default PostDisplay;
