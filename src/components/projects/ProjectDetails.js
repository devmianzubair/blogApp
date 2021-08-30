import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCommentToProject } from "../../redux/slices/projectSlice";
import HtmlParser from 'react-html-parser';
import { colors } from "../../Colors";
import swal from "sweetalert";
import moment from "moment";
import firebase from "../../firebase/config";
import { LikeOutlined } from "@ant-design/icons";
import {Button,Input,Card} from "antd"
const { TextArea } = Input;

function ProjectDetails(props) {

  const [proDetail, setProDetail] = useState({ });
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [like, setLike] = useState(false);
  const [likeList, setLikeList] = useState([]);
  const [likebtnColor, setLikebtnColor] = useState("black");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.userAuth);

  const id = props.match.params.id;

  const fetchComments = () => {
    firebase
      .firestore()
      .collection("analytics")
      .doc(id)
      .collection("comments")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        setCommentList(
          snapshot.docs.map((doc) => ({
            username: doc.data().username,
            comment: doc.data().comment,
            userId: doc.data().userId,
            createdAt: doc.data().createdAt,
          }))
        );
      });
  };

  const fetchLikes = () => {
    firebase
      .firestore()
      .collection("analytics")
      .doc(id)
      .collection("likes")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        setLikeList(
          snapshot.docs.map((doc) => {
            if (doc.id === auth.userId) {
              setLikebtnColor("green");
              setLike(true);
            }
            return {
              username: doc.data().username,
              userId: doc.data().userId,
            };
          })
        );
      });
  };

  const updateDocument = async () => {
    const doc = firebase.firestore().collection("projects").doc(id);
    const getDoc = await doc.get();
    const getData = getDoc.data();
    await doc.update({
      title: getData.title,
      content: getData.content,
      authorName: getData.authorName,
      authorId: getData.authorId,
      createdAt: getData.createdAt,
      view: getData.view + 1,
    });
  }

  const fetchProject = async () => {
    setLoading(true);
    updateDocument();
    const result = firebase.firestore().collection("projects").doc(id);
    const document = await result.get();
    const response = document.data();
    setProDetail(response);
    setLoading(false);
  };

  useEffect(() => {
    fetchProject();
    fetchComments();
    fetchLikes();
  }, []);

  const postLike = async () => {
    await firebase
      .firestore()
      .collection("analytics")
      .doc(id)
      .collection("likes")
      .doc(auth.userId)
      .set({
        userId: auth.userId,
        username: auth.userName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setLikebtnColor("green");
      })
      .catch((err) => {
        swal("Error: " + err.message);
      });
  };

  const removeLike = async () => {
    await firebase
      .firestore()
      .collection("analytics")
      .doc(id)
      .collection("likes")
      .doc(auth.userId)
      .delete()
      .then(() => {
        setLikebtnColor("black");
      })
      .catch((err) => {
        swal("Error: " + err.message);
      });
  };
  const changeLikeStatus = () => {
    if (auth.userId) {
      if (like === true) {
        removeLike();
        setLike(false);
      } else if (like === false) {
        postLike();
        setLike(true);
      }
    } else {
      swal("Create Account First");
    }
  };

  const handleCommentPost = async (e) => {
    e.preventDefault();
    const userId = auth.userId;
    const username = auth.userName;
    if (userId) {
      if (comment) {
        dispatch(addCommentToProject({ comment, id, userId, username }));
      }
    } else {
      swal("Create Account First!");
    }
    setComment("");
  };
  const Divider = () => {
    return (
      <div
        style={{ border: "1px solid rgb(224,224,224) ", height: "30px" }}
      ></div>
    );
  };
  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "100px",
            marginBottom: "280px",
            height: "100%",
          }}
        >
          <div className="preloader-wrapper active">
            <div className="spinner-layer spinner-red-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div>
              <div className="gap-patch">
                <div className="circle"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="container section project-details "
          style={{ marginTop: "70px" }}
        >
          <div className="card">
            <div className="card z-depth-0">
              <div className="card-content">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span className="card-title" style={{ fontWeight: 'bold', fontSize: '16px' }}></span>
                  <div style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between' }}>
                    <span onClick={changeLikeStatus} title="like">
                      <i
                        style={{
                          cursor: "pointer",
                          color: `${likebtnColor}`,
                          marginRight: "20px",
                          
                        }}

                      >
                        <LikeOutlined style={{ fontSize: "25px" }} />
                      </i>
                    </span>
                  </div>

                </div>
                <div style={{ fontSize: '14px' }}>{HtmlParser(proDetail.content)}</div>
                <div className="card-action grey lighten-4 grey-text">
                  <div>Posted by {proDetail.authorName}</div>
                </div>
              </div>
            </div>

            {/* analytics */}

            <div className=" section project-analytics">
              <div className="card z-depth-0" style={{ pading: "20px" }}>
                <div
                  className="card-action"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <span>Views : {proDetail.view ? proDetail.view : 0}</span>
                  <Divider />
                  <span>Likes : {likeList.length}</span>
                  <Divider />
                  <span>comments : {commentList.length}</span>
                </div>
              </div>
            </div>
            {/* comment section */}
            <div className=" section project-comments">
              <div className="card z-depth-0">
                <div className="card-content">
                  <div
                    className="card-title"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Comments</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <TextArea
                      placeholder="type  . . ."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      style={{ padding: "10px" ,marginBottom:"20px"}}
                    />
                    <Button
                      type="primary"
                      style={{ zIndex: "0" }}
                      onClick={handleCommentPost}
                    >
                      POST
                    </Button>
                  </div>
                  {commentList ? (
                    <div 
                      style={{marginTop: "20px"}}
                    >
                      <div className="card">

                        {commentList.map((c, index) => (
                          <Card hoverable
                            key={index}
                            style={{
                              padding: "5px 5px",
                              
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <div
                                style={{ display: "flex", alignItems: "center" }}
                              >
                                <button
                                  className="btn btn-floating lighten-1 z-depth-0"
                                  style={{
                                    marginRight: "10px",
                                    zIndex: "0",
                                    backgroundColor: `${colors[
                                      Math.floor(Math.random() * colors.length)
                                    ]
                                      }`,
                                  }}
                                >
                                  {c.username.slice(0, 1)}
                                </button>
                                <div
                                  style={{ fontWeight: "bold", color: "black" }}
                                >
                                  {c.username}
                                </div>
                              </div>
                              <div
                                style={{ fontWeight: "bold", fontSize: "12px" }}
                              >
                                {c.createdAt &&
                                  moment(c.createdAt.toDate()).fromNow()}
                              </div>
                            </div>
                            <div
                              style={{ marginTop: "5px", paddingLeft: "70px" }}
                            >
                              {c.comment}
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h1>loading...</h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectDetails;
