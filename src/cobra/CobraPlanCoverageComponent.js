import React from 'react';
import axios from 'axios';
import debounce from 'lodash/debounce';
import config from '../config';

function CobraPlanCoverageComponent({ planId, planName, selectOptions, initialFormValues = {}, onError = () => { } }) {
  const fetchUrl = `${config.API_URL}/${planName}CoverageRates/ByCOBRA${planName}PlanId/${planId}`;
  const updateUrl = `${config.API_URL}/${planName}CoverageRates`;
  const deleteUrl = `${config.API_URL}/${planName}CoverageRates`;
  const addUrl = `${config.API_URL}/${planName}CoverageRates`;

  const [coverageRates, setCoverageRates] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetchCoverageRates();
  }, []);

  const fetchCoverageRates = async () => {
    try {
      const response = await axios.get(fetchUrl);
      setCoverageRates(response.data || []);
    } catch (error) {
      setError('Error fetching plans.');
      onError(error);
    } finally {
      setLoading(false);
    }
  };

  const debouncedUpdate = React.useCallback(
    debounce(async (updatedcoverageRate) => {
      try {

        const url = `${updateUrl}/${updatedcoverageRate.id}`;
        await axios.put(url, updatedcoverageRate);
      } catch (error) {
        console.error('Error updating plan:', error);
        onError(error);
      }
    }, 500),
    [updateUrl, onError]
  );

  const handleAddPlan = async () => {
    try {


      const newCoverageRate = { ...initialFormValues, cobraPlanId: planId };

      console.log('Add URL:', addUrl); // Debugging URL
      console.log('New Plan Data:', newCoverageRate); // Debugging data

      const response = await axios.post(addUrl, newCoverageRate);
      setCoverageRates([...coverageRates, response.data]);
    } catch (error) {
      console.error('Error adding new plan:', error);
      onError(error);
    }
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedcoverageRates = [...coverageRates];
    updatedcoverageRates[index] = { ...updatedcoverageRates[index], [name]: value };
    setCoverageRates(updatedcoverageRates);
    debouncedUpdate(updatedcoverageRates[index]);
  };



  return (
    <div id={`CoverageRates_${planId}`}>
      
      {coverageRates.map((rate, index) => (

        <div key={index} className="row ">
          <div className="col-lg-3">
            <div className="input-group mb-2">
              <select
                className=" form-control selectpickers"
                value={rate.coverageLevelName || ''}
                onChange={(e) => handleInputChange(index, e)}
              >
                <option value="" disabled>Coverage Level</option>
                {selectOptions.coverageLevelName?.map((option, optionIndex) => (
                  <option key={optionIndex} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="input-group mb-2">
              <input
                type="text"
                className="dollar form-control"
                placeholder="$0.00"
                value={rate.currentRate}
                onChange={(e) => handleInputChange(index, 'currentRate', e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="input-group mb-2">
              <input
                type="text"
                className="dollar form-control"
                placeholder="$0.00"
                value={rate.priorRate}
                onChange={(e) => handleInputChange(index, 'priorRate', e.target.value)}
              />
            </div>
          </div>
          <div className="col-lg-3">
            <div className="input-group mb-2">
              <input
                type="text"
                className="dollar form-control"
                placeholder="$0.00"
                value={rate.futureRate}
                onChange={(e) => handleInputChange(index, 'futureRate', e.target.value)}
              />
            </div>
          </div>
        </div>

      ))}
      <div class="col-lg-11">
        <button type="button" className="add-coverage" onClick={handleAddPlan}>
          <i class="fa fa-plus" ></i>
        </button>

      </div>

    </div>
  )
}

export default CobraPlanCoverageComponent
