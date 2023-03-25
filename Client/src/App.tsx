import React, { ReactElement, useMemo } from "react";
import "./App.scss";
import { Users } from "./components/Users";
import { Col, Nav, Row, Tab } from "react-bootstrap";

// [1] Update enum with your component name
enum AVAILABLE_TABS {
  USERS = "USERS",
  ANDYS_THING = "ANDYS_THING",
  JERRYS_THING = "JERRYS_THING",
}

function App() {
  // [2] Replace the <div /> with your actual component
  const tabsList = useMemo((): { [key in AVAILABLE_TABS]: ReactElement } => {
    return {
      USERS: <Users />,
      ANDYS_THING: <div>Andy's Thing</div>,
      JERRYS_THING: <div>Jerry's Thing</div>,
    };
  }, []);

  // Renders the tab selector menu (the yellow pills).
  const renderTabSelector = useMemo(() => {
    const tabs = Object.keys(tabsList).map((tabName) => {
      return (
        <Nav.Item className="nav-item" key={tabName}>
          <Nav.Link eventKey={tabName}>{tabName}</Nav.Link>
        </Nav.Item>
      );
    });
    return (
      <Nav variant="pills" className="flex-column pills">
        {tabs}
      </Nav>
    );
  }, [tabsList]);

  // Renders one tab in the menu (the light blue box). No need to change.
  const renderTabContent = useMemo(() => {
    const contents = Object.entries(tabsList).map(([tabName, tabContent]) => {
      return (
        <Tab.Pane key={`${tabName}-content`} eventKey={tabName}>
          {tabContent}
        </Tab.Pane>
      );
    });
    return <Tab.Content>{contents}</Tab.Content>;
  }, [tabsList]);

  // Top-level return. No need to change this.
  return (
    <div className="App">
      <h1>Gym Manager</h1>
      <Tab.Container defaultActiveKey={AVAILABLE_TABS.USERS}>
        <Row>
          <Col sm={3}>{renderTabSelector}</Col>
          <Col className="h-full" sm={9}>
            {renderTabContent}
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

export default App;
