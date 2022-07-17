export default function DataTable(props) {
  const data = props.data;
  const buttons = props.buttons ? props.buttons : [];
  var buffer = [];
  var colnames = [];

  for (var colname in data[0]) {
    colnames.push(
      <th className="px-2 bg-neutral-200" key={colname}>
        {colname.replace(/_/g, " ").charAt(0).toUpperCase() +
          colname.replace(/_/g, " ").slice(1)}
      </th>
    );
  }

  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    var rowbuffer = [];
    for (var key in row) {
      rowbuffer.push(
        <td
          className="px-2 border border-collapse"
          key={i.toString() + key.toString()}
        >
          <div className="flex w-full">
            <div>{row[key]}</div>
            <div className="flex-grow pl-1 flex justify-end">
              {buttons.some((button) => button.col === key)
                ? buttons.find((button) => button.col === key).Element(row)
                : null}
            </div>
          </div>
        </td>
      );
    }
    buffer.push(
      <tr className="odd:bg-neutral-100" key={i.toString() + key.toString()}>
        {rowbuffer}
      </tr>
    );
  }

  return (
    <table>
      <thead>
        <tr>{colnames}</tr>
      </thead>
      <tbody>{buffer}</tbody>
    </table>
  );
}
