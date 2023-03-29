const Card = ({ text, color }) => {
  return (
    <div className="card" style={{ backgroundColor: color }}>
      <img
        className="img"
        src={require("../../assets/img/emoji_medal.png")}
        alt="medal"
      />
      <div className="textHeader">
        {text} <span>1분위</span>
      </div>
      <div className="textArticle">
        이거에 대한 상세 설명 간략하게 알려주는 카드
      </div>
    </div>
  );
};

export default Card;
