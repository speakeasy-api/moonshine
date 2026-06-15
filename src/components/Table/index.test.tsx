import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Table, type Column } from "./index";

type SDK = {
  name: string;
  version: string;
  lastGeneratedAt: Date | null;
};

const rows: SDK[] = [
  {
    name: "typescript",
    version: "10.0.0",
    lastGeneratedAt: new Date("2026-05-03T00:00:00.000Z"),
  },
  {
    name: "go",
    version: "2.0.0",
    lastGeneratedAt: new Date("2026-05-01T00:00:00.000Z"),
  },
];

const columns: Column<SDK>[] = [
  {
    key: "name",
    id: "sdk-name",
    header: "SDK",
    sortable: true,
    sortValue: (row) => row.name,
  },
  {
    key: "lastGeneratedAt",
    header: "Last Generated",
    sortable: true,
    sortLabel: "Last Generated",
    render: (row) =>
      row.lastGeneratedAt ? row.lastGeneratedAt.toISOString() : "Never",
    sortValue: (row) => row.lastGeneratedAt,
  },
];

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Table sortable headers", () => {
  it("cycles controlled sortable header clicks from ascending to descending to cleared", () => {
    const onSortChange = vi.fn();

    const { rerender } = render(
      <Table
        columns={columns}
        data={rows}
        rowKey={(row) => row.name}
        sort={null}
        onSortChange={onSortChange}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Sort by SDK ascending" }),
    );
    expect(onSortChange).toHaveBeenLastCalledWith({
      id: "sdk-name",
      direction: "asc",
    });

    rerender(
      <Table
        columns={columns}
        data={rows}
        rowKey={(row) => row.name}
        sort={{ id: "sdk-name", direction: "asc" }}
        onSortChange={onSortChange}
      />,
    );

    fireEvent.click(
      screen.getByRole("button", { name: "Sort by SDK descending" }),
    );
    expect(onSortChange).toHaveBeenLastCalledWith({
      id: "sdk-name",
      direction: "desc",
    });

    rerender(
      <Table
        columns={columns}
        data={rows}
        rowKey={(row) => row.name}
        sort={{ id: "sdk-name", direction: "desc" }}
        onSortChange={onSortChange}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Clear sort for SDK" }));
    expect(onSortChange).toHaveBeenLastCalledWith(null);
  });

  it("adds aria-sort only to the active sorted column", () => {
    render(
      <Table
        columns={columns}
        data={rows}
        rowKey={(row) => row.name}
        sort={{ id: "lastGeneratedAt", direction: "desc" }}
        onSortChange={() => undefined}
      />,
    );

    expect(
      screen
        .getByRole("columnheader", { name: /last generated/i })
        .getAttribute("aria-sort"),
    ).toBe("descending");
    expect(
      screen
        .getByRole("columnheader", { name: /sdk/i })
        .getAttribute("aria-sort"),
    ).toBeNull();
  });

  it("styles inactive sort icon lighter and active sort icon darker", () => {
    const { rerender } = render(
      <Table
        columns={columns}
        data={rows}
        rowKey={(row) => row.name}
        sort={null}
        onSortChange={() => undefined}
      />,
    );

    const inactiveIcon = screen
      .getByRole("button", { name: "Sort by SDK ascending" })
      .querySelector("svg");

    expect(inactiveIcon?.classList.contains("text-body-muted")).toBe(true);
    expect(inactiveIcon?.classList.contains("group-hover:text-body")).toBe(
      true,
    );

    rerender(
      <Table
        columns={columns}
        data={rows}
        rowKey={(row) => row.name}
        sort={{ id: "sdk-name", direction: "asc" }}
        onSortChange={() => undefined}
      />,
    );

    const activeIcon = screen
      .getByRole("button", { name: "Sort by SDK descending" })
      .querySelector("svg");

    expect(activeIcon?.classList.contains("text-body")).toBe(true);
    expect(activeIcon?.classList.contains("text-body-muted")).toBe(false);
  });

  it("renders sortable columns as plain headers when onSortChange is missing", () => {
    render(<Table columns={columns} data={rows} rowKey={(row) => row.name} />);

    expect(screen.queryByRole("button", { name: /sort by sdk/i })).toBeNull();
    expect(screen.getByRole("columnheader", { name: /sdk/i })).toBeTruthy();
  });

  it("warns in development when sortable ids are duplicated", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    const duplicateColumns: Column<SDK>[] = [
      columns[0],
      {
        ...columns[1],
        id: "sdk-name",
      },
    ];

    render(
      <Table
        columns={duplicateColumns}
        data={rows}
        rowKey={(row) => row.name}
        sort={null}
        onSortChange={() => undefined}
      />,
    );

    expect(warn).toHaveBeenCalledWith(
      "Table sortable columns must have unique ids. Duplicate id: sdk-name",
    );
  });
});
