import { HTMLTable } from "@blueprintjs/core";

export default () => (
  <main>
    <HTMLTable bordered condensed interactive striped>
      <thead>
        <tr>
          <th>Task</th>
          <th>Date</th>
          <th>Hours</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Blueprint</td>
          <td>CSS framework and UI toolkit</td>
          <td>Sass, TypeScript, React</td>
        </tr>
        <tr>
          <td>TSLint</td>
          <td>Static analysis linter for TypeScript</td>
          <td>TypeScript</td>
        </tr>
        <tr>
          <td>Plottable</td>
          <td>Composable charting library built on top of D3</td>
          <td>SVG, TypeScript, D3</td>
        </tr>
      </tbody>
    </HTMLTable>
  </main>
);
