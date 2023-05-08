import { useState } from "react";

import {
  WorkoutIcon,
  GridIcon,
  FavoriteIcon,
  DeleteIcon,
} from "../assets/icons";
import AddPostForm from "./AddPostForm";

import {
  TabBarContainer,
  TabContainer,
  Tab,
  TabIconContainer,
  TabButton,
} from "../styledComponents/TabBar";
import WorkoutContainerComp from "./WorkoutContainerComp";
const TabBar = ({
  //props for WORKOUTS
  workouts,
  loggedInId,
  id,
  EditIcon,
  clickEditWorkout,
  deleteWorkout,
  activeDropdown,
  //props for POSTS
  handlePostChange,
  postForm,
  posts,
  createPost,
  handleFileUpload,
}) => {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <TabBarContainer className="container">
      <TabContainer className="bloc-tabs">
        <TabButton
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          <TabIconContainer>
            <GridIcon />
          </TabIconContainer>
          <div>Posts </div>
        </TabButton>

        <TabButton
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          <TabIconContainer>
            <WorkoutIcon />
          </TabIconContainer>
          <div>Workouts </div>
        </TabButton>

        <TabButton
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          <TabIconContainer>
            <FavoriteIcon />
          </TabIconContainer>
          <div>Favorites</div>
        </TabButton>
      </TabContainer>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <AddPostForm
            handlePostChange={handlePostChange}
            postForm={postForm}
            posts={posts}
            createPost={createPost}
            handleFileUpload={handleFileUpload}
          />

          {posts &&
            posts.map((post) => {
              return (
                <div>
                  <h3> POST </h3>
                  <h5> {post.caption} </h5>
                  <div>
                    {post.images.map((img) => {
                      return <img width="100px" height="100px" src={img.url} />;
                    })}
                  </div>
                  <button onClick={() => deletePost(post._id)}> Delete </button>
                </div>
              );
            })}
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <WorkoutContainerComp
            workouts={workouts}
            loggedInId={loggedInId}
            id={id}
            EditIcon={EditIcon}
            clickEditWorkout={clickEditWorkout}
            deleteWorkout={deleteWorkout}
            activeDropdown={activeDropdown}
          />
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <div>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. In,
            cupiditate. Provident nisi explicabo aliquid fugit libero dolores
            odit veritatis ipsa quaerat, quia voluptatibus quisquam magni vel,
            reiciendis deleniti laboriosam quod!
          </div>
        </div>
      </div>
    </TabBarContainer>
  );
};

export default TabBar;
