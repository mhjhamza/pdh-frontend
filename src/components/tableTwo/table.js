import React, { useCallback } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { TabPanel, TabContext } from "@mui/lab";
import "./table.css";
import { useEffect, useState } from "react";
import { SiZeromq } from "react-icons/si";
import RefreshIcon from "@mui/icons-material/Refresh";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import EditModal from "./EditModal";

const NextTable = (props) => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    // let index = Number(newValue) !== "" ? newValue : 1;
    setValue(newValue);
  };
  var a = 1;
  var b = 1;
  var c = 1;
  var d = 1;
  var e = 1;
  var f = 1;
  var g = 1;
  var h = 1;
  var i = 1;
  var j = 1;
  const [dataAller, setDataAller] = useState([]);
  const [dataTestRes, setDataTestRes] = useState([]);
  const [dataAssessments, setDataAssessments] = useState([]);
  const [dataLabRes, setDataLabRes] = useState([]);
  const [dataMedicHist, setDataMedicHist] = useState([]);
  const [dataPatCondi, setDataPatCondi] = useState([]);
  const [dataProbHist, setDataProbHist] = useState([]);
  const [dataProcedures, setDataProcedures] = useState([]);
  const [dataSmoker, setDataSmoker] = useState([]);
  const [dataVitalSigns, setDataVitalSigns] = useState([]);
  const [patient_problem_history_id, setPatient_problem_history_id] =
    useState(null);

  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenEditModal = (id) => {
    setPatient_problem_history_id(id);
    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => setOpenEditModal(false);
  const baseUrl = "https://n4dmctglka.execute-api.us-east-2.amazonaws.com/api";

  const handleAllergies = useCallback(async () => {
    fetch(`${baseUrl}/allergies/${props.idPat}`)
      .then((resp) => resp.json())
      .then((resp) => {
        setDataAller(resp);
      });
  }, []);
  const handleTestResult = useCallback(async () => {
    fetch(`${baseUrl}/test_results/${props.idPat}`)
      .then((resp) => resp.json())
      .then((resp) => {
        setDataTestRes(resp);
      });
  }, []);
  const handleDataAssessments = useCallback(async () => {
    fetch(`${baseUrl}/assessments/${props.idPat}`)
      .then((resp) => resp.json())
      .then((resp) => {
        setDataAssessments(resp);
      });
  }, []);
  const handleLabResult = useCallback(async () => {
    fetch(`${baseUrl}/lab_result/${props.idPat}`)
      .then((resp) => resp.json())
      .then((resp) => {
        setDataLabRes(resp);
      });
  }, []);
  const handleMedicationHistory = useCallback(async () => {
    fetch(`${baseUrl}/medication_history/${props.idPat}`)
      .then((resp) => resp.json())
      .then((resp) => {
        setDataMedicHist(resp);
      });
  }, []);
  const handlePatientCondition = useCallback(async () => {
    fetch(`${baseUrl}/patient_condition/${props.idPat}`)
      .then((resp) => resp.json())
      .then((resp) => {
        setDataPatCondi(resp);
      });
  }, []);
  const handleProbelmHIstory = useCallback(async () => {
    fetch(`${baseUrl}/problem_history/${props.idPat}`)
      .then((resp) => resp.json())
      .then((resp) => {
        setDataProbHist(resp);
      });
  }, []);
  const handleDataProcedures = useCallback(async () => {
    fetch(`${baseUrl}/procedures/${props.idPat}`)
      .then((resp) => resp.json())
      .then((resp) => {
        setDataProcedures(resp);
      });
  }, []);
  const handleDataSmoker = useCallback(async () => {
    fetch(`${baseUrl}/smoker_info/${props.idPat}`)
      .then((resp) => resp.json())
      .then((resp) => {
        setDataSmoker(resp);
      });
  }, []);
  const handleDataVitalSigns = useCallback(async () => {
    fetch(`${baseUrl}/vital_signs/${props.idPat}`)
      .then((resp) => resp.json())
      .then((resp) => {
        setDataVitalSigns(resp);
      });
  }, []);

  useEffect(() => {
    return () => {
      handleAllergies();
    };
  }, []);

  const handleReload = () => {
    handleProbelmHIstory();
  };

  return (
    <Box sx={{ postion: "relative" }}>
      <RefreshIcon
        sx={{
          cursor: "pointer",
          position: "absolute",
          top: "1rem",
          right: "2rem",
          fontSize: "2.5rem",
          color: "#3C76D2 ",
        }}
        onClick={handleReload}
      />
      <TabContext value={value}>
        <Box
          sx={{ maxWidth: { xs: 320, sm: 1580 }, bgcolor: "background.paper" }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="scrollable force tabs example"
          >
            <Tab label="Allergies" value="1" onClick={handleAllergies} />
            <Tab
              label="Medication history"
              value="2"
              onClick={handleMedicationHistory}
            />
            <Tab label="Assesments" value="3" onClick={handleDataAssessments} />
            <Tab
              label="Problem history"
              value="9"
              onClick={handleProbelmHIstory}
            />
            <Tab label="Procedures" value="4" onClick={handleDataProcedures} />
            <Tab label="Lab results" value="5" onClick={handleLabResult} />
            <Tab label="Smoker" value="6" onClick={handleDataSmoker} />
            <Tab
              label="Patient condition"
              value="10"
              onClick={handlePatientCondition}
            />
            <Tab label="Test results" value="7" onClick={handleTestResult} />
            <Tab label="Vital signs" value="8" onClick={handleDataVitalSigns} />
          </Tabs>
        </Box>
        <TabPanel value="1" sx={{ height: "70vh" }}>
          {dataAller.length > 0 ? (
            <div class="table-responsive">
              <table class="table">
                <thead id="theads">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Allergies</th>
                    <th scope="col">Date</th>
                    <th scope="col">type</th>
                    <th scope="col">Cause</th>
                    <th scope="col">Severity</th>
                    <th scope="col">Reaction</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {" "}
                  {dataAller.map((aller) => (
                    <tr>
                      <th scope="row">{a++}</th>
                      <td>{aller.allergies}</td>
                      <td>{aller.date_id}</td>
                      <td>{aller.type}</td>
                      <td>{aller.cause}</td>
                      <td>{aller.severity}</td>
                      <td>{aller.reaction}</td>
                      <td>{aller.status}</td>
                    </tr>
                  ))}{" "}
                </tbody>
              </table>
            </div>
          ) : (
            <div id="message">
              <p class="h4 mt-4">
                <SiZeromq style={{ marginTop: "-5px" }} />
                &nbsp;You have 0 allergies !
              </p>
            </div>
          )}
        </TabPanel>
        <TabPanel sx={{ height: "70vh" }} value="2">
          {dataMedicHist.length > 0 ? (
            <div class="table-responsive">
              <table class="table">
                <thead id="theads">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Medication</th>
                    <th scope="col">Strength</th>
                    <th scope="col">Dose route frequency</th>
                    <th scope="col">RXnorm code</th>
                    <th scope="col">Date started</th>
                    <th scope="col">Date discontinued</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {" "}
                  {dataMedicHist.map((medicHist) => (
                    <tr>
                      <th scope="row">{b++}</th>
                      <td>{medicHist.medication}</td>
                      <td>{medicHist.strength}</td>
                      <td>{medicHist.dose_route_frequency}</td>
                      <td>{medicHist.rxnorm_code}</td>
                      <td>{medicHist.date_started}</td>
                      <td>{medicHist.date_discontinued}</td>
                      <td>{medicHist.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div id="message">
              <p class="h4 mt-4">
                <SiZeromq style={{ marginTop: "-5px" }} />
                &nbsp;Medication history is empty.
              </p>
            </div>
          )}
        </TabPanel>
        <TabPanel sx={{ height: "70vh" }} value="3">
          {dataAssessments.length > 0 ? (
            <div class="table-responsive">
              <table class="table">
                <thead id="theads">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Assessment description</th>
                    <th scope="col">Plan of treatment</th>
                    <th scope="col">Orders</th>
                  </tr>
                </thead>
                <tbody>
                  {" "}
                  {dataAssessments.map((assess) => (
                    <tr>
                      <th scope="row">{c++}</th>
                      <td>{assess.assessment_description}</td>
                      <td> {assess.plan_of_treatment}</td>
                      <td>{assess.orders}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div id="message">
              <p class="h4 mt-4">
                <SiZeromq style={{ marginTop: "-5px" }} />
                &nbsp;Assessments are empty.
              </p>
            </div>
          )}
        </TabPanel>
        <EditModal
          handleClickOpen={handleOpenEditModal}
          handleClose={handleCloseEditModal}
          open={openEditModal}
          phid={patient_problem_history_id}
        />
        <TabPanel sx={{ height: "70vh" }} value="9">
          {dataProbHist.length > 0 ? (
            <div class="table-responsive">
              <table class="table">
                <thead id="theads">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">snomed</th>
                    <th scope="col">Problem</th>
                    <th scope="col">Status</th>
                    <th scope="col">Date discovered</th>
                    <th scope="col">Last modified</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {" "}
                  {dataProbHist.map((probHist) => (
                    <tr>
                      <th scope="row">{d++}</th>
                      <td>{probHist.snomed}</td>
                      <td>{probHist.problem}</td>
                      <td>{probHist.status}</td>
                      <td>{probHist.date_discovered}</td>
                      <td>{probHist.last_modified}</td>
                      <td>
                        <BorderColorIcon
                          sx={{ color: "#3366C0", cursor: "pointer" }}
                          onClick={() =>
                            handleOpenEditModal(
                              probHist.patient_problem_history_id
                            )
                          }
                        />
                      </td>
                    </tr>
                  ))}{" "}
                </tbody>
              </table>
            </div>
          ) : (
            <div id="message">
              <p class="h4 mt-4">
                <SiZeromq style={{ marginTop: "-5px" }} />
                &nbsp;Medication history is empty.
              </p>
            </div>
          )}
        </TabPanel>
        <TabPanel sx={{ height: "70vh" }} value="4">
          {dataProcedures.length > 0 ? (
            <div class="table-responsive">
              <table class="table">
                <thead id="theads">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Procedures</th>
                    <th scope="col">Code system</th>
                    <th scope="col">Code</th>
                    <th scope="col">Description</th>
                    <th scope="col">Date ordered</th>
                    <th scope="col">Status</th>
                    <th scope="col">immunization</th>
                    <th scope="col">Date</th>
                    <th scope="col">Vaccine</th>
                    <th scope="col">CVX</th>
                  </tr>
                </thead>
                <tbody>
                  {" "}
                  {dataProcedures.map((proced) => (
                    <tr>
                      <th scope="row">{e++}</th>
                      <td>{proced.procedures}</td>
                      <td>{proced.code_system}</td>
                      <td>{proced.code}</td>
                      <td>{proced.description}</td>
                      <td>{proced.date_ordered}</td>
                      <td>{proced.status}</td>
                      <td>{proced.immunization}</td>
                      <td>{proced.date}</td>
                      <td>{proced.vaccine}</td>
                      <td>{proced.cvx}</td>
                    </tr>
                  ))}{" "}
                </tbody>
              </table>
            </div>
          ) : (
            <div id="message">
              <p class="h4 mt-4">
                <SiZeromq style={{ marginTop: "-5px" }} />
                &nbsp;Medication history is empty.
              </p>
            </div>
          )}
        </TabPanel>
        <TabPanel sx={{ height: "70vh" }} value="5">
          {dataLabRes.length > 0 ? (
            <div class="table-responsive">
              <table class="table">
                <thead id="theads">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date performed</th>
                    <th scope="col">Test</th>
                    <th scope="col">Result</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {" "}
                  {dataLabRes.map((labRes) => (
                    <tr>
                      <th scope="row">{f++}</th>
                      <td>{labRes.date_performed}</td>
                      <td>{labRes.test}</td>
                      <td>{labRes.result}</td>
                      <td>{labRes.status}</td>
                    </tr>
                  ))}{" "}
                </tbody>
              </table>
            </div>
          ) : (
            <div id="message">
              <p class="h4 mt-4">
                <SiZeromq style={{ marginTop: "-5px" }} />
                &nbsp;No lab results found.
              </p>
            </div>
          )}
        </TabPanel>
        <TabPanel sx={{ height: "70vh" }} value="6">
          {dataSmoker.length > 0 ? (
            <div class="table-responsive">
              <table class="table">
                <thead id="theads">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Smoker</th>
                    <th scope="col">Starting date</th>
                    <th scope="col">Stoping date</th>
                  </tr>
                </thead>
                <tbody>
                  {" "}
                  {dataSmoker.map((smoker) => (
                    <tr>
                      <th scope="row">{g++}</th>
                      <td>{smoker.smoker}</td>
                      <td>{smoker.smoker_start_date}</td>
                      <td>{smoker.smoker_stop_date}</td>
                    </tr>
                  ))}{" "}
                </tbody>
              </table>
            </div>
          ) : (
            <div id="message">
              <p class="h4 mt-4">
                <SiZeromq style={{ marginTop: "-5px" }} />
                &nbsp;Medication history is empty.
              </p>
            </div>
          )}
        </TabPanel>
        <TabPanel sx={{ height: "70vh" }} value="7">
          {dataTestRes.length > 0 ? (
            <div class="table-responsive">
              <table class="table">
                <thead id="theads">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Test code</th>
                    <th scope="col">Code system</th>
                    <th scope="col">Panel description</th>
                    <th scope="col">date ordered</th>
                    <th scope="col">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {" "}
                  {dataTestRes.map((testRes) => (
                    <tr>
                      <th scope="row">{h++}</th>
                      <td>{testRes.test_code}</td>
                      <td>{testRes.code_system}</td>
                      <td>{testRes.panel_description}</td>
                      <td>{testRes.date_ordered}</td>
                      <td>{testRes.note}</td>
                    </tr>
                  ))}{" "}
                </tbody>
              </table>
            </div>
          ) : (
            <div id="message">
              <p class="h4 mt-4">
                <SiZeromq style={{ marginTop: "-5px" }} />
                &nbsp;No test results found.
              </p>
            </div>
          )}
        </TabPanel>
        <TabPanel sx={{ height: "70vh" }} value="10">
          {dataPatCondi.length > 0 ? (
            <div class="table-responsive">
              <table class="table">
                <thead id="theads">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Condition</th>
                    <th scope="col">ICD10</th>
                  </tr>
                </thead>
                <tbody>
                  {" "}
                  {dataPatCondi.map((patCondi) => (
                    <tr>
                      <th scope="row">{i++}</th>
                      <td style={{ width: "80%" }}>{patCondi.condition}</td>
                      <td>{patCondi.icd10}</td>
                    </tr>
                  ))}{" "}
                </tbody>
              </table>
            </div>
          ) : (
            <div id="message">
              <p class="h4 mt-4">
                <SiZeromq style={{ marginTop: "-5px" }} />
                &nbsp;Medication history is empty.
              </p>
            </div>
          )}
        </TabPanel>
        <TabPanel sx={{ height: "70vh" }} value="8">
          {dataVitalSigns.length > 0 ? (
            <div class="table-responsive">
              <table class="table">
                <thead id="theads">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Vital signs</th>
                    <th scope="col">Date</th>
                    <th scope="col">Pulseox</th>
                    <th scope="col">Height</th>
                    <th scope="col">Weight</th>
                    <th scope="col">BMI</th>
                    <th scope="col">Temp</th>
                    <th scope="col">Respiration</th>
                    <th scope="col">Heart rate</th>
                    <th scope="col">Blood pressure</th>
                  </tr>
                </thead>
                <tbody>
                  {" "}
                  {dataVitalSigns.map((vitalSigns) => (
                    <tr>
                      <th scope="row">{j++}</th>
                      <td>{vitalSigns.vital_signs}</td>
                      <td>{vitalSigns.date}</td>
                      <td>{vitalSigns.pulseox}</td>
                      <td>{vitalSigns.height}</td>
                      <td>{vitalSigns.weight}</td>
                      <td>{vitalSigns.bmi}</td>
                      <td>{vitalSigns.temp}</td>
                      <td>{vitalSigns.respiration}</td>
                      <td>{vitalSigns.heart_rate}</td>
                      <td>{vitalSigns.blood_pressure}</td>
                    </tr>
                  ))}{" "}
                </tbody>
              </table>
            </div>
          ) : (
            <div id="message">
              <p class="h4 mt-4">
                <SiZeromq style={{ marginTop: "-5px" }} />
                &nbsp;Medication history is empty.
              </p>
            </div>
          )}
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default NextTable;
