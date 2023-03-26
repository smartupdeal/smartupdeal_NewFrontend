import React, { useState, useRef } from "react";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { Typeahead } from "react-bootstrap-typeahead";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Badge,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import { ImCross } from "react-icons/im";
export default function UpdateInterests({
  skills,
  currentSkills,
  updateUserSkills,
  industries,
  currentIndustries,
  technologies,
  currentTechnologies,
  updateUserIndustries,
  updateUserTechnologies,
  active,
  close,
}) {
  const skillsRef = useRef();
  const industriesRef = useRef();
  const technologiesRef = useRef();

  const [activeTab, setActiveTab] = useState("skills");
  const [newSkills, setNewSkills] = useState(currentSkills);
  const [newIndustries, setNewIndustries] = useState(currentIndustries);
  const [newTechnologies, setNewTechnologies] = useState(currentTechnologies);

  const getOptions = (allOptions, selectedOptions) => {
    return allOptions?.filter(
      (b) => !selectedOptions?.some((a) => a?.name === b?.name)
    );
  };
  const addSkills = (skill) => {
    setNewSkills((skills) => [...skills, ...skill]);
    skillsRef.current.clear();
  };

  const addIndustries = (industry) => {
    setNewIndustries((industries) => [...industries, ...industry]);
    industriesRef.current.clear();
  };

  const addTechnologies = (technology) => {
    setNewTechnologies((technologies) => [...technologies, ...technology]);
    technologiesRef.current.clear();
  };

  const submitHandler = () => {
    updateUserSkills(newSkills?.map((skill) => skill?._id));
    updateUserIndustries(newIndustries?.map((industry) => industry?._id));
    updateUserTechnologies(
      newTechnologies?.map((technology) => technology?._id)
    );
    close();
  };
  const removeItem = (index) => {
    switch (activeTab) {
      case "skills":
        setNewSkills((skills) => {
          return [
            ...skills.slice(0, index),
            ...skills.slice(index + 1, skills.length),
          ];
        });
        break;
      case "industries":
        setNewIndustries((industries) => {
          return [
            ...industries.slice(0, index),
            ...industries.slice(index + 1, industries.length),
          ];
        });
        break;
      case "technologies":
        setNewTechnologies((technologies) => {
          return [
            ...technologies.slice(0, index),
            ...technologies.slice(index + 1, technologies.length),
          ];
        });
        break;
      default:
        break;
    }
  };
  return (
    <Modal isOpen={active} size="lg">
      <ModalHeader>Update</ModalHeader>
      <ModalBody style={{ height: "300px" }}>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={activeTab === "skills" ? "active" : ""}
              onClick={() => {
                setActiveTab("skills");
              }}
            >
              Skills
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === "industries" ? "active" : ""}
              onClick={() => {
                setActiveTab("industries");
              }}
            >
              Industries
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={activeTab === "technologies" ? "active" : ""}
              onClick={() => {
                setActiveTab("technologies");
              }}
            >
              Technologies
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab} style={{ padding: "10px" }}>
          <TabPane tabId="skills">
            <div className="row mb-2">
              {newSkills?.map((skill, index) => (
                <div className="mb-1 mr-1" key={index}>
                  <Badge
                    color="primary"
                    style={{ fontSize: "1rem", textAlign: "center" }}
                  >
                    {skill?.name}
                    <span
                      className="badge-remove-icon"
                      onClick={() => removeItem(index)}
                    >
                      <ImCross />
                    </span>
                  </Badge>
                </div>
              ))}
            </div>
            <Typeahead
              id="public-methods-example"
              labelKey={(option) => `${option.name}`}
              options={getOptions(skills, newSkills)}
              maxResults={5}
              placeholder="Type to search"
              onChange={addSkills}
              ref={skillsRef}
            />
          </TabPane>
          <TabPane tabId="industries">
            <div className="row mb-2">
              {newIndustries?.map((industry, index) => (
                <div className=" mb-1 mr-1" key={index}>
                  <Badge color="primary" pill style={{ fontSize: "1rem" }}>
                    {industry?.name}
                    <span
                      className="badge-remove-icon"
                      onClick={() => removeItem(index)}
                    >
                      <ImCross />
                    </span>
                  </Badge>
                </div>
              ))}
            </div>
            <Typeahead
              id="public-methods-example"
              labelKey={(option) => `${option.name}`}
              options={getOptions(industries, newIndustries)}
              maxResults={5}
              placeholder="Type to search"
              onChange={addIndustries}
              ref={industriesRef}
            />
          </TabPane>
          <TabPane tabId="technologies">
            <div className="row mb-2">
              {newTechnologies?.map((technology, index) => (
                <div className=" mb-1 mr-1" key={index}>
                  <Badge color="primary" pill style={{ fontSize: "1rem" }}>
                    {technology?.name}
                    <span
                      className="badge-remove-icon"
                      onClick={() => removeItem(index)}
                    >
                      <ImCross />
                    </span>
                  </Badge>
                </div>
              ))}
            </div>
            <Typeahead
              id="public-methods-example"
              labelKey={(option) => `${option.name}`}
              options={getOptions(technologies, newTechnologies)}
              maxResults={5}
              placeholder="Type to search"
              onChange={addTechnologies}
              ref={technologiesRef}
            />
          </TabPane>
        </TabContent>
      </ModalBody>
      <ModalFooter>
        <Button form="UpdateExperience" onClick={submitHandler}>
          Save
        </Button>
        <Button onClick={close}>Close</Button>
      </ModalFooter>
    </Modal>
  );
}
