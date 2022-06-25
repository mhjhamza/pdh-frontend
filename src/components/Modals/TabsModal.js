import React, { useCallback } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { TabPanel, TabContext } from "@mui/lab";
import { useEffect, useState } from "react";
// import { DoDisturbIcon } from "react-icons/si";
import DoDisturbIcon from "@mui/icons-material/DoDisturb";
import RefreshIcon from "@mui/icons-material/Refresh";

import EditModal from "../Modals/EditModal";
import ModalTable from "../Common/ModalTable";
// import "../table.css";

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

  const patient_problem_history_header = [
    { id: "sno", title: "#" },
    { id: "snomed", title: "snomed" },
    { id: "problem", title: "Problem" },
    { id: "status", title: "Status" },
    { id: "date_discovered", title: "Date discovered" },
    { id: "last_modified", title: "Last modified" },
    { id: "editAction", title: "Action" },
  ];
  const patient_Allergies_header = [
    { id: "sno", title: "#" },
    { id: "allergies", title: "Allergies" },
    { id: "date_id", title: "Date" },
    { id: "type", title: "type" },
    { id: "cause", title: "Cause" },
    { id: "last_modified", title: "Last modified" },
    { id: "severity", title: "Severity" },
    { id: "reaction", title: "Reaction" },
    { id: "status", title: "Status" },
  ];
  const data_vital_signs = [
    { id: "sno", title: "#" },
    { id: "vital_signs", title: "Vital signs" },
    { id: "date", title: "Date" },
    { id: "pulseox", title: "Pulseox" },
    { id: "height", title: "Height" },
    { id: "weight", title: "Weight" },
    { id: "bmi", title: "BMI" },
    { id: "temp", title: "Temp" },
    { id: "respiration", title: "Respiration" },
    { id: "heart_rate", title: "Heart rate" },
    { id: "blood_pressure", title: "Blood pressure" },
  ];
  const medical_history = [
    { id: "sno", title: "#" },
    { id: "medication", title: "Medication" },
    { id: "strength", title: "Strength" },
    { id: "dose_route_frequency", title: "Dose route frequency" },
    { id: "rxnorm_code", title: "RXnorm code" },
    { id: "date_started", title: "Date started" },
    { id: "date_discontinued", title: "Date discontinued" },
    { id: "status", title: "Status" },
  ];
  const data_assessments = [
    { id: "sno", title: "#" },
    { id: "assessment_description", title: "Assessment description" },
    { id: "plan_of_treatment", title: "Plan of treatment" },
    { id: "orders", title: "Orders" },
  ];
  const data_procedures = [
    { id: "sno", title: "#" },
    { id: "procedures", title: "Procedures" },
    { id: "code_system", title: "Code system" },
    { id: "code", title: "Code" },
    { id: "description", title: "Description" },
    { id: "date_ordered", title: "Date ordered" },
    { id: "status", title: "Status" },
    { id: "immunization", title: "immunization" },
    { id: "date", title: "Date" },
    { id: "vaccine", title: "Vaccine" },
    { id: "cvx", title: "CVX" },
  ];
  const data_lab_res = [
    { id: "sno", title: "#" },
    { id: "date_performed", title: "Date performed" },
    { id: "test", title: "Test" },
    { id: "result", title: "Result" },
    { id: "status", title: "Status" },
  ];
  const data_smoker = [
    { id: "sno", title: "#" },
    { id: "smoker", title: "Smoker" },
    { id: "smoker_start_date", title: "Starting date" },
    { id: "smoker_stop_date", title: "Stoping date" },
  ];
  const data_test_res = [
    { id: "sno", title: "#" },
    { id: "test_code", title: "Test code" },
    { id: "code_system", title: "Code system" },
    { id: "panel_description", title: "Panel description" },
    { id: "date_ordered", title: "date ordered" },
    { id: "note", title: "Note" },
  ];
  const data_pat_condi = [
    { id: "sno", title: "#" },
    { id: "condition", title: "Condition" },
    { id: "icd10", title: "ICD10" },
  ];
  return (
    <Box sx={{ postion: "relative" }}>
      <RefreshIcon
        sx={{
          cursor: "pointer",
          position: "absolute",
          top: "1rem",
          right: "2rem",
          fontSize: "2.5rem",
          color: "#fff ",
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
              <ModalTable header={patient_Allergies_header} data={dataAller} />
            </div>
          ) : (
            <div id="error-message">
              <DoDisturbIcon
                style={{
                  fontWeight: 700,
                  color: "#7c5151",
                  fontSize: "1.9rem",
                }}
              />
              &nbsp;You have 0 allergies !
            </div>
          )}
        </TabPanel>
        <TabPanel sx={{ height: "70vh" }} value="2">
          {dataMedicHist.length > 0 ? (
            <div class="table-responsive">
              <ModalTable header={medical_history} data={dataMedicHist} />
            </div>
          ) : (
            <div id="error-message">
              <DoDisturbIcon
                style={{
                  fontWeight: 700,
                  color: "#7c5151",
                  fontSize: "1.9rem",
                }}
              />
              &nbsp;Medication history is empty.
            </div>
          )}
        </TabPanel>
        <TabPanel sx={{ height: "70vh" }} value="3">
          {dataAssessments.length > 0 ? (
            <div class="table-responsive">
              <ModalTable header={data_assessments} data={dataAssessments} />
            </div>
          ) : (
            <div id="error-message">
              <DoDisturbIcon
                style={{
                  fontWeight: 700,
                  color: "#7c5151",
                  fontSize: "1.9rem",
                }}
              />
              &nbsp;Assessments are empty.
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
              <ModalTable
                header={patient_problem_history_header}
                data={dataProbHist}
                handleOpenEditModal={handleOpenEditModal}
              />
            </div>
          ) : (
            <div id="error-message">
              <DoDisturbIcon
                style={{
                  fontWeight: 700,
                  color: "#7c5151",
                  fontSize: "1.9rem",
                }}
              />
              &nbsp;Medication history is empty.
            </div>
          )}
        </TabPanel>
        <TabPanel sx={{ height: "70vh" }} value="4">
          {dataProcedures.length > 0 ? (
            <div class="table-responsive">
              <ModalTable header={data_procedures} data={dataProcedures} />
            </div>
          ) : (
            <div id="error-message">
              <DoDisturbIcon
                style={{
                  fontWeight: 700,
                  color: "#7c5151",
                  fontSize: "1.9rem",
                }}
              />
              &nbsp;Medication history is empty.
            </div>
          )}
        </TabPanel>
        <TabPanel sx={{ height: "70vh" }} value="5">
          {dataLabRes.length > 0 ? (
            <div class="table-responsive">
              <ModalTable header={data_lab_res} data={dataLabRes} />
            </div>
          ) : (
            <div id="error-message">
              <DoDisturbIcon
                style={{
                  fontWeight: 700,
                  color: "#7c5151",
                  fontSize: "1.9rem",
                }}
              />
              &nbsp;No lab results found.
            </div>
          )}
        </TabPanel>
        <TabPanel sx={{ height: "70vh" }} value="6">
          {dataSmoker.length > 0 ? (
            <div class="table-responsive">
              <ModalTable header={data_smoker} data={dataSmoker} />
            </div>
          ) : (
            <div id="error-message">
              <DoDisturbIcon
                style={{
                  fontWeight: 700,
                  color: "#7c5151",
                  fontSize: "1.9rem",
                }}
              />
              &nbsp;Medication history is empty.
            </div>
          )}
        </TabPanel>
        <TabPanel sx={{ height: "70vh" }} value="7">
          {dataTestRes.length > 0 ? (
            <div class="table-responsive">
              <ModalTable header={data_test_res} data={dataTestRes} />
            </div>
          ) : (
            <div id="error-message">
              <DoDisturbIcon
                style={{
                  fontWeight: 700,
                  color: "#7c5151",
                  fontSize: "1.9rem",
                }}
              />
              &nbsp;No test results found.
            </div>
          )}
        </TabPanel>
        <TabPanel sx={{ height: "70vh" }} value="10">
          {dataPatCondi.length > 0 ? (
            <div class="table-responsive">
              <ModalTable header={data_pat_condi} data={dataPatCondi} />
            </div>
          ) : (
            <div id="error-message">
              <DoDisturbIcon
                style={{
                  fontWeight: 700,
                  color: "#7c5151",
                  fontSize: "1.9rem",
                }}
              />
              &nbsp;Medication history is empty.
            </div>
          )}
        </TabPanel>
        <TabPanel sx={{ height: "70vh" }} value="8">
          {dataVitalSigns.length > 0 ? (
            <div class="table-responsive">
              <ModalTable header={data_vital_signs} data={dataVitalSigns} />
            </div>
          ) : (
            <div id="error-message">
              <DoDisturbIcon
                style={{
                  fontWeight: 700,
                  color: "#7c5151",
                  fontSize: "1.9rem",
                }}
              />
              &nbsp;Medication history is empty.
            </div>
          )}
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default NextTable;
