import { describe, expect, it } from "vitest";
import type { Column, Group } from "./index";
import {
  compareSortValues,
  getColumnSortId,
  sortRows,
  sortTableData,
} from "./sorting";

type SDK = {
  name: string;
  version: string;
  priority: "low" | "medium" | "high";
  lastGeneratedAt: Date | null;
};

const rows: SDK[] = [
  {
    name: "typescript",
    version: "10.0.0",
    priority: "medium",
    lastGeneratedAt: new Date("2026-05-03T00:00:00.000Z"),
  },
  {
    name: "go",
    version: "2.0.0",
    priority: "high",
    lastGeneratedAt: new Date("2026-05-01T00:00:00.000Z"),
  },
  {
    name: "python",
    version: "1.0.0",
    priority: "low",
    lastGeneratedAt: null,
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
    sortValue: (row) => row.lastGeneratedAt,
  },
  {
    key: "priority",
    header: "Priority",
    sortable: true,
    sortValue: (row) => row.priority,
    sortCompare: (a, b) => {
      const rank = { low: 0, medium: 1, high: 2 };
      return rank[a.priority] - rank[b.priority];
    },
  },
];

describe("Table sorting helpers", () => {
  it("uses explicit id before key for sort identity", () => {
    expect(getColumnSortId(columns[0])).toBe("sdk-name");
    expect(getColumnSortId(columns[1])).toBe("lastGeneratedAt");
  });

  it("compares strings, numbers, booleans, dates, and nulls consistently", () => {
    expect(compareSortValues("a", "b")).toBeLessThan(0);
    expect(compareSortValues(2, 1)).toBeGreaterThan(0);
    expect(compareSortValues(false, true)).toBeLessThan(0);
    expect(
      compareSortValues(new Date("2026-05-01"), new Date("2026-05-02")),
    ).toBeLessThan(0);
    expect(compareSortValues(null, "a")).toBeGreaterThan(0);
    expect(compareSortValues(undefined, null)).toBe(0);
  });

  it("sortRows keeps null values last in both directions", () => {
    const dateColumn = columns[1];

    if (!dateColumn.sortable) {
      throw new Error("date column must be sortable");
    }

    expect(sortRows(rows, dateColumn, "asc").map((row) => row.name)).toEqual([
      "go",
      "typescript",
      "python",
    ]);

    expect(sortRows(rows, dateColumn, "desc").map((row) => row.name)).toEqual([
      "typescript",
      "go",
      "python",
    ]);
  });

  it("sortRows uses custom sortCompare when provided", () => {
    const priorityColumn = columns[2];

    if (!priorityColumn.sortable) {
      throw new Error("priority column must be sortable");
    }

    expect(
      sortRows(rows, priorityColumn, "desc").map((row) => row.priority),
    ).toEqual(["high", "medium", "low"]);
  });

  it("sortRows keeps equal non-null values in original order", () => {
    const duplicateRows: SDK[] = [
      { ...rows[0], name: "duplicate" },
      { ...rows[1], name: "duplicate" },
      { ...rows[2], name: "alpha" },
    ];
    const nameColumn = columns[0];

    if (!nameColumn.sortable) {
      throw new Error("name column must be sortable");
    }

    expect(sortRows(duplicateRows, nameColumn, "asc")).toEqual([
      duplicateRows[2],
      duplicateRows[0],
      duplicateRows[1],
    ]);
  });

  it("sortTableData returns original data when sort is null or unknown", () => {
    expect(sortTableData(rows, columns, null)).toBe(rows);
    expect(
      sortTableData(rows, columns, { id: "missing", direction: "asc" }),
    ).toBe(rows);
  });

  it("sortTableData sorts flat rows without mutating input", () => {
    const sorted = sortTableData(rows, columns, {
      id: "sdk-name",
      direction: "asc",
    }) as SDK[];

    expect(sorted.map((row) => row.name)).toEqual([
      "go",
      "python",
      "typescript",
    ]);
    expect(rows.map((row) => row.name)).toEqual(["typescript", "go", "python"]);
  });

  it("sortTableData sorts rows inside groups without reordering groups", () => {
    const groupedRows: Group<SDK>[] = [
      { key: "group-a", items: [rows[0], rows[1]] },
      { key: "group-b", items: [rows[2]] },
    ];

    const sorted = sortTableData(groupedRows, columns, {
      id: "sdk-name",
      direction: "asc",
    }) as Group<SDK>[];

    expect(sorted.map((group) => group.key)).toEqual(["group-a", "group-b"]);
    expect(sorted[0].items.map((row) => row.name)).toEqual([
      "go",
      "typescript",
    ]);
  });
});
