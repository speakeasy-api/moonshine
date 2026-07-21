import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./";

describe("Button", () => {
  it("renders the children", () => {
    render(<Button>Click me</Button>);

    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("ButtonText has text-trim-cap class for optical alignment", () => {
    render(
      <Button>
        <Button.Text>Click me</Button.Text>
      </Button>,
    );
    const text = screen.getByText("Click me");
    expect(text.tagName).toBe("SPAN");
    expect(text).toHaveClass("text-trim-cap");
    expect(text).not.toHaveClass("relative"); // button wrapper has 'relative', text span does not
  });

  it("defaults to type button so it does not submit a parent form", () => {
    const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault());

    render(
      <form onSubmit={onSubmit}>
        <Button>Discover</Button>
      </form>,
    );

    const button = screen.getByRole("button", { name: "Discover" });
    expect(button).toHaveAttribute("type", "button");

    fireEvent.click(button);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("preserves an explicit submit type", () => {
    render(<Button type="submit">Authorize</Button>);

    expect(screen.getByRole("button", { name: "Authorize" })).toHaveAttribute(
      "type",
      "submit",
    );
  });

  it("does not pass the default type to an asChild element", () => {
    render(
      <Button asChild>
        <a href="/discover">Discover</a>
      </Button>,
    );

    expect(screen.getByRole("link", { name: "Discover" })).not.toHaveAttribute(
      "type",
    );
  });
});
