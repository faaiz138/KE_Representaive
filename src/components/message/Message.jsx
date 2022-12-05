import "../../components/message/message.css"

function Message({own}) {
  return (
    <div className={own? "message own" : "message"}>
        <div className="messageTop">
            <img className="messageImg" src="https://gravatar.com/avatar/668a099fb2fae9e38de2217c1bf74dd9?s=400&d=robohash&r=x" alt=""/>
        <p className="messageText">Hello this is a Message</p>
        </div>
        <div className="messageBottom">1 Hour Ago</div>
    </div>
  )
}

export default Message