import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Posts from "../Posts/posts.js";
import axios from "axios";
import moment from "moment";

export default function Dashboard() {
  // state to assign all the posts in the database
  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("/posts");
      setAllPosts(response.data);
    }
    fetchData();
  }, []);

  // Now, assigning only those posts which has bidding end date greater than current date
  let posts = [];
  let today = new Date();
  for (let i = 0; i < allPosts.length; i++) {
    if (moment(today).isBefore(allPosts[i].bidding_end_date)) {
      posts.push(allPosts[i]);
    }
  }

  // Setting 5 recent posts for sidebar
  let recent = [];
  for (let i = 0; i < posts.length; i++) {
    if (recent.length < 5) {
      recent.push(posts[i]);
    } else {
      break;
    }
  }

  return (
    <div>
      <section className="blog-listing gray-bg">
        <div className="container">
          <div className="row align-items-start">
            <div className="col-lg-8 m-15px-tb">
              <div className="row">
                {/** looping in reverse order to get latest posts first */}
                {posts.reverse().map((e) => (
                  <div className="col-sm-6" key={e._id}>
                    <Posts key={e._id} data={e} />
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-4 m-15px-tb blog-aside">
              <div className="widget widget-latest-post">
                <div className="widget-title">
                  <h3 style={{ color: "brown" }}>Latest Post</h3>
                </div>
                <div className="widget-body">
                  <div className="latest-post-aside media">
                    {/** looping in reverse order to get latest posts first */}
                    {recent.reverse().map((e) => (
                      <div className="lpa-left media-body" key={e._id}>
                        <div className="lpa-title">
                          <h5 className="recent_post">
                            <Link to={`/posts/${e._id}`}>{e.title}</Link>
                          </h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
