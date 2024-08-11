import { useState } from "react";

const TableResult = ({ data, style, index, dataLength, maxTrial }) => {
  const trueNumberIndex = data.guessNumbers.indexOf(data.trueNumber.toString()) + 1;

  const accuracyRate = trueNumberIndex !== -1 ? 1 - trueNumberIndex / data.maxTrial : 0;
  //   console.log(trueNumberIndex, accuracyRate);
  return (
    <div className="table-result" style={style}>
      <div className="table-col">
        <p>Số lần nhập</p>
        {data.guessNumbers.map((_, index) => (
          <p key={index}>{index + 1}</p>
        ))}
      </div>
      <div className="table-col">
        <p>Số nhập vào</p>
        {data.guessNumbers.map((number, index) => (
          <p key={index} style={{ color: +number !== +data.trueNumber ? "red" : "green" }}>
            {number}
          </p>
        ))}
      </div>
      <p className="table-col">
        Số lần chơi thứ: {dataLength - index}/{dataLength}
      </p>
      <p className="table-col">Số lần nhập tối đa: {maxTrial}</p>
      <p className="table-col">
        Tỉ lệ đúng: {accuracyRate === 100 || accuracyRate === 0 ? accuracyRate + "%" : accuracyRate.toFixed(2) + "%"}
      </p>
    </div>
  );
};

export default TableResult;
