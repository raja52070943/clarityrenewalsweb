import { Button, Form, Table } from 'react-bootstrap';

const FileUploadComponent = () => {
    return (
        <Table striped bordered >
            <thead>
                <tr>
                    <th>File Category</th>
                    <th colSpan="2">File Uploads</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th className="vertical-th fileUploadsCobrabenefits" scope="row" >
                        <span className=" browse-text pt-1">Age/Gender Banded Rates</span>
                    </th>
                    <td className="fileuploads-table-row">
                        <div className="upload-section-funding">
                            <Form.Group className="d-flex justify-content-around mb-1">
                                <Form.Control
                                    type="file"
                                    accept=".pdf, .xlsx, .xls, .csv"
                                    id={`cobraBenefitsFile_1`}
                                    name="myfile"
                                    className="border-0"
                                />
                                <Form.Label
                                    htmlFor={`cobraBenefitsFile_1`}
                                    className="file-input-label pt-2 ms-2"
                                >
                                    Browse files here.<br />Acceptable file formats include .pdf, .xlsx, .xls, and .csv
                                </Form.Label>
                                <Button
                                    variant="success"
                                    className="btn btn-success emp-upload-button btn-sm mt-2"
                                // onClick={() => uploadCobraBenefitsFile(index, 1)} // Update with your actual function
                                >
                                    Upload
                                </Button>
                            </Form.Group>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th className="vertical-th fileUploadsCobrabenefits" scope="row" >
                        <span className=" browse-text pt-1">Summary of Benefits and Coverage (SBC) Documents</span>
                    </th>
                    <td className="fileuploads-table-row">
                        <div className="upload-section-funding">
                            <Form.Group className="d-flex justify-content-around mb-1">
                                <Form.Control
                                    type="file"
                                    accept=".pdf, .xlsx, .xls, .csv"
                                    id={`cobraBenefitsFile_1`}
                                    name="myfile"
                                    className="border-0 "
                                />
                                <Form.Label
                                    htmlFor={`cobraBenefitsFile_1`}
                                    className="file-input-label pt-2 ms-2"
                                >
                                    Browse files here.<br />Acceptable file formats include .pdf, .xlsx, .xls, and .csv
                                </Form.Label>
                                <Button
                                    variant="success"
                                    className="btn btn-success emp-upload-button btn-sm mt-2"
                                // onClick={() => uploadCobraBenefitsFile(index, 1)} // Update with your actual function
                                >
                                    Upload
                                </Button>
                            </Form.Group>
                        </div>
                    </td>
                </tr>
            </tbody>
        </Table>
    )
}

export default FileUploadComponent;