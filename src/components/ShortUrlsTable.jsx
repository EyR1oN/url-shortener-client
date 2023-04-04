import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Button, Form, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function ShortUrlsTable(props) {
  const [shortUrls, setShortUrls] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const fetchShortUrls = async () => {
    try {
      const response = await axios.get(
        "https://localhost:44356/api/Url/Getall"
      );
      setShortUrls(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchShortUrls();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://localhost:44356/api/Url/Delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setShortUrls(shortUrls.filter((shortUrl) => shortUrl.id !== id));
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  const handleInfo = (id) => {
    navigate(`/shortUrlsTable/${id}`);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        "https://localhost:44356/api/Url/ShortenUrl",
        {
          Url: newUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      fetchShortUrls();
      setErrorMessage("");
      setNewUrl("");
    } catch (error) {
      console.error(error);
      setErrorMessage(error);
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-uppercase mb-5">Short URLs Table</h1>
      {user ? (
        <div className="mb-4">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUrl">
              <h3>Enter URL</h3>
              <Form.Control
                type="url"
                placeholder="Enter URL"
                value={newUrl}
                onChange={(event) => setNewUrl(event.target.value)}
              />
            </Form.Group>
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            <Button variant="primary" type="submit" className="mt-3">
              Shorten URL
            </Button>
          </Form>
        </div>
      ) : null}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Original URL</th>
            <th>Shortened URL</th>
            {user ? <th>Action</th> : null}
          </tr>
        </thead>
        <tbody>
          {shortUrls.map((shortUrl, index) => (
            <tr key={shortUrl.id}>
              <td>{index + 1}</td>
              <td>
                <Link to={shortUrl?.originalUrl}>{shortUrl?.originalUrl}</Link>
              </td>
              <td>
                <Link
                  to={`https://localhost:44356/api/Url/RedirectToOriginalUrl/${shortUrl?.shortenedUrl}`}
                >
                  {`https://localhost:44356/api/Url/RedirectToOriginalUrl/${shortUrl?.shortenedUrl}`}
                </Link>
              </td>
              {(user?.role == "Administrator" ||
                (user?.role == "User" && shortUrl.userId == user?.id)) && (
                <td className="d-flex justify-content-around align-items-center">
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(shortUrl.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => handleInfo(shortUrl.id)}
                  >
                    Info
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ShortUrlsTable;
