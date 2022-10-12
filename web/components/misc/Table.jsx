const Table = ({ columns, data, title }) => {
  return (
    <table className="text-start">
      <thead className="h-8">
        {title && (
          <tr className="h-8">
            <th colSpan={columns.length}>{title}</th>
          </tr>
        )}
        <tr className="h-8">
          {columns.map((col) => (
            <th className="py-4 text-start w-32" key={col.label} colSpan={1}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr className="border" key={row.toString()}>
            {columns.map((col) => (
              <td key={col.value}>{row[col.value]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
