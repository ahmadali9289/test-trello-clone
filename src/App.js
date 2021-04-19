import React, { Component, PureComponent } from "react";
import TrelloList from "./components/TrelloList";
import { connect } from "react-redux";
import TrelloCreate from "./components/TrelloCreate";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { sort } from "./store/actions";

const ListsContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1em;
`;

const Title = styled.div`
  margin: 0.5em 0 0.5em 0.2em;
  font-size: 2em;
`;

class App extends Component {
  onDragEnd = result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    this.props.dispatch(
      sort(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index,
        draggableId,
        type
      )
    );
  };

  render() {
    const { lists } = this.props;
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Title>Test - Trello Clone </Title>
        <Droppable droppableId="all-lists" direction="horizontal" type="list">
          {provided => (
            <ListsContainer
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {lists.map((list, index) => (
                <TrelloList
                  listID={list.id}
                  key={list.id}
                  title={list.title}
                  cards={list.cards}
                  index={index}
                />
              ))}
              {provided.placeholder}
              <TrelloCreate list />
            </ListsContainer>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}


const mapStateToProps = state => ({
  lists: state.lists
});

export default connect(mapStateToProps)(App);
