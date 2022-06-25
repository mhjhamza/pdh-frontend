import * as React from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import "./styles.css";

export default function BasicTable({ data, header, handleOpenEditModal }) {
  return (
    <div className="table-container">
      <div className="table-content">
        <table className="table" cellSpacing={"0"}>
          <thead>
            <tr>
              {header?.map((headCell, i) => (
                <th key={i}>{headCell.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((item, i) => (
              <tr key={i}>
                {header?.map((bodyCell) => {
                  const value =
                    bodyCell?.id === "sno" ? i + 1 : item[bodyCell.id];
                  const valueAction =
                    bodyCell?.id === "editAction" ? (
                      <BorderColorIcon
                        sx={{ color: "#3366C0", cursor: "pointer" }}
                        onClick={() =>
                          handleOpenEditModal(item?.patient_problem_history_id)
                        }
                      />
                    ) : (
                      value
                    );

                  return <td key={bodyCell.id}> {valueAction}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
