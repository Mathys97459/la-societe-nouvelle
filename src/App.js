import React, { useState, useEffect } from "react";
import MenuDeroulant from "./MenuDeroulant";
import ZoneVisualisation from "./ZoneVisualisation";

import "./App.css";

const App = () => {
  const [aggregates, setAggregates] = useState([]);
  const [branches, setBranches] = useState([]);
  const [selectedAggregate, setSelectedAggregate] = useState({
    code: "",
    label: "",
  });
  const [selectedBranch, setSelectedBranch] = useState({ code: "", label: "" });
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Récupération des agrégats avec les paramètres fixes
        const aggregatesResponse = await fetch(
          "https://api.lasocietenouvelle.org/metadata/aggregates"
        );
        const aggregatesData = await aggregatesResponse.json();

        //Vérification des agrégats utilisés
        const validAggregates = aggregatesData.meta.filter((aggregate) =>
          ["PRD", "IC", "CFC", "NVA"].includes(aggregate.code)
        );
        setAggregates(validAggregates);

        //Récupération des branches avec les paramètres fixes
        const branchesResponse = await fetch(
          "https://api.lasocietenouvelle.org/metadata/branches"
        );
        const branchesData = await branchesResponse.json();

        setBranches(branchesData.meta);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedBranch && selectedAggregate) {
      fetch(
        `https://api.lasocietenouvelle.org/macrodata/macro_fpt_a38?indic=GHG&branch=${selectedBranch.code}&aggregate=${selectedAggregate.code}&area=FRA&currency=CPEUR`
      )
        .then((response) => response.json())
        .then((responseData) => {
          setData(responseData.data);
        })
        .catch((err) => console.error(err));
    }
  }, [selectedBranch, selectedAggregate]);

  return (
    <div>
      <h1>Courbes d'évolution</h1>
      <div id="selectors">
        <div id="aggregates">
          <p>Toutes activités</p>
          {aggregates && (
            <MenuDeroulant
              options={aggregates.map((aggregate) => aggregate.label)}
              selectedOption={selectedAggregate.label}
              onSelect={(value) => {
                const selectedAggregateObject = aggregates.find(
                  (aggregate) => aggregate.label === value
                );
                setSelectedAggregate(selectedAggregateObject);
              }}
            />
          )}
        </div>
        <div id="branches">
          <p>Production</p>
          {branches && (
            <MenuDeroulant
              options={branches.map((branch) => branch.label)}
              selectedOption={selectedBranch.label}
              onSelect={(value) => {
                const selectedBranchObject = branches.find(
                  (branch) => branch.label === value
                );
                setSelectedBranch(selectedBranchObject);
              }}
            />
          )}
        </div>
      </div>

      {<ZoneVisualisation data={data} />}
    </div>
  );
};

export default App;
