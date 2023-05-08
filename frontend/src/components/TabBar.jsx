import { useState } from "react";

import {
  WorkoutIcon,
  GridIcon,
  FavoriteIcon,
  DeleteIcon,
  AddIcon,
  CreateWorkoutIcon,
} from "../assets/icons";
import AddPostForm from "./AddPostForm";

import { PostContainer } from "../styledComponents/Profile";
import {
  TabBarContainer,
  TabContainer,
  //   Tab,
  TabIconContainer,
  TabButton,
  CreateWorkoutContainer,
} from "../styledComponents/TabBar";
import WorkoutContainerComp from "./WorkoutContainerComp";
const TabBar = ({
  //props for WORKOUTS
  handleExerciseForm,
  workoutName,
  handleNameChange,
  toggleAddWorkoutModal,
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
  user,
  slidePostId,
  nextSlide,
  prevSlide,
  slidePosition
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

          {/* {posts &&
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
            })} */}

          <PostContainer>
          {console.log(posts)}
            {posts &&
              posts.map((post) => {
                return (
                  <div className="posts">
                    <h3> {user.fname} </h3>
                    <div className="carousel">
                      {post.images.map((img, index) => {
                        return (
                          <>
                            {slidePostId === post._id ? (
                              <div
                                className={`carousel-item ${
                                  index === slidePosition
                                    ? "carousel-item-visible"
                                    : "carousel-item-hidden"
                                }`}
                              >
                                <img src={img.url} />
                              </div>
                            ) : (
                              <>
                                {index === 0 ? (
                                  <div className="carousel-item-visible">
                                    <img src={img.url} />
                                  </div>
                                ) : (
                                  <div className="carousel-item-hidden">
                                    <img src={img.url} />
                                  </div>
                                )}
                              </>
                            )}
                            {post.images.length > 1 ? (
                              <div className="carousel-actions">
                                <button
                                  onClick={() =>
                                    prevSlide(post.images.length, post._id)
                                  }
                                  id={`carousel-button-prev`}
                                  aria-label="Previous"
                                >
                                  {" "}
                                  &lt;{" "}
                                </button>
                                <button
                                  onClick={() =>
                                    nextSlide(post.images.length, post._id)
                                  }
                                  id={`carousel-button-next`}
                                  aria-label="Next"
                                >
                                  {" "}
                                  &gt;{" "}
                                </button>
                              </div>
                            ) : (
                              <div> </div>
                            )}
                          </>
                        );
                      })}
                    </div>
                    <h4> {post.caption} </h4>
                    <h5> Comments </h5>
                    <button onClick={() => deletePost(post._id)}>
                      {" "}
                      Delete{" "}
                    </button>
                  </div>
                );
              })}
          </PostContainer>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <CreateWorkoutContainer className="create-workout">
            {loggedInId === id ? (
              <form onSubmit={(e) => handleExerciseForm(e)}>
                <input
                  type="text"
                  value={workoutName.name}
                  name="name"
                  onChange={handleNameChange}
                  placeholder="Workout Name"
                  size="15"
                  required
                />
                <button
                  // type="button"
                  disabled={!workoutName.name}
                  onClick={toggleAddWorkoutModal}
                  title="Create a Workout"
                >
                  <CreateWorkoutIcon />
                </button>{" "}
              </form>
            ) : (
              ""
            )}
          </CreateWorkoutContainer>
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
