const tmp = sessionStorage.getItem("tmp");

export const data = [
  {
    Q: `<span>성인</span>이거나,<br/> 자녀 양육, 또는 형제자매를 부양하는<br/><span>세대주인 미성년자</span> 입니까?`,
    input: `<button>예</button><button>아니오</button>`,
  },
  {
    Q: `현재 ${tmp}님이<br/><span>거주하고 있는 지역</span>을 선택해 주세요.`,
    input: `
      <div>지역을 선택해 주세요</div>
      <div>
        <div><div>서울특별시</div><div>경기도</div></div>
        <div><div>강원도</div><div>충청북도</div></div>
        <div><div>충청남도</div><div>대전광역시</div></div>
        <div><div>세종특별자치시</div><div>전라북도</div></div>
        <div><div>전라남도</div><div>광주광역시</div></div>
        <div><div>경상북도</div><div>경상남도</div></div>
        <div><div>부산광역시</div><div>대구광역시</div></div>
        <div><div>울산광역시</div><div>제주특별자치도</div></div>
      </div>`,
  },
  {
    Q: `현재<br/><span>청약 통장을 보유</span>하고 계신가요?`,
    input: `<button>예</button><button>아니오</button>`,
  },
  {
    Q: `청약 통장을 <span>만든 후 기간</span>이<br/>얼마나 지나셨나요?`,
    input: `
      <button>1개월</button><button>6개월</button>
      <button>12개월</button><button>24개월 초과</button>
    `,
  },
  {
    Q: `현재 청약 통장에<br/>납입하고 있는 금액이 얼마인지<br/>입력해 주세요.`,
    input: `<input placeholder="금액을 입력해 주세요."/>`,
  },
  {
    Q: `예치금 <span>납입 횟수</span>를<br/>선택해 주세요`,
    input: `
      <button>1회 이상</button><button>6회 이상</button>
      <button>12회 이상</button><button>24회 이상</button>
    `,
  },
];
