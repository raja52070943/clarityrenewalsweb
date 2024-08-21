import React from 'react'

function CobraEmployeeCensus() {
  return (
    <div className="col-lg-12 mb-3">
                                <div className="card">
                                    <div className="card-body">

                                        <h5 className="card-title">
                                            Employee Census
                                        </h5>
                                        
                                        
                                        <div className="col-lg-12">




                                            <div className="table-responsive">
                                                
                                                <table className="styled-table" cellspacing="0" width="100%">
                                                    <thead>
                                                        <tr>
                                                            
                                                            <th className="fileUploads-table-row">
                                                                File Category
                                                            </th>
                                                            <th colspan="2" className="fileUploads-table-row">
                                                                File Uploads
                                                            </th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <th className="vertical-th fileUploadsCobrabenefits" scope="row" >
                                                                <span className=" browse-text pt-1">Employee Census</span>
                                                            </th>



                                                            <td className="fileuploads-table-row">
                                                                <div className="upload-section-funding">
                                                                    <div className="d-flex justify-content-around mb-1">
                                                                        <input type="file" accept=".pdf, .xlsx, .xls, .csv" id="cobraBenefitsFile_1" name="myfile" />
                                                                        <label for="cobraBenefitsFile_1" className="file-input-label pt-2" id="selectedFileNameCobra_(1)_(1)">Browse
                                                                            files
                                                                            here.<br/>Acceptable
                                                                            file
                                                                            formats
                                                                            include
                                                                            .pdf,
                                                                            .xlsx,
                                                                            .xls,
                                                                            and
                                                                            .csv</label>


                                                                        <button className="btn btn-success emp-upload-button btn-sm mt-2" >Upload</button>
                                                                    </div>
                                                                </div>



                                                            </td>



                                                        </tr>





                                                    </tbody>
                                                </table>

                                            </div>

                                        </div>






                                    </div>
                                </div>
                            </div>
  )
}

export default CobraEmployeeCensus
