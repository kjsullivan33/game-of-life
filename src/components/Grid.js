import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { setup, generate, checkEmptyGrid } from "../services/createGrid";

const initialGrid = setup();

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  color: white;
`;
const GameContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  padding: 2rem;
`;
const GridContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30rem;
  height: 30rem;
`;
const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: ${props => (props.rows ? `${100 / props.rows}%` : "0%")};
`;

const Col = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  background-color: ${props => (props.number === 1 ? "white" : "black")};
  width: ${props => (props.cols ? `${100 / props.cols}%` : "0%")};
  height: 100%;
`;

const Button = styled.button`
  cursor: pointer;
  padding: 1rem 2rem;
  width: fit-content;
  height: fit-content;
`;

const Grid = () => {
  const [grid, updateGrid] = useState(initialGrid);
  const [generations, setGenerations] = useState(1);
  const [isActive, setIsActive] = useState(false);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    toggle();
    updateGrid(setup());
  };

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        console.log(`grid empty? ${checkEmptyGrid(grid)}`);
        if (!checkEmptyGrid(grid)) {
          const newGrid = generate(grid);
          if (newGrid !== grid) {
            updateGrid(generate(grid));
          } else {
            console.log("no change");
            clearInterval(interval);
            setIsActive(false);
            console.log(isActive);
          }
        } else {
          clearInterval(interval);
          setIsActive(false);
          console.log(isActive);
        }
      }, 1);
    } else if (!isActive) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, grid]);

  return (
    <Container>
      <header>
        <h1>The Game of Life</h1>
      </header>
      <GameContainer>
        <Button onClick={toggle}>{isActive ? "Pause" : "Play"}</Button>
        <Button onClick={reset}>Reset Board</Button>
        <GridContainer>
          {grid.map((row, index) => (
            <Row key={index} rows={grid.length}>
              {row.map((col, index) => (
                <Col key={index} cols={row.length} number={col}></Col>
              ))}
            </Row>
          ))}
        </GridContainer>
      </GameContainer>
    </Container>
  );
};

export default Grid;
