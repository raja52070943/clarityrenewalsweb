import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Table, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isMultiple, setIsMultiple] = useState(false);

  // Handle file input changes
  const handleFileChange = (event) => {
    const files = event.target.files;
    setIsMultiple(event.target.multiple); // Determine if the input allows multiple files
    setSelectedFiles(Array.from(files));
  };

  // Handle file upload
  const handleFileUpload = async () => {
    if (selectedFiles.length === 0) return;

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append('files', file);
    });

    try {
      // Replace with your API endpoint
      await axios.post('/api/upload-files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Files uploaded successfully');
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files');
    }
  };

  return (
    <Card>
      <Card.Body>
        <h5 className="card-title">Employee Census</h5>
        <div className="col-lg-12">
          <div className="table-responsive">
            <Table className="styled-table" striped bordered hover>
              <thead>
                <tr>
                  <th>File Category</th>
                  <th colSpan="2">File Uploads</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" style={{ width: '30%', textAlign: 'center' }}>
                    <span className="browse-text pt-1">Employee Census</span>
                  </th>
                  <td>
                    <div className="upload-section-funding">
                      <div className="d-flex justify-content-around mb-1">
                        <Form.Group controlId="fileUpload">
                          <Form.Control
                            type="file"
                            multiple
                            accept=".pdf, .xlsx, .xls, .csv"
                            onChange={handleFileChange}
                          />
                          <Form.Text className="text-muted mt-2">
                            <strong>Acceptable file formats:</strong> .pdf, .xlsx, .xls, and .csv
                          </Form.Text>
                        </Form.Group>
                        <Button
                          className="btn btn-success btn-sm mt-2"
                          onClick={handleFileUpload}
                        >
                          Upload
                        </Button>
                      </div>
                      {/* Display selected files information */}
                      <div>
                        {selectedFiles.length > 0 && (
                          <p>
                            {isMultiple
                              ? `${selectedFiles.length} file(s) selected`
                              : `Selected file: ${selectedFiles[0].name}`}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default FileUpload;
