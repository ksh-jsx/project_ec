const GoogleImages = require("google-images");

// ** 8라인 본인의 검색엔진 ID와 API_KEY로 교체 필수
const client = new GoogleImages(
  "f714536b65a0d429e",
  "AIzaSyCT8wYBNMGnn4W7RPvhJIxMCzBC7rmA08o"
);

const keyWord = "양정자이더샵SKVIEW투시도";

// 이미지 검색
const searchFunc = () => {
  client
    .search(keyWord, { page: 1, size: "large" })
    .then((images) => {
      const imgSrc = images
        .filter((img) => img.width > 630 && img.height > 450)
        .sort((a, b) => {
          if (a.width > b.width) {
            return 1;
          }
          return 0;
        })[0].url;

      return imgSrc;
    })
    .catch((error) => {
      console.log(">>>>>>>>>>>>>>>>>>>" + error);
      console.log("모든 이미지를 수집했습니다.");
      return;
    });
};
