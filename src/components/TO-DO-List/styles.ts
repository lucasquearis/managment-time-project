import styled from "styled-components";
import { ICardItem, ITaskName } from "../../types";

export const CardsContainer = styled.div`
  display: flex;
  gap: 0px 15px;
`;

export const Card = styled.div`
  > div > h1 {
    font-size: 20px;
    text-align: center;
  }

  > div {
    width: 100%;
    border-bottom: 1px solid #a5c9ca;
    padding: 10px 0px;
  }

  margin-top: 30px;
  display: flex;
  width: 16%;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  min-height: 500px;
  flex-direction: column;
  gap: 5px;
`;

export const CardList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const CardContainer = styled.li<ICardItem>`
  list-style: none;
  min-height: 40px;
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
  cursor: move;
  background-color: #a5c9ca;
  margin: 3px 0px;
  outline: ${({ isDragging }) => (isDragging ? "1px solid #2c3333" : "none")};
  box-shadow: ${({ isDragging }) =>
    isDragging && "rgba(0, 0, 0, 0.35) 0px 5px 15px"};
  border-radius: 4px;
  position: relative;
  padding: 5px 10px;
  padding-right: 40px;
  > p {
    display: inline-block;
    word-break: break-word;
  }
  > span {
    position: absolute;
    right: 5px;
    cursor: pointer;
    color: red;
  }
`;

export const TaskName = styled.div<ITaskName>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  text-decoration: ${({ isChecked }) => (isChecked ? "line-through" : "none")};
`;
