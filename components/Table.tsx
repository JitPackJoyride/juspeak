import { PropsWithChildren } from "react";

function Table({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="not-prose flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="divide-y divide-gray-200 bg-white text-center text-sm lg:text-base">
                {children}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function Key({ children }: PropsWithChildren<unknown>) {
  return (
    <td className="overflow-auto border-r border-gray-200 bg-gray-50 px-6 py-4 font-medium text-gray-500">
      {children}
    </td>
  );
}
Table.Key = Key;

function Value({ children }: PropsWithChildren<unknown>) {
  return (
    <td className="overflow-auto px-6 py-4 text-orange-500">{children}</td>
  );
}
Table.Value = Value;

export default Table;
