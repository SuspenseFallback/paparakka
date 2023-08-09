import React from "react"

const ResultsHeader = ({ totalResults }) => {
  const showingResults = () => {}

  return (
    <>
      <div className="results-header">
        <p className="results-found">{showingResults()}</p>
      </div>
    </>
  )
}

export default ResultsHeader
