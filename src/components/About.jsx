import React, { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";

function About() {
  const text =
    "This algo of shortening Urls just make unique id in server for long Url and after that when you click on new shorten Url it redirects you to original Url :)";
  const [description, setDescription] = useState(text);
  const [editable, setEditable] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const handleSubmit = (event) => {
    event.preventDefault();
    setEditable(false);
  };

  return (
    <Container className="mt-5">
      <h1>About</h1>
      {editable ? (
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="description">
            <Form.Control
              as="textarea"
              rows={5}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setDescription("");
              setEditable(false);
            }}
          >
            Cancel
          </Button>
        </Form>
      ) : (
        <>
          <p>{description}</p>
          {user?.role == "Administrator" && (
            <Button
              variant="primary"
              onClick={() => setEditable(true)}
              className="mt-5"
            >
              Edit
            </Button>
          )}
        </>
      )}
    </Container>
  );
}

export default About;
