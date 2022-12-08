import styled from "styled-components";
import { ICardItem } from "../../types";

export const CardsContainer = styled.div`
  display: flex;
  gap: 0px 15px;
`;

export const Card = styled.div`
  div > h1 {
    font-size: 20px;
    text-align: center;
  }

  div {
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

export const CardItem = styled.li<ICardItem>`
  list-style: none;
  width: 100%;
  min-height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: move;
  background-color: #a5c9ca;
  margin: 3px 0px;
  outline: ${({ isDragging }) => (isDragging ? "1px solid #2c3333" : "none")};
  box-shadow: ${({ isDragging }) =>
    isDragging && "rgba(0, 0, 0, 0.35) 0px 5px 15px"};
  border-radius: 4px;
`;
