import { React, ReactDOMServer } from "./deps.ts";

const Container = (props) =>
  props.map((element, index) => {
    return (
      <li key={index} style={{ color: `${element}`, background: "black" }}>
        {element}
      </li>
    );
  });

export default (props) => `<!DOCTYPE html>
${ReactDOMServer.renderToString(
  <>
  <body bgcolor="black">
      <h1 align="center" style={{ color: "white" }}>
        List your favorite colors!
      </h1>
      <hr />
      <p />
      <p />
      <div align="center" style={{ display: "block" }}>
        <form action="/" method="POST">
          <label style={{color:'white'}}>Color:</label>
          <input
            type="text"
            id="color"
            name="color"
            placeholder="Write a color"
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
      <hr />
      <p />
      <p />
      <ul> {Container(props)}</ul>
  </body>
  </>
)}
`;
