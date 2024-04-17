import React from "react";
import { getSet } from "../firebase/firebase";
import { useParams } from "react-router";

const Export = () => {
  const { id } = useParams();

  const export_file = () => {
    getSet(id).then((data) => {
      let f = `#separator:tab
#html:true
`;

      data.flashcards.forEach((i) => {
        let line = i.definition.includes("\n")
          ? i.term + '\t"' + i.definition + '"'
          : i.term + "\t" + i.definition;

        line += "\n";

        f += line;
      });

      // Create element with <a> tag
      const link = document.createElement("a");

      // Create a blog object with the file content which you want to add to the file
      const file = new Blob([f], { type: "text/plain" });

      // Add file content in the object URL
      link.href = URL.createObjectURL(file);

      // Add file name
      link.download = "set.txt";

      // Add click event to <a> tag to save file.
      link.click();
      URL.revokeObjectURL(link.href);
    });
  };

  return (
    <>
      <div
        className="page page-1 export-page-1"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          className="button button-block"
          onClick={export_file}
          style={{ height: "90%", fontSize: "5rem" }}
        >
          Export
        </button>
      </div>
    </>
  );
};

export default Export;
