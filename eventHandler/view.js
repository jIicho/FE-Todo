import { store } from "../store/store.js";
import {
  createRecordForm,
  createShowCardForm,
  updateTime,
} from "./createForm.js";

export function init() {
  store.fetchData().then(() => {
    const column = store.getColumn();
    const historyList = store.getHistoryList();
    cardView(column);
    historyView(historyList);
    startUpdateTime(historyList);
  });
}

function startUpdateTime(historyList) {
  setInterval(() => {
    updateTime(historyList), 1000;
  });
}

function cardView(dataColumns) {
  dataColumns.forEach((column) => {
    generateCardsFromList(column);
  });
}

function generateCardsFromList(column) {
  const id = document.querySelector(`.${column.id}-cardList`);
  const columnHeader = id.previousElementSibling;
  let countCard = columnHeader.querySelector(".count_card");
  const fragment = document.createDocumentFragment();
  column.cardList.forEach((cardData) => {
    const cardElement = createShowCardForm(cardData.title, cardData.content);
    fragment.appendChild(cardElement);
  });
  id.appendChild(fragment);
  countCard.textContent = column.cardList.length;
  column.count = column.cardList.length;
}

export function historyView(dataHistoryList) {
  const recordHistory = document.getElementById("recordHistory");
  const fragment = document.createDocumentFragment();
  dataHistoryList.forEach((record) => {
    const recordElement = createRecordForm(record);
    fragment.appendChild(recordElement);
  });
  recordHistory.appendChild(fragment);
}

export function addHistoryRecord(record) {
  const recordHistory = document.getElementById("recordHistory");
  const recordElement = createRecordForm(record);
  recordHistory.prepend(recordElement);
}
