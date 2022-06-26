import { navigateTo } from "../../support/page_objects/navigationPage.js";

const fakeMonth = [
  {
    date: "2022-05-01",
    amount: "0.00",
  },
  {
    date: "2022-05-02",
    amount: "950.44",
  },
  {
    date: "2022-05-03",
    amount: "48.71",
  },
  {
    date: "2022-05-04",
    amount: "962.41",
  },
  {
    date: "2022-05-05",
    amount: "261.79",
  },
  {
    date: "2022-05-06",
    amount: "157.96",
  },
  {
    date: "2022-05-07",
    amount: "568.17",
  },
  {
    date: "2022-05-08",
    amount: "102.79",
  },
  {
    date: "2022-05-09",
    amount: "63.79",
  },
  {
    date: "2022-05-10",
    amount: "70.13",
  },
  {
    date: "2022-05-11",
    amount: "462.18",
  },
  {
    date: "2022-05-12",
    amount: "728.93",
  },
  {
    date: "2022-05-13",
    amount: "1144.46",
  },
  {
    date: "2022-05-14",
    amount: "506.45",
  },
  {
    date: "2022-05-15",
    amount: "654.00",
  },
  {
    date: "2022-05-16",
    amount: "0.00",
  },
  {
    date: "2022-05-17",
    amount: "70.32",
  },
  {
    date: "2022-05-18",
    amount: "0.00",
  },
  {
    date: "2022-05-19",
    amount: "568.44",
  },
  {
    date: "2022-05-20",
    amount: "10.59",
  },
  {
    date: "2022-05-21",
    amount: "19.52",
  },
  {
    date: "2022-05-22",
    amount: "0.00",
  },
  {
    date: "2022-05-23",
    amount: "0.00",
  },
  {
    date: "2022-05-24",
    amount: "554.97",
  },
  {
    date: "2022-05-25",
    amount: "0.00",
  },
  {
    date: "2022-05-26",
    amount: "753.53",
  },
  {
    date: "2022-05-27",
    amount: "0.00",
  },
  {
    date: "2022-05-28",
    amount: "0.00",
  },
  {
    date: "2022-05-29",
    amount: "0.00",
  },
  {
    date: "2022-05-30",
    amount: "0.00",
  },
  {
    date: "2022-05-31",
    amount: "397.80",
  },
];

// Verify the request for the weekly data occurs
describe("The homepage makes the weekly data request", () => {
  it("The week request fires", () => {
    // Set up intercepts before you navigate to page
    cy.intercept("POST", "**/week").as("weekData");
    cy.intercept("POST", "**/month").as("monthData");
    cy.intercept("GET", "**/unsettled/total").as("totalData");

    // Navigate to route where you expect requests
    navigateTo.homePage();

    // Wait on those request to come back
    cy.wait(["@weekData", "@monthData", "@totalData"]);

    cy.get("@weekData").should("exist");
    cy.get("@monthData").should("exist");
    cy.get("@totalData").should("exist");

    cy.get("@weekData").then((week) => {
      expect(week.response.body).to.be.a("array");
    });

    cy.get("@monthData").then((month) => {
      expect(month.response.body).to.be.a("array");
    });

    cy.get("@totalData").then((total) => {
      console.log(total.response.body);
      expect(total.response.body.total_trans).to.exist;
      expect(total.response.body.unsettled_total).to.exist;
    });
  });
});
