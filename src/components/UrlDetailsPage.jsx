import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Button, Form, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function UrlDetailsPage() {
  const { id } = useParams();
  const [url, setUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const response = await axios.get(
          `https://localhost:44356/api/Url/GetById/${id}`
        );
        setUrl(response.data);
        setErrorMessage("");
      } catch (error) {
        console.error(error);
        setErrorMessage(error);
      }
    };

    fetchUrl();
  }, [id]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://localhost:44356/api/Url/Delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );
      console.log(response);
      navigate("/shortUrlsTable");
      setErrorMessage("");
    } catch (error) {
      console.error(error);
      setErrorMessage(error);
    }
  };

  if (!url) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-5">
      <h1 className="text-uppercase mb-5">Short URL Info</h1>
      <Form>
        <Form.Group controlId="formBasicUrl" className="mt-2">
          <Form.Label>Original URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="URL"
            value={url?.originalUrl}
            disabled
          />
        </Form.Group>
        <Form.Group controlId="formBasicShortenedUrl" className="mt-2">
          <Form.Label>Shortened URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Shortened URL"
            value={url?.shortenedUrl}
            disabled
          />
        </Form.Group>
        <Form.Group controlId="formBasicNewUrl" className="mt-2">
          <Form.Label>Created By</Form.Label>
          <Form.Control
            type="url"
            placeholder="Created By"
            value={url?.user?.username}
            disabled
          />
        </Form.Group>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Button variant="danger" onClick={handleDelete} className="ml-3 mt-4">
          Delete URL
        </Button>
      </Form>
    </Container>
  );
}

export default UrlDetailsPage;
