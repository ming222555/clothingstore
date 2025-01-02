export default function Home() {
  console.log("HHHHHHHHHHHHHHome page");
  return (
    <div>
      Home page
      <div>
        <p>Basic verify Bootstrap flex, grid, and utilities</p>
        <br />
        <div className="container text-center text-primary">
          <div
            className="row align-items-start"
            style={{ background: "lightgreen" }}
          >
            <div
              className="col-3 order-last"
              style={{ outline: "1px solid blue" }}
            >
              1 in Dom, col-3 order-last
            </div>
            <div className="col-md-5" style={{ outline: "1px solid blue" }}>
              col-md-5
            </div>
            <div
              className="col align-self-center"
              style={{ outline: "1px solid blue" }}
            >
              <p className="bg-info p-2">col</p>
            </div>
            <span className="d-none">span</span>
          </div>
        </div>
      </div>
      <br />
      <button className="btn btn-info">Bootstrap button</button>
    </div>
  );
}
