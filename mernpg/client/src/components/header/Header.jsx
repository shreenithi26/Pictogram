import "./header.css";

export default function Header() {
  return (
    <div className="header">
      <div className="headerTitles">
      <span className="headerTitleLg">PictoGram</span>
        <span className="headerTitleSm">Memories bring back memories</span>
        
      </div>
      <img
        className="headerImg"
        src="https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        alt=""
      />
    </div>
  );
}
