const nameAddForm = document.querySelector("#nameAddForm");
const nameAddInput = document.querySelector("#nameAddInput");
const nameUl = document.querySelector("#nameUl");
const result = document.querySelector("#result");
const lotteryBtn = document.querySelector("#lotteryBtn");
const resetBtn = document.querySelector("#resetBtn");
const lotteryNumForm = document.querySelector("#lotteryNumForm");
const lotteryNumInput = document.querySelector("#lotteryNumInput");
const lotteryNumBtn = document.querySelector("#lotteryNumBtn");
const USERARR_KEY = "userArr";

let userArr = [];

const saveUser = (username) => {
  userArr.push(username);
  localStorage.setItem(USERARR_KEY, JSON.stringify(userArr));
};

const addName = (username) => {
  const nameLi = document.createElement("li");
  nameLi.textContent = username;
  const deleteUserBtn = document.createElement("button"); //또 선언 말고 없는지
  deleteUserBtn.textContent = "❌";
  deleteUserBtn.addEventListener("click", deleteUser, false);
  nameLi.appendChild(deleteUserBtn);

  nameUl.appendChild(nameLi);
};

const handleNameAddFormSubmit = (e) => {
  e.preventDefault();

  const username = nameAddInput.value;
  if (!username) {
    alert("이름을 입력해주세요!");
    return;
  }

  addName(username);
  nameAddInput.value = "";
  saveUser(username);
};

const deleteUser = (e) => {
  const item = e.target.closest("li");
  const localItem = item.getItem;
  const deleteItem = userArr.filter((v) => v !== localItem);
  console.log(deleteItem);
  // if (deleteItem) {
  //   // localStorage.setItem(USERARR_KEY, JSON.stringify(deleteItem));
  // }
  item.remove();
};
//데이터 삭제시엔 removeItem 사용

const count = (e) => {
  let countNum = 5;
  const timerId = setInterval(() => {
    if (countNum === 0) {
      clearInterval(timerId);
      lottery();
      return;
    }
    result.textContent = countNum--;
  }, 1000);
};

const lottery = (e) => {
  if (nameUl.children.length < 2) {
    alert("1명 이상을 입력해주세요!");
    return;
  }

  const randomIndex = Math.floor(Math.random() * userArr.length);
  result.textContent = userArr[randomIndex];
};

const lotteryNum = (e) => {};

const reset = () => {
  localStorage.clear();
  nameUl.innerHTML = "";
  nameAddInput.value = "";
};

nameAddForm.addEventListener("submit", handleNameAddFormSubmit, false);
lotteryBtn.addEventListener("click", count, false);
lotteryBtn.addEventListener("click", lotteryNum, false);
resetBtn.addEventListener("click", reset, false);

const savedUsername = localStorage.getItem(USERARR_KEY); //스트링
if (savedUsername) {
  userArr = JSON.parse(savedUsername); //배열
  userArr.forEach(addName);
}
// //더블클릭해서 잡고 컨ddd, 컨+/ 주석처리
