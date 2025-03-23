import { changeColumnName } from "../eventHandler/createForm.js";
import { addHistoryRecord } from "../eventHandler/view.js";

export const store = {
  state: { columns: [], historyList: [] },

  fetchData() {
    return fetch("../data/data.json")
      .then((response) => response.json())
      .then((data) => {
        this.state.columns = data.columns;
        this.state.historyList = data.historyList;
      })
      .catch((error) => console.error("오류 발생:", error));
  },

  getColumn() {
    return this.state.columns;
  },

  getHistoryList() {
    return this.state.historyList;
  },

  addCard(columnId, title, content, author = "author by web") {
    const newCard = { title, content, author };
    this.state.columns.forEach((objCol) => {
      if (objCol.id !== columnId) return;
      objCol.cardList.unshift(newCard);
    });
    let ColumnNameInKorean = changeColumnName(columnId);
    this.addHistory("ADD_CARD", title, ColumnNameInKorean);
    addHistoryRecord(this.state.historyList[0]);
  },

  addHistory(action, title, fromColumn, toColumn = null) {
    const [year, month, day, time] = new Date()
      .toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
      .split(". "); // ["2025", "03", "21", "14:22:20"]형식

    const historyRecord = {
      photo: "./images/sam.png",
      userName: "@멋진삼",
      action: `${action}`,
      title: `${title}`,
      fromColumn: `${fromColumn}`,
      toColumn: `${toColumn}`,
      timeStamp: `${year}-${month}-${day} ${time}`,
    };
    this.state.historyList.unshift(historyRecord);
  },
};
