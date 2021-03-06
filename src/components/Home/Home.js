import React from "react";
import { Fragment } from "react";

import { useState, useEffect, useRef } from "react";
import OwlCarousel from "react-owl-carousel2";
import "react-owl-carousel2/lib/styles.css";
import "react-owl-carousel2/src/owl.theme.default.css";
import ListMess from "./ListMess";
import BoxChat from "./BoxChat";
import ListSenderRequest from "./ListSenderRequest";
import ListGroup from "./ListGroup";
import ListFriend from "./ListFriend";
import FormInformation from "./form-information/FormInformation";
import classes from "./home.module.scss";
import img1 from "../../assets/owl_1.png";
import img2 from "../../assets/owl_2.jpg";
import img3 from "../../assets/owl_3.jpg";
import img4 from "../../assets/owl_4.png";
import img5 from "../../assets/owl_5.jpg";
import img6 from "../../assets/owl_6.jpg";
import io from "socket.io-client";
import FormLogOut from "./form-logOut/FormLogOut";
import { useSelector } from "react-redux";
import FormCallVideo from "./form-video/FormCallVideo";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
//let socket;
const Home = (props) => {
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   console.log(token);
  //   if (!token) {
  //     history.replace("/signin");
  //   }
  // });
  const [receivingCall, setReceivingCall] = useState(false); //Gioongs form call video
  const [nameFromCallVideo, setNameFromCallVideo] = useState(""); //Gioongs form call video
  const [nameFromCallVideoSocket, setNameFromCallVideoSocket] = useState(""); //Gioongs form call video trong socket
  const [avatarFromCallVideoSocket, setAvatarFromCallVideoSocket] = useState(
    ""
  ); //Gioongs form call video trong socket
  const [callAcceptFromVideo, setCallAcceptFromVideo] = useState(false); //Gioongs form call video
  const [activeAnswer, setAciveAnswer] = useState(false);
  const [activeCalling, setActiveCalling] = useState(false);
  const [checkOpenFormCalling, setCheckOpenFormCalling] = useState(false);
  const [dataSignal, setDataSignal] = useState(null);
  const [isWelcome, setIsWelcome] = useState(true);
  const [isBtnMess, setIsBtnMess] = useState(true);
  const [isBtnPhoneBook, setIsBtnPhoneBook] = useState(false);
  const [isInviteFriend, setIsInviteFriend] = useState(false);
  const [isChatInput, setIsChatInput] = useState(false);
  const [isForm, setIsForm] = useState(false);
  const [user, setUser] = useState(null);
  const [room, setRoom] = useState(null);
  const [isOpenFormLogOut, seIsOpenFormLogOut] = useState(false);
  const [isListSenderRequest, setIsListSenderRequest] = useState(true);
  const [isOpenFormCallVideo, setIsOpenFormCallVideo] = useState(""); //Cho form call video
  const [avatar, setAvatar] = useState(""); //L??u t??n mess khi nh???n t??? boxchat ????? truy???n xu???ng ListMess
  // const []
  const socket = useRef();
  const ENDPOINT = "localhost:5000";
  const loggedInUser = useSelector((state) => state.user.current);
  const history = useHistory();
  useEffect(() => {
    setAvatar(loggedInUser.avatar);
  }, []);
  // const idLogin = loggedInUser._id;
  useEffect(() => {
    socket.current = io(ENDPOINT, {
      transports: ["websocket", "polling", "flashsocket"],
    });
  }, []);
  //console.log(socket);
  //const [socketTT, setSocketTT] = useState();
  //const socket = useRef();
  //setSocketTT(socket);

  // useEffect(() => {
  //   socket.current = io('localhost:3000',{
  //     transports: ['websocket','polling','flashsocket'],
  // });
  // }, []);
  // console.log(socket);

  // const socketSlice = createSlice({
  //   name: "socketTT",
  //   initialState: {
  //     current: socket,
  //   },
  //   reducers: {},
  //   extraReducers: {
  //     [signin.fulfilled]: (state, action) => {
  //       state.current = action.payload; //update tr??n store
  //     },
  //   },
  // });
  const isChatHandler = ({ user, room }) => {
    setIsWelcome(false);
    setIsChatInput(true);
    setUser(user);
    setRoom(room);
    //socket.emit('join',room);
  };
  const btnMessHandler = () => {
    setIsBtnMess(true);
    setIsBtnPhoneBook(false);
    setIsInviteFriend(false);
    setIsWelcome(true);
    setIsListSenderRequest(true);
  };

  const friendHandler = () => {
    setIsBtnPhoneBook(true);
    setIsBtnMess(false);
    setIsInviteFriend(true);
    setIsWelcome(false);
    setIsChatInput(false);
  };
  const formInformationHandler = () => {
    setIsForm(true);
  };
  const formfalseHandler = (falseFromForm) => {
    setIsForm(falseFromForm);
  };
  const options = {
    items: 1,
    nav: true,
    navText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    loop: true,
  };

  const logOutHandler = () => {
    seIsOpenFormLogOut(true);
  };
  const falseFromLogOut = () => {
    seIsOpenFormLogOut(false);
  };

  const isListSenderRequestHandler = (isListSenderRequest) => {
    // console.log(isListSenderRequest);
    setIsListSenderRequest(isListSenderRequest);
  };

  //callvideo
  useEffect(() => {
    socket.current.on("abc", (data) => {
      setNameFromCallVideoSocket(data.name);
      setAvatarFromCallVideoSocket(data.avatar);
      setTimeout(() => {
        setCheckOpenFormCalling(true);
      }, 4000);
    });

    socket.current.on("calling", (data) => {
      setDataSignal(data);
    });
  }, [activeCalling]);

  //nh???n bi???n calling t??? boxchat
  const receiveCallingHandler = ({
    receivingCall,
    callAccepted,
    name,
    activeCalling,
  }) => {
    setReceivingCall(receivingCall);
    setCallAcceptFromVideo(callAccepted);
    setNameFromCallVideo(name);
    setActiveCalling(activeCalling);
  };

  const ActiveAnswerCall = () => {
    setAciveAnswer(true);
    setCheckOpenFormCalling(false);
  };
  // const [isOpenFormCallVideo, setIsOpenFormCallVideo] = useState(false);
  const formfalseHandlerFromBoxChat = (falseFromForm) => {
    setAciveAnswer(falseFromForm);
  };
  const closeFormCallVideo = (falseFromCallVideo) => {
    setAciveAnswer(falseFromCallVideo);
  };

  const cancelHandler = (e) => {
    e.preventDefault();
    setIsOpenFormCallVideo("");
  };

  useEffect(() => {
    if (checkOpenFormCalling) {
      setCheckOpenFormCalling(classes.active);
    } else {
      setCheckOpenFormCalling("");
    }
  }, [checkOpenFormCalling]);
  // console.log(checkOpenFormCalling);

  //socket khi b???n th??n x??a group chat th?? hi???n welcome
  useEffect(() => {
    socket.current.on("delete-group-by-me", (data) => {
      setIsBtnMess(true);
      setIsBtnPhoneBook(false);
      setIsInviteFriend(false);
      setIsWelcome(true);
      setIsListSenderRequest(true);
    });
  }, []);

  //socket khi ngta x??a nh??m th?? m??nh hi???n welcome
  useEffect(() => {
    socket.current.on("delete-group", (data) => {
      setIsBtnMess(true);
      setIsBtnPhoneBook(false);
      setIsInviteFriend(false);
      setIsWelcome(true);
      setIsListSenderRequest(true);
      toast.warn(`"Nh??m ${data.name} ???? b??? x??a!"`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: false,
      });
    });
  }, []);

  //socket khi m??nh t??? r???i nh??m th?? n?? hi???n welcome
  useEffect(() => {
    socket.current.on("exit-group-by-me", (data) => {
      setIsBtnMess(true);
      setIsBtnPhoneBook(false);
      setIsInviteFriend(false);
      setIsWelcome(true);
      setIsListSenderRequest(true);
    });
  }, []);

  //socket khi m??nh khi b??? ng?????i kh??c m???i ra kh???i nh??m th?? n?? hi???n welcome
  useEffect(() => {
    socket.current.on("removed-by-other-person", (data) => {
      setIsBtnMess(true);
      setIsBtnPhoneBook(false);
      setIsInviteFriend(false);
      setIsWelcome(true);
      setIsListSenderRequest(true);
      toast.warn(`"B???n ???? b??? m???i ra kh???i nh??m ${data.name}!"`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: false,
      });
    });
  }, []);

  //socket khi m??nh x??a b???n trong formUserInformation th?? n?? hi???n welcome
  useEffect(() => {
    socket.current.on("delete-friend-by-me", (data) => {
      setIsBtnMess(true);
      setIsBtnPhoneBook(false);
      setIsInviteFriend(false);
      setIsWelcome(true);
      setIsListSenderRequest(true);
    });
  }, []);

  // const onReceiveNameFromBoxChat = (name) => {
  //   setNameMess(name);
  // };

  const ReceiveAvatarFromFI = (avatar) => {
    setAvatar(avatar);
  };

  return (
    <Fragment>
      <div className={classes.wrapper}>
        <div className={classes.left}>
          <div className={classes.avatar} onClick={formInformationHandler}>
            <img src={avatar} alt="" />
            <div className={classes.active}></div>
          </div>
          <div
            className={`${classes.mess} ${
              isBtnMess ? classes.activetoggle : ""
            } `}
            onClick={btnMessHandler}
          >
            <i className="fas fa-comment" title="Tin nh???n"></i>
          </div>
          <div
            className={`${classes.friend} ${
              isBtnPhoneBook ? classes.activetoggle : ""
            } `}
            onClick={friendHandler}
          >
            <i className="fas fa-address-book" title="Danh b???"></i>
          </div>
          <div className={classes.logout} onClick={logOutHandler}>
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>

        <div
          className={`${classes.center} ${
            isChatInput ? classes.activeChat : ""
          }`}
        >
          {isBtnMess && (
            <ListMess
              onOpenChat={isChatHandler}
              onSendSocketToListMess={socket}
              // onNameMess={nameMess} //?????y nameMess xu???ng cho listMess
            />
          )}

          {isBtnPhoneBook && (
            <ListFriend
              onSendSocketToListFriend={socket}
              isListSenderRequest={isListSenderRequestHandler}
              // isListGroup={isListGroup}
            />
          )}
        </div>

        <div
          className={`${classes.right} ${
            isChatInput ? classes.activeChat : ""
          }`}
        >
          {isWelcome && (
            <div className={classes.first}>
              <div className={classes.content}>
                <p className={classes.tittle}>
                  Ch??o m???ng ?????n v???i <b>ZOLA PC!</b>{" "}
                </p>
                <p className={classes.text}>
                  Kh??m ph?? nh???ng ti???n ??ch h??? tr??? l??m vi???c v?? tr?? chuy???n c??ng
                  ng?????i th??n, b???n b?? ???????c t???i ??u h??a cho m??y t??nh c???a b???n.
                </p>
              </div>
              <div className={classes.owl}>
                <OwlCarousel options={options}>
                  <div className={classes.item}>
                    <img src={img1} alt="1" />
                    <h4>Nh???n tin nhi???u h??n, so???n th???o ??t h??n</h4>
                    <p>
                      S??? d???ng <b>Tin Nh???n Nhanh</b> ????? l??u tr??? c??c tin nh???n
                      th?????ng d??ng v?? g???i nhanh trong h???p tho???i b???t k??
                    </p>
                  </div>
                  <div className={classes.item}>
                    <img src={img2} alt="2" />
                    <h4>G???i nh??m v?? l??m vi???c hi???u qu??? v???i Lazo Group Call</h4>
                    <p>Trao ?????i c??ng vi???c m???i l??c m???i n??i</p>
                  </div>
                  <div className={classes.item}>
                    <img src={img3} alt="3" />
                    <h4>Tr???i nghi???m xuy??n su???t</h4>
                    <p>
                      K???t n???i v?? gi???i quy???t c??ng vi???c tr??n m???i thi???t b??? v???i d???
                      li???u lu??n ???????c ?????ng b???
                    </p>
                  </div>
                  <div className={classes.item}>
                    <img src={img4} alt="4" />
                    <h4>G???i file n??ng?</h4>
                    <p>???? c?? ZOLA PC "x???" h???t</p>
                  </div>
                  <div className={classes.item}>
                    <img src={img5} alt="5" />
                    <h4>Chat nh??m v???i ?????ng nghi???p</h4>
                    <p>Ti???n l???i h??n, nh??? c??c c??ng c??? chat tr??n m??y t??nh</p>
                  </div>
                  <div className={classes.item}>
                    <img src={img6} alt="6" />
                    <h4>Gi???i quy???t c??ng vi???c hi???u qu??? h??n, l??n ?????n 40%</h4>
                    <p>V???i ZOLA PC</p>
                  </div>
                </OwlCarousel>
              </div>
            </div>
          )}

          {isChatInput && (
            <BoxChat
              onSendSocketToBoxChat={socket}
              onSendUserToBoxChat={user}
              onSendRoomToBoxChat={room}
              onReceiveCallingFromBoxChat={receiveCallingHandler}
              onSendActiveAnswerToBoxChat={activeAnswer}
              onFormFalseFromBoxChat={formfalseHandlerFromBoxChat}
              // onSendNameToHome={onReceiveNameFromBoxChat} //Nh???n name t??? boxchat khi c???p nh???t nh??m
            />
          )}

          {isInviteFriend && isListSenderRequest && (
            <ListSenderRequest onSendSocketToListSenderRequest={socket} />
          )}
          {!isListSenderRequest && <ListGroup></ListGroup>}
        </div>
      </div>
      {
        <FormInformation
          isForm={isForm}
          onFormFalse={formfalseHandler}
          onSendAvatarToHome={ReceiveAvatarFromFI}
        />
      }

      {
        <FormLogOut
          isOpenFormLogOut={isOpenFormLogOut}
          onFormFalse={falseFromLogOut}
        ></FormLogOut>
      }

      {/* Form cu???c g???i ngo??i */}
      {/* {checkOpenFormCalling && (
        <div className={classes.formAnswer}>
          <div className={classes.bodyFormAnswer}>
            <h2>{nameFromCallVideoSocket} ??ang g???i t???i...</h2>
          </div>
          <button onClick={ActiveAnswerCall}>Ch???p nh???n</button>
        </div>
      )} */}

      <div className={classes.modalFormAnswer}>
        <div className={` ${classes.backdrop} ${checkOpenFormCalling}`}></div>
        <div className={` ${classes.viewFormAnswer} ${checkOpenFormCalling}`}>
          <div className={classes.header}>
            <h2>L???n chat video ?????n</h2>
            <div className={classes.cancel} onClick={cancelHandler}>
              <div className={classes.blur}>
                <i className="bi bi-x"></i>
              </div>
            </div>
          </div>
          <div className={classes.body}>
            <div className={classes.avatarCallVideo}>
              <img src={avatarFromCallVideoSocket} />
            </div>
            <div className={classes.infoCallVideo}>
              <h4>{nameFromCallVideoSocket} ??ang g???i cho b???n</h4>
              <p>Cu???c g???i s??? b???t ?????u ngay khi b???n tr??? l???i</p>
            </div>
          </div>
          <div className={classes.footer}>
            <div className={classes.button}>
              <button className={classes.cancel} onClick={cancelHandler}>
                T??? ch???i
              </button>
              <button className={classes.confirm} onClick={ActiveAnswerCall}>
                <i className="fas fa-video"></i>
                Ch???p nh???n
              </button>
            </div>
          </div>
        </div>
      </div>

      {activeAnswer ? (
        <FormCallVideo
          onSendFormCallVideo={room}
          onSendSocketToFormCallVideo={socket}
          onSendRoomToCallVideo={room}
          onSendActiveAnswerToCallVideo={activeAnswer}
          onFormFalse={closeFormCallVideo}
        />
      ) : null}
    </Fragment>
  );
};
export default Home;
